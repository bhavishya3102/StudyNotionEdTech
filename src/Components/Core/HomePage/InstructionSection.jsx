import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import CTAButton from "../../../Components/Core/HomePage/Button";
import HighlightText from "./HighlightText";
import { BsArrowRightShort } from "react-icons/bs";



const InstructionSection = () => {
  return (
    <div>
      <div className="flex flex-row items-center gap-20 mt-14">
        <div className="w-[45%] flex items-start h-fit ">
          <img src={Instructor}></img>
        </div>

        <div className="flex flex-col gap-6 items-start w-[40%]">
        <div className="text-4xl font-bold text-white  w-[40%]">Become an 
        <HighlightText text={" instructor"}></HighlightText>
       </div>
        <div className="font-inter font-bold text-richblack-500 text-[1rem]">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
        </div>
        <div className="flex flex-row items-center">
        <CTAButton active={true} link={"/signup"}>Start Teaching Today</CTAButton>
        <BsArrowRightShort size={"20px"}></BsArrowRightShort>

        </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionSection;
