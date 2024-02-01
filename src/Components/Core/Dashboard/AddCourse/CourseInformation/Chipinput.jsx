import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md"


const Chipinput = ({name,label,setValue,getValues,errors,placeholder,register}) => {
    const [chips,setchips]=useState([]);
    const {editCourse,course}=useSelector((state)=> state.course);
console.log(course);
useEffect(() => {
    if(editCourse){
setchips(course.tag);
    }
    register(name,{required:true,validate:(value)=>value.length>0})
}, [])

useEffect(() => {
setValue(name,chips);
}, [chips]);

console.log(chips);

function handlekeydown(event){
// check if user preses enter or ,
if(event.key==="Enter" || event.key===","){
    event.preventDefault();
    // get the input value and remove any leading spaces
    const chipvalue=event.target.value.trim();

    if(chipvalue && !chips.includes(chipvalue)){
        // include the chipvalue in the chiplist
        const newchips=[...chips,chipvalue];
        // update the list of chips --
        setchips(newchips);
        // empty the input value
        event.target.value="";
    }
}
}
function removehandler(index){
    const newlist=[...chips];
    newlist.splice(index,1);
    setchips(newlist);

}


  return (
    <div>
      <label htmlFor={name}  className="text-white  font-bold text-[1.2rem]">{label} </label>
      <div className='flex m-2'>
      {
        chips.map((item,index) => {
            return <div key={index} className='flex flex-row gap-2 '>

            <div className='m-1  flex items-center rounded-full bg-yellow-300 text-richblack-5 px-3 py-1 '>{item}
            <button onClick={()=>removehandler(index)}>
            <MdClose className="text-sm" />
            
            </button>
            </div>
           
            </div>
            
        })
      }
      
      </div>

      <input id={name} name={name} type='text' 
      placeholder={placeholder} onKeyDown={handlekeydown}
className='form-style w-full'
      ></input>
      {
        errors[name]&&(
            <span>
            {label} is required
            </span>
        )
      }
    </div>
  )
}

export default Chipinput
