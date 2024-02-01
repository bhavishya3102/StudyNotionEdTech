import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const TimelineSection = () => {
  const timeline = [
    {
      Logo: logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];
  return (
    <div className="flex flex-row items-center gap-12 mt-36 mb-20">
      <div className="flex flex-col w-[55%] gap-10">
        {timeline.map((item, index) => {
          return (
            <div className="flex flex-row items-center gap-8  mb-8" key={index}>
              <div className="flex flex-row  bg-white rounded-full px-4 py-4">
                <img src={item.Logo} height={"18px"} width={"18px"} alt="error"></img>
              </div>

              <div className="flex flex-col items-start justify-center">
                <div className="font-semibold text-[18px]">{item.Heading}</div>
                <div className="font-base text-[14px]">{item.Description}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative">
      <div className="h-[80%] w-[100%] rounded-[50%] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] bg-blue-25  z-0 absolute translate-y-7"></div>
      <img src={timelineImage} className="relative" alt="error"></img>
      <div className="flex flex-row gap-4 items-center absolute px-8 py-6 bg-caribbeangreen-700  text-[0.9rem] text-white left-[15%] -translate-y-12" >
      <div className="flex flex-row gap-4 items-center border-r-2 border-white pr-2">
      <p className="text-[1.5rem] font-bold ">10</p>
      <p className="w-[4%] text-richblue-200">Years Experience</p>
      </div>


      <div className="flex flex-row gap-4 items-center pl-2">
      <p className="text-[1.5rem] font-bold ">250</p>
      <p className="w-[4%] text-richblue-200">Years Experience</p>
      </div>
      </div>



      </div>
    </div>
  );
};

export default TimelineSection;
