import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { createRating } from '../../../services/operations/courseDetailsAPI'
import { RxCross2 } from 'react-icons/rx'

const CourseReviewModal = ({setReviewModal}) => {
  const {user}=useSelector((state)=>state.profile)
  const {token}=useSelector((state)=>state.auth)
  const {  courseEntireData}=useSelector((state)=>state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,formState:{errors}
  }=useForm();

  useEffect(() => {
  setValue("courseExperience","")
  setValue("courseRating",0)
  }, [])

  const ratingchange=(newrating)=>{
setValue("courseRating",newrating)
  }

  const submithandler=async (data)=>{
console.log(data.courseExperience)
console.log(data.courseRating)
console.log(courseEntireData._id)
await createRating({
  courseid:courseEntireData._id,
  rating:data.courseRating,
  review:data.courseExperience
},token)
setReviewModal(false)
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
    <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

      {/**review Modal */}
       <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">

      <p className='font-bold text-[1.4rem] text-white'>Add Review</p>
      <button onClick={()=>setReviewModal(false)}> <RxCross2 color='white' /></button>

      </div>
       
      {/** review body */}
      <div>
      <img src={user?.image} className='w-[50px] aspect-square rounded-full mt-2'></img>
      <div>
      <p className='text-white font-bold'>{user.firstname} {user.lastname}</p>
      <p className='text-richblack-300 font-semibold'>Posting Publicily</p>
      </div>
      </div>

      <form onSubmit={handleSubmit(submithandler)} className='flex flex-col'>
      <ReactStars
      count={5}
      onChange={ratingchange}
      size={24}
      activeColor="#ffd700"
    />
    <div>
    <label htmlFor='courseExperience' className='text-white font-bold text-[1rem]'>Add Your Experience</label>
    <textarea 
    id='courseExperience'
    placeholder='Add your Experience here'
    {...register("courseExperience",{required:true})}

    className='min-h-[130px] w-full form-style '
    ></textarea>
    </div>
    <div className='flex flex-row gap-3'>
    <button className='text-black bg-richblack-400 px-4 py-2 rounded-md my-3 mx-2' onClick={()=>setReviewModal(false)}>Cancel</button>
    <button type='submit' className='text-black bg-richblack-400 px-4 py-2 rounded-md my-3 mx-2'>Save</button>
    </div>
      </form>
      </div>
    </div>
  )
}

export default CourseReviewModal
