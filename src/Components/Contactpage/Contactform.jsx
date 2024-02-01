import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import countrycode from '../../data/countrycode.json'


const Contactform = () => {
    const [loading,setloading]=useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
        }=useForm();
       
        function submithandler(data){
            console.log("loging data",data);
        }

        useEffect(()=>{

            if(isSubmitSuccessful){
                reset({
                    firstname:"",
                    lastname:"",
                    email:"",
                    message:"",
                    contactno:""
                })
            }
        },[isSubmitSuccessful]);


  return (
    <div className='flex flex-col w-[11/12] items-center justify-center '>
    <form onSubmit={handleSubmit(submithandler)} >
<div className='flex flex-col gap-6 mt-8 items-baseline '>
<div className='flex flex-row gap-4 items-center mx-auto text-center'>
<div className='flex flex-col gap-1 items-baseline'>
<label htmlFor='firstname' className='text-white'>First Name<sup>*</sup></label>
<input id='firstname' name='firstname'  className="bg-richblack-500 text-white rounded-lg w-fit px-3 py-2" placeholder='Enter first name' {...register("firstname",{required:true})}></input>


</div>
<div className='flex flex-col gap-1 items-baseline' >
<label htmlFor='lastname' className='text-white'>Last Name<sup>*</sup></label>
<input id='lastname' name='lastname'  className="bg-richblack-500 text-white rounded-lg w-fit px-3 py-2" placeholder='Enter last name' {...register("lastname")}></input>

</div>
</div>

<div className=' flex flex-col gap-2 items-baseline'>

<label htmlFor='email' className='text-white'>Email<sup>*</sup></label>
<input id='email' name='email'  className="bg-richblack-500 text-white pr-[18vw] rounded-lg w-fit px-3 py-2" placeholder='Enter email' {...register("email",{required:true})}></input>
</div>

<div className='flex flex-col gap-2 items-baseline'>
<label className='text-white'>Phone no</label>
<div className='flex flex-row gap-2'>
<select  

className='w-[80px] text-richblack-25 bg-richblack-500  rounded-lg  px-[15px] py-3 '
{...register("countrycode",{required:true})}
>
{
    countrycode.map((elem,ind) => {
        return (
            <option key={ind}>
            {elem.code}-{elem.country}
            </option>
        )
        
    })
}


</select>
<input name='phoneno' id='phoneno' placeholder='12345-6789' type='number' className='bg-richblack-500 pr-48  rounded-lg w-fit pl-3 py-2' {...register("phoneno",{
    required:{value:true,message:"phone no is required"},
    maxLength:{value:10,message:"Max length is 10"},
    minLength:{value:8,message:"Min length is 8"}
})} >
</input>
</div>
</div>

<div className=' flex flex-col gap-2 items-baseline'>
<label htmlFor='message' className='text-white'>Message<sup>*</sup></label>
<textarea
className="bg-richblack-500 text-white rounded-lg w-full px-3 py-1 pr-[14vw]"
rows={"7"}
cols={"30"}
placeholder='Enter message'
id='message'
name='message'
{...register("message")}
></textarea>

</div>

<button type='submit' className='bg-yellow-400 px-4 py-2 rounded-md '>
Send Message
</button>

</div>

    </form>
    
    </div>
  )
}

export default Contactform
