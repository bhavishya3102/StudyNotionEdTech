import React, { useState } from 'react'
import {Chart,registerables} from "chart.js"
import {Pie} from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({courses}) => {
    const [curchart,setcurchart]=useState("students")

    const [data,setdata]=useState(null)

    // function to generate the random color
    // make  a array of random color of length equal to 
    // no of courses created by instructor
    const getRandomColors=(numColors)=>{
        const colors=[];
        for(let i=0;i<numColors;i++){
            const color=`rgba(${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info
const chartDataForStudents={
    labels:courses.map((course)=> course.coursename),
    datasets:[
        {
            data:courses.map((course)=> course.totalStudentsEnroll),
            backgroundColor:getRandomColors(courses.length)
        }

    ]
}

    // create data for chart displaying income info
    const chartDataForIncome={
        labels:courses.map((course)=> course.coursename),
        datasets:[
            {
                data:courses.map((course)=> 
                
                course.totalAmountGenerate
                
                ),
                backgroundColor:getRandomColors(courses.length)
            }
    
        ]
    }

    const options={

    }
  return (
    <div>
      <p className='text-[1.4rem]'>Visualize</p>
      <div className='flex flex-row gap-4'>
      <button onClick={()=>setcurchart("students")} className={`${curchart==="students"?
      "bg-richblack-400 text-white":"bg-richblack-800 text-white"}`} >
      Student
     
      </button>
      <button onClick={()=>setcurchart("income")} className={`${curchart==="income"?
      "bg-richblack-400 text-white":"bg-richblack-800 text-white"}`} >
      Income
      </button>
      </div>
      <div >
      <Pie 
      data={curchart==="students"?chartDataForStudents:chartDataForIncome}
      options={options}
      ></Pie>
      </div>
    </div>
  )
}

export default InstructorChart
