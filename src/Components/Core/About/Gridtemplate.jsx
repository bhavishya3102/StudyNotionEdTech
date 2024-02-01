import React from 'react'
import CTAbutton from "../HomePage/Button"
import HighlightText from '../HomePage/HighlightText';
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
const Gridtemplate = () => {
  return (
    <div>
    {/**grid section */}
      <div className='grid  grid-cols-4 text-white p-5 mt-24 '>
      {
        LearningGridArray.map((elem,ind) => {
            return <div key={ind}
            className={`${ind===0 && "lg:col-span-2  lg:h-[280px] p-5"} 
            ${elem.order%2===0?"lg:h-[280px] p-5 bg-richblack-800":"lg:h-[280px] p-5 bg-richblack-700"}
            ${elem.order===3 && "lg:col-start-2"}
            ${elem.order<0 && "bg-transparent"}
            `}
            
            >
            {
                elem.order<0?(
                    <div className='flex flex-col gap-2  '>
                    {/**heading */}
                    <div>
                    <div>
                    {elem.heading}
                    <HighlightText text={elem.highlightText}></HighlightText>
                    
                    </div>
                    <div>
                    </div>
                    {elem.description}
                    </div>
                    <div className='w-fit'>
                    <CTAbutton active={true} link={elem.BtnLink}>{elem.BtnText}</CTAbutton>
                    
                    </div>
                   
                    </div>
                ):(
                    <div className='flex flex-col gap-2 '>
                    <div>
                    {elem.heading}
                    </div>

                    <div>
                    {
                        elem.description
                    }
                    </div>
                    </div>
                )
            }
            </div>
            
        })

      }
      </div>
    </div>
  )
}

export default Gridtemplate
