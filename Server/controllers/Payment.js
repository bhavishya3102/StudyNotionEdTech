const {instance}=require("../config/Razorpay");
const User=require("../models/User");
const Course=require("../models/Course");
const {CourseEnrollmentEmail}=require("../Mail/Templates/CourseEnrollmentEmail");
const mailSender=require("../utils/mailSender");
const { response } = require("express");
const crypto = require("crypto")
const { mongo, default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../Mail/Templates/paymentSuccessEmail");
const Courseprogress = require("../models/Courseprogress");
// capture the payment and initiate the razorpay
exports.capturepayment=async (req,resp)=>{
    const {courses}=req.body;
    const userid=req.user.id;
    if(courses.length===0){
        return resp.json({
            success:false,
            message:"No courses id is found"
        })
    }
    let total_amount=0;
    for(const courseid of courses){
        try{
            // find the course with course id
            const course=await Course.findById(courseid)
            // if course is not found return no course found
            if(!course){
                return resp.status(200).json({
                    success:false,
                    message:"could not found the course"
                })
            }

            // check if user is already enrolled in the course
            const uid=new mongoose.Types.ObjectId(userid)
            console.log("uid",uid);
            console.log("already",course.studentEnrolled.includes(uid));
            if(course.studentEnrolled.includes(uid)){
                return resp.status(200).json({
                    success:false,
                    message:"student is already enrolled in course"
                })
            }
            // add the price of the course
            total_amount+=course.price

        }
        catch(error){
            console.log(error)
            return resp.status(500).json({
                success:false,
                message:"error occured"
            })

        }
    }
    const options={
        amount:total_amount*100,
        currency:"INR",
        receipt:Math.random(Date.now()).toString(),
    }

    try{
        //Initiate the payment using razorpay
        const paymentResponse=await instance.orders.create(options);
        console.log("Payment Response",paymentResponse);
        resp.status(200).json({
            success:true,
            data:paymentResponse
        })


    }catch(error){
        console.log(error);
        resp.status(500).json({
            success:false,
            message:"could not initiate order"
        })

    }

}





// verify the payment
exports.verifysignature=async (req,resp)=>{
    console.log("verify");
    const razorpay_order_id=req.body.razorpay_order_id
    console.log(razorpay_order_id);
    const razorpay_payment_id=req.body.razorpay_payment_id
    console.log(razorpay_payment_id);
    const razorpay_signature=req.body.razorpay_signature
    console.log(razorpay_signature);
    const courses=req.body.courses
console.log(courses);
    const userid=req.user.id;
    console.log(userid);
    if(!razorpay_order_id|| !razorpay_payment_id||
        !razorpay_signature || !courses||
        !userid){
            return resp.status(200).json({
                success:false,
                message:"Payment Failed"
            })
        }
    // make the body 
    let body=razorpay_order_id + "|" + razorpay_payment_id;
console.log("body",body);
    // expected signature
    const expectedsignature=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    console.log("expected sign",expectedsignature);
    console.log("razorpay sign",razorpay_signature);

    if(expectedsignature === razorpay_signature){
        await enrollStudents(courses,userid,resp)
        return resp.status(200).json({
            success:true,
            message:"Payment verified"
        })
    }
    return resp.status(200).json({
        success:false,
        message:"payment failed"
    })

}
//send payment success email
exports.sendPaymentSuccessEmail=async(req,resp)=>{
    const {orderid,paymentid,amount}=req.body;
   
   
    const userid=req.user.id;
    
    if(!userid||!orderid||!paymentid||!amount){
        return resp.status(400).json({
            success:false,
            message:"please provide details"
        })
    }
    try{
 const enrolledStudent=await User.findById(userid)
 console.log("enroll",enrolledStudent);
 const mailresponse=await mailSender(enrolledStudent.email,"Payment Recieved",paymentSuccessEmail(enrolledStudent.firstname,
 amount/100,
 orderid,
 paymentid));
// await mailsender(
//     enrolledStudent.email,
//     "Payment Recieved",
    
//     paymentSuccessEmail(
//         `${enrolledStudent.firstname} ${enrolledStudent.lastname}`,
//         amount/100,
//         orderid,
//         paymentid

//     )
// )

console.log(mailresponse);
    }catch(error){
        console.log("error in sending mail")
        return resp.status(400).json({
            success:false,
            message:"could not send mail"
        })
    }

}


// enroll the student in the course
const enrollStudents=async(courses,userid,resp)=>{
    if(!courses || !userid){
        return resp.status(400).json({
            success:false,
            message:"please provide details"
        })
    }

/**findOneAndUpdate--> The first document that matches the query will be updated.
 * 
 * findByIdandUpdate--> provide the _id of the document
 *  you want to update, and it will find and update that specific document.
 */

     for(const courseid of courses){
        try{
            // find the  course and enroll the students
            const enrolledCourse=await Course.findOneAndUpdate(
                {_id:courseid},
                {$push:{studentEnrolled:userid}},
                {new:true}
            )

            if(!enrolledCourse){
                return resp.status(400).json({
                    success:false,
                    message:"course not found"
                })
            }


            //  when the student enrolled successfully then update the course progress
            // initialize the course progress that is create entry in course progress

            const courseProgress=await Courseprogress.create({
                courseid:courseid,
                userid:userid,
                completedvideos:[]
            })



            console.log("updated course",enrolledCourse)
       
        // find the student and add the course in the list
        // push the course progress id in the user db to track the 
        // completed videos
        const enrollStudent=await User.findByIdAndUpdate(
            userid,
            {
                $push:{
                    courses:courseid,
                    courseprogress:courseProgress._id,

                }
            },
            {new:true}

        )
        console.log("Enroll student",enrollStudent)
        // send an email to the enrolled student
        const emailresponse=await mailSender(
            enrollStudent.email,
            `Successfully Enrolled into ${enrolledCourse.coursename}`,
            CourseEnrollmentEmail(
                enrolledCourse.coursename,
                `${enrollStudent.firstname} ${enrollStudent.lastname}`
            )
        )
console.log("Email sent Successfully",emailresponse)


        }catch(error){
            console.log(error)
            return resp.status(400).json({
                success:false,
                message:"error occured!!!!"
            })
        }
     }
} 

// exports.capturepayment=async(req,resp)=>{
    
// //get userid and courseid
// const userid=req.body;
// const courseid=req.user.id;
// // validate course id
// if(!courseid){
//     return resp.status(402).json({
//         success:false,
//         message:"please provide valid course id"
//     })
// }
// // validate coursedetails
// let course;
// try{
// course=await Course.findById({_id:courseid});
// if(!course){
//     return resp.status(402).json({
//         success:false,
//         message:"please provide valid course details"
//     })
// }

// // check user is enrolled in same course again
// // convert the type string of id into type objectid 
// const uid=new mongoose.Types.ObjectId(courseid);
// if(course.studentEnrolled.includes(uid)){
//     return resp.status(200).json({
//         success:false,
//         message:"user already enrolled the course"
//     })
// }

// }catch(error){
//     return resp.status(402).json({
//         success:false,
//         message:error.message
//     })
// }


// // create order
// // in options we write the amount multiply by 100 
// const currency="INR";
// const price=course.price;

// const options={
//     currency,
//     price:price*100,
//     receipt_no:Math.random(Date.now()).toString(),
//     notes:{
//         courseid:courseid,
//         userid:userid
//     }
// }

// try{
//     // initiate the payment
//     const paymentresponse=await instance.orders.create(options);
//     console.log(paymentresponse);
//     // return response
//     return resp.status(200).json({
//         success:true,
//         coursename:course.coursename,
//         coursedescription:course.coursedescription,
//         thumbnail:course.thumbnail,
//         orderid:paymentresponse.id,
//         amount:paymentresponse.price,
//         currency:paymentresponse.currency
        
//     })

// }catch(error){
//     return resp.status(500).json({
//         success:false,
//         message:"order doesnot created"
//     })
// }
   
// }

// // verify signature
// exports.verifysignature=async(req,resp)=>{
//   const webhooksecret="123456";
//   const signature=req.headers["x-razorpay-signature"];

//   // convert the webhooksecret in encrypted form
//   //3step process
//   const sha=crypto.createHmac("sha256",webhooksecret);
//   sha.update(JSON.stringify(req.body));
//   const digest=sha.digest("hex");


//   // if both the secretkey match
//   if(signature==digest){

//     // payment is authorized
//     console.log("payment is authorized");
//     //get the course id and userid
//     const {courseid,userid}=req.body.payload.payment.entity.notes;
    
//     try{
    
//         // fulfil the actions
//         // update the user schema and add enrolled course in it
//         const enrolledstudent=await User.findByIdAndUpdate({_id:userid},
//             {$push: {courses:courseid }},{new:true});


//     // update the course schema and update the userid in it
//     const courseadd=await Course.findByIdAndUpdate({_id:courseid},
//         {$push: {studentEnrolled:userid}},{new:true});

//         // send the mail confirm valla
//         const sendmail=await mailsender(enrolledstudent.email,
//            CourseEnrollmentEmail(courseadd.coursename,enrolledstudent.firstname));

//             // return response
//         return resp.status(200).json({
//             success:true,
//             message:"signature verified and course added"
//         })
//       }catch(error){
//         return resp.status(500).json({
//             success:false,
//             message:error.message
//         })
//       }
//   }
//   else{
//     return resp.status(400).json({
//         success:false,
//         message:"error in verifying signature"
//     })
//   }
 
// }