import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import HighlightText from "../Components/Core/HomePage/HighlightText";
import CTAButton from "../Components/Core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlock from "../Components/Core/HomePage/CodeBlock";
import TimelineSection from "../Components/Core/HomePage/TimelineSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import InstructionSection from "../Components/Core/HomePage/InstructionSection";
import Footer from "../Components/Common/Footer"
import Explore from "../Components/Core/HomePage/Explore";
import { useDispatch } from "react-redux";
import { getreviews } from "../services/operations/courseDetailsAPI";

import ReviewSlider from "../Components/Core/HomePage/ReviewSlider";






const Home = () => {

  return (
    <div>
      <div className="bg-richblack-900">
        {/* Section 1 */}
        <div className="relative  text-white justify-between  flex flex-col w-11/12 items-center ">
          <Link to={"/signup"}>
            <div className="group flex flex-row mt-16  rounded-full bg-richblack-800 border-b-2 font-bold text-richblack-200 transition-all duration-200 hover:scale-95">
              <div className="flex flex-row transition-all duration-200 px-10 py-[12px] items-center rounded-full gap-2 group-hover:bg-richblack-900">
                <p>Become an Instructor</p>
                <BsArrowRightShort size={"25px"} />
              </div>
            </div>
          </Link>

          <div className=" text-[36px]  font-semibold  mt-5  text-center font-inter ">
            Empower Your Future with
            <HighlightText text={"Coding Skills"}></HighlightText>
          </div>

          <div className="font-bold mt-4  text-richblack-300 text-center w-[70%] mx-auto ">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>

          <div className="flex flex-row  gap-6 mt-8 ">
            <CTAButton active={true} link={"/signup"}>
              Learn More
            </CTAButton>
            <CTAButton active={false} link={"/login"}>
              Book A Demo
            </CTAButton>
          </div>

          <div className="mx-3 my-12 w-[70%] border-b-[14px] border-r-[14px] shadow-sm border-white">
            <video loop muted autoPlay>
              <source src={Banner} type="video/mp4"></source>
            </video>
          </div>

          <div>
            <CodeBlock
              position={"flex-row"}
              heading={
                <div className="font-semibold text-[34px] font-inter">
                  Unlock your
                  <HighlightText text={"coding potential"}></HighlightText>
                  with our online courses.
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={{
                btntext: "try it Yourself",
                active: true,
                link: "/signup",
              }}
              ctabtn2={{
                btntext: "Learn More",
                active: false,
                link: "/login",
              }}
              codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\nbody>\nh1><ahref="/">Header</a>\n/h1>`}
              codecolor={"text-yellow-25"}
            ></CodeBlock>

            <CodeBlock
              position={"flex-row-reverse"}
              heading={
                <div className="font-semibold text-[34px] font-inter">
                  Start
                  <HighlightText text={"coding in seconds"}></HighlightText>
                </div>
              }
              subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              ctabtn1={{
                btntext: "Continue learn",
                active: true,
                link: "/signup",
              }}
              ctabtn2={{
                btntext: "Learn More",
                active: false,
                link: "/login",
              }}
              codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example\n</title><linkrel="stylesheet"href="styles.css">\n</head>\nbody>\nh1><ahref="/">Header</a>\n/h1>`}
              codecolor={"text-yellow-25"}
            ></CodeBlock>
          </div>




          {/**Card Section */}
          <div>
          <Explore/>
          </div>
        </div>
      </div>

      {/* section2*/}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 flex flex-col items-center mz-auto  ">
            <div className="flex flex-row h-fit items-center gap-4 mt-40 ">
              <CTAButton active={true} link={"/signup"}>
                <div className="flex flex-row gap-2 items-center font-inter font-bold">
                  Explore Full Catalog
                  <BsArrowRightShort size={"20px"}></BsArrowRightShort>
                </div>
              </CTAButton>

              <CTAButton active={false} link={"/login"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 flex flex-col items-center mx-auto  mt-12 ">
          <div className="w-11/12 flex flex-row items-center mx-auto gap-14">
            <div className="w-[45%]  text-[32px] pl-12">
              Get the skills you need for a
              <HighlightText text={"job that is in demand."}></HighlightText>
            </div>
            <div className="flex flex-col w-[40%] items-start gap-12">
              <div className="text-[16px] font-bold text-richblack-500  ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>

              <CTAButton active={true} link={"/signup"}>
                Learn More
              </CTAButton>
            </div>





          </div>

          <TimelineSection></TimelineSection>

          <LearningLanguageSection></LearningLanguageSection>
        </div>
      </div>





    {/**section 3 */}
    <div className=" bg-richblack-900 ">
    
<div className="flex flex-col w-11/12 items-center mx-auto   gap-8">
<InstructionSection></InstructionSection>


<h2 className="text-white text-[1.7rem] font-bold text-center">Reviews</h2>
<ReviewSlider ></ReviewSlider>

</div>
    </div>


    <Footer></Footer>




    </div>
  );
};

export default Home;
