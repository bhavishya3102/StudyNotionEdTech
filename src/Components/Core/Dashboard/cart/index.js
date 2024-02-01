import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses ';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {total,totalItems}=useSelector((state)=>state.cart);
    console.log(total)
  return (
    <div className='text-white'>
    <h1 className='font-bold text-[1.4rem]'>Home/DashBoard/Cart</h1>
      <h1 className='font-bold text-[1.4rem]'>My WishList</h1>
      <p className='font-semibold text-[1.2rem]'>{totalItems} Courses in WishList</p>
      {
        total>0?(
            <div className='flex flex-row gap-2 justify-between'>
            <RenderCartCourses/>
            <RenderTotalAmount/>
            </div>

        ):(
            <div>
            No courses in the cart
            </div>
        )
      }
    </div>
  )
}

export default Cart
