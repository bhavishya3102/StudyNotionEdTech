const Category=require("../models/Category")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
exports.createCategory=async (req,resp)=>{
    try{
// fetch the data
const {name,description}=req.body;
// perform validation
if(!name){
    return resp.status(402).json({
        success:false,
        message:"Required fields are missing"
    })
}
// create entry in database
const categorydetails=await Category.create({
    name:name,
    description:description
})
console.log(categorydetails);
// return response
resp.status(200).json({
    success:true,
    message:"new entry in database is created"
})
    }catch(error){
return resp.status(200).json({
    success:false,
    message:"some error occured"
})
    }
}

// show all categories
exports.getallcategory=async (req,resp)=>{
    try{
const allcategories=await Category.find({},{name:true,description:true});
// return response
resp.status(200).json({
    success:true,
    message:"all category are find",
    allcategories
})
    }catch(error){

        return resp.status(500).json({
            success:false,
            message:"all category are not found"
        })

    }
}

// category page details
exports.categorypagedetails=async(req,resp)=>{
    try{
// find category id 
console.log("bbbbb");
const {categoryid}=req.body;
// find all the courses of specific category
const specificcategory=await Category.findById(categoryid)
                                            .populate({
                                                path:"course",
                                                match:{status:"Published"},
                                                populate:'ratingandreviews'
                                            }).exec();

 console.log(specificcategory);                                           
 console.log(specificcategory.course.length);                                           

if(!specificcategory){
    return resp.status(402).json({
        success:false,
        message:"cannot find courses"
    })
}

  // Handle the case when there are no courses
  if (specificcategory.course.length === 0) {
    console.log("No courses found for the selected category.")
    return resp.status(404).json({
      success: false,
      message: "No courses found for the selected category.",
    })
  }

// find courses of different categories

const categoriesExceptSelected=await Category.find({
                                    _id:{$ne:categoryid},
                                    })


console.log("dataaaa",categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id);
   // using random method we select the random category                                 
const differentcategory=await Category.findOne(
    categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id)
    .populate({
        path:"course",
        match:{status:"Published"},
        populate:'ratingandreviews'
    }).exec();

console.log("differentd",differentcategory);
// find top courses accross all categories

//allCategories.flatMap((category) => category.courses): This line uses the flatMap() function 
//to flatten the array of arrays (courses within categories) into a single array of courses. 


//.sort((a, b) => b.sold - a.sold): It sorts the courses in descending order based on the number of units sold
//.slice(0, 10): It takes the first 10 courses from the sorted array. 

const allcategories=await Category.find().populate({
    path:"course",
    match:{status:"Published"},
    populate:'ratingandreviews'

}).exec()

const allcourses=allcategories.flatMap((category)=>category.course)
console.log("allcourses",allcourses);

const mostSellingCourses=allcourses.sort((a,b)=>b.sold-a.sold)
.slice(0,10)



console.log("most"+mostSellingCourses);
                                    
  

// return response
return resp.status(200).json({
    success:true,
    data:{
        specificcategory,
        differentcategory,
        mostSellingCourses
    }
    
})
    }catch(error){
        return resp.status(402).json({
            success:false,
            message:error.message
        })
    }
}