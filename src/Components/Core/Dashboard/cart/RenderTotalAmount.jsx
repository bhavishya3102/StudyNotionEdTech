import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BuyCourse } from '../../../../services/operations/studentFeaturesApi';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const {total,cart}=useSelector((state)=>state.cart);
    const {token}=useSelector((state)=> state.auth)
    const {user}=useSelector((state)=>state.profile)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function paymenthandler(){
// console.log(cart);
      const courses=cart.map((course) => course?.coursedetail._id)
      // console.log(courses)            //[ '65a9506b6bf7d3b55ee5450a', '65a7b343f180d2ccff74ca84' ]
      BuyCourse(token,courses, user, navigate, dispatch);
    }
  return (
    <div className='flex flex-col gap-3 bg-richblack-800 px-4  py-2 justify-center h-[30vh] w-[15vw] items-center rounded-md'>
      <div className='font-bold text-[1.2rem]'> Total</div>
      <div className='font-bold text-[1.2rem]'>Rs.{total}</div>
      <div>
      <button onClick={paymenthandler} className='bg-yellow-25 text-black px-4 py-2 rounded-md'>
      Buy Now
      </button>
      </div>
    </div>
  )
}

export default RenderTotalAmount
