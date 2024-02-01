import React from "react";
import CTAButton from "../HomePage/Button";
import { BsArrowRightShort } from "react-icons/bs";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codecolor,
}) => {
  return (
    <div className={`flex ${position}  my-20 items-center w-9/12 mx-auto mt-8 gap-32 `}>
      <div className="flex flex-col w-[120%] pl-6">
        {/*section1  */}
    
        {heading}
        
        
        <div className=" text-richblack-400 font-inter font-bold">
        {subheading}
        
        </div>

        <div className="flex flex-row gap-6 mt-6">
          <CTAButton active={ctabtn1.active} link={ctabtn1.link}>
            <div className="flex flex-row gap-3 items-center">
              {ctabtn1.btntext}
              <BsArrowRightShort size={"20px"}></BsArrowRightShort>
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} link={ctabtn2.link}>
            {ctabtn2.btntext}
          </CTAButton>
        </div>
      </div>

      {/*section 2 */}
      <div className="h-fit flex flex-row  w-[100%] font-inter  p-4 ml-2 border border-gray-800 shadow-md">

      
        <div className="flex flex-col w-[6%]">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
        </div>

        <div className={`font-mono ${codecolor} w-[90%] lg:w-[500px]`}>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          ></TypeAnimation>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
