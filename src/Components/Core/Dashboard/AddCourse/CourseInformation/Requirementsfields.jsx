import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Requirementsfields = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValue,
}) => {
  const [requirements, setrequirements] = useState();
  const [requirementlist, setrequirementlist] = useState([]);

  const { editCourse, course } = useSelector((state) => state.course);
  console.log(editCourse)
  useEffect(() => {
    if (editCourse) {
      setrequirementlist(course.instructions)
      // console.log(course.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    
  }, []);

  useEffect(() => {
    setValue(name, requirementlist);  
     //courseRequirements: (2) ['ghgfh', 'ghty']
     console.log(requirementlist)
  }, [requirementlist]);

  function clickhandler() {
    if (requirements) {
      setrequirementlist([...requirementlist, requirements]);
      setrequirements("");
    }
    console.log("req" + requirementlist);
  }


  function removehandler(index){
const templist=[...requirementlist];
templist.splice(index,1);
setrequirementlist(templist);
  }


  return (
    <div>
      <div>
        <label>
          <p  className="text-white  font-bold text-[1.2rem]"> {label}</p>
          <input
            id="req"
            type="text"
            className="form-style w-full"
            onChange={(e) => setrequirements(e.target.value)}
            value={requirements}
            
          ></input>
        </label>
        <button type="button" onClick={clickhandler}
        className="font-semibold text-yellow-50"
        >Add</button>
      </div>
      <div className="mt-2 list-inside list-disc">
      {
       requirementlist && requirementlist.map((item,index) => {
            return <div key={index} className="flex items-center text-richblack-5">

            <span>{item}</span>
            {`   `}
            <span>
            <button className="ml-2 text-xs text-pure-greys-300 " onClick={()=>removehandler(index)}>clear</button>
            </span>
            </div>
            
        })
      }
      </div>
    </div>
  );
};

export default Requirementsfields;
