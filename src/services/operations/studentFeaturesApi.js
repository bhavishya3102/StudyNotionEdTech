import { toast } from "react-toastify"
import rzplogo from "../../assets/Logo/rzp_logo.png"
import {resetcart} from "../../Slices/Cartslice"
import { setpaymentLoading} from "../../Slices/Course"
import { apiconnector } from "../apioperator"
import { studentEndpoints } from "../apis"

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
  } = studentEndpoints;

  //Load the Razorpay SDK from the CDN
  function loadScript(src){
    return new Promise((resolve)=>{
        const script=document.createElement("script")
        script.src=src;
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
  }

  //Buy the Course
  export async function BuyCourse(
token,
courses,
user_details,
navigate,
dispatch
  ){

const toastid=toast.loading("Loading...")
try{
// Load the script of Razorpay Sdk
const resp=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
console.log(resp);
if(!resp){
    toast.error(
        "Razorpay SDK failed to load.Check Your Internet Connection"
    )
    return ;
}
// Initiate the order in Backend
const orderResponse=await apiconnector("POST",COURSE_PAYMENT_API,{
    courses
},{
    Authorisation:`Bearer ${token}`
});

if(!orderResponse.data.success){
    throw new Error(orderResponse.data.message)
    
}
console.log("payment response",orderResponse.data);
             

// opening the razorpay sdk

const options={
    key:"rzp_test_v9cBsqDqUXzY8t",
    currency:orderResponse.data.data.currency,
    amount:orderResponse.data.data.amount,
    order_id:orderResponse.data.data.id,
    name:"StudyNotion",
    description:"Thankyou for the Purchasing the Course ",
    image:rzplogo,
    prefill:{
        name:`${user_details.firstname} ${user_details.lastname}`,
       
    },
   
    handler: function (response){
       
        sendPaymentSuccessEmail(
            response,
            orderResponse.data.data.amount,
            token
            );
            verifyPayment({...response,courses},token,navigate,dispatch);
            
            
            
        }
        
    };
    console.log("a")

    // Show the razorpay payment windo0w
    const paymentObject=new window.Razorpay(options);
    paymentObject.open();

    
}catch(error){
    console.log("payment api error",error);
    toast.error(error.message);
}
toast.dismiss(toastid)

}
// Verify the payment 
console.log("a")

async function verifyPayment(bodydata,token,navigate,dispatch){
    console.log("a")
    console.log("bodydata",bodydata);
    const toastid=toast.loading("Verifying Payment");
    dispatch(setpaymentLoading(true));
    try{
        const response=await apiconnector("POST",COURSE_VERIFY_API,bodydata,{
            
            Authorisation:`Bearer ${token}`});
            console.log("verifying payment response",response)
            console.log(response.data.success)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("payment successfull.")
            console.log("payment succ") 
            navigate("/dashboard/enrolled-courses");
            
            dispatch(resetcart())
            
            
   }catch(error){
console.log("payment verify error ",error);
toast.error("could not verify payment");
   } 
   toast.dismiss(toastid);
   dispatch(setpaymentLoading(false))
  }

  // send the payment success email
  async function sendPaymentSuccessEmail(response,amount,token){
    console.log(response);
    try{
await apiconnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
    orderid:response.razorpay_order_id,
    paymentid: response.razorpay_payment_id,
    amount
},{
    Authorisation:`Bearer ${token}`
})
    }catch(error){
console.log("payment success email errror",error)

    }
  }