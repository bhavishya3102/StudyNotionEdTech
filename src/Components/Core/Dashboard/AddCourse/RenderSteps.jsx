import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformation from "./CourseInformation/CourseInformation";
import CourseBuilderform from "./CourseBuilder/CourseBuilderform";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <div>
    <div className="relative mb-2 flex w-full justify-center">
 
        {steps.map((item,index) => {
         return  <div  key={index} className="h-[30px] w-full  text-white">
          <div   className="flex flex-col items-center ">
            <button
              className={`grid cursor-default aspect-square w-[29px] place-items-center rounded-full border-[1px]  ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-richblack-700 bg-richblack-800 text-richblack-300"
              }    
              ${step>item.id &&  "bg-yellow-50 text-yellow-25"}  h-[32px] w-full`
            
            }
            >
            
            {
                step>item.id?(
                    <FaCheck className="font-bold text-richblack-800"/>
                ):(
                    item.id
                )
            }
            </button>
          </div>

          {
            item.id!==steps.length &&(
                <>
                <div className={`-translate-y-[2vh] w-[80%] border-dashed border-b-2 translate-x-[8.4vw] ${step>item.id?"border-yellow-50":"border-richblack-500"}`}></div>
                </>
            )
          }
          </div>
        })}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
      {
        steps.map((item)=>{
           return  <>
            <div className="flex min-w-[130px] mr-10 flex-col items-center gap-y-2"
            key={item.id}>
            <p className={`${step>=item.id?"text-richblack-5":"text-richblack-500"}`}>{item.title}</p>
            </div>
            </>
        })
      }
      </div>
      {
        step===1 && <CourseInformation/>

      }

      {
        step===2 && <CourseBuilderform/>
      }

      
      {
        step===3 && <PublishCourse/>
      }

  

    </div>
  );
};

export default RenderSteps;
