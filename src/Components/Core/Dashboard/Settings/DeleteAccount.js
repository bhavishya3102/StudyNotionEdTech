import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteaccount } from '../../../../services/operations/settingapi';
import { useNavigate } from 'react-router-dom';
const DeleteAccount = () => {
  const {token}=useSelector((state)=>state.auth);
  const navigate=useNavigate();
  const dispatch=useDispatch();

function deletehandler(){
dispatch(deleteaccount(token,navigate));
}
  return (
    <div className='text-white bg-pink-900 p-8 px-8 py-7  rounded-lg mt-4'>
      <div>
      {/**delete icon */}
      <div>
      
      </div>

      {/**delete account */}
      <div>
      <h1 className='text-white font-bold font-inter text-[1.4rem] mb-2'>Delete Account</h1>
      <p className="w-3/5 text-pink-25">Would you like to delete account?</p>
      <p className="w-3/5 text-pink-25">This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
      <button onClick={deletehandler}   className="w-fit cursor-pointer italic text-pink-300 mt-2"> I want to delete my account.</button>
      </div>
      </div>
    </div>
  )
}

export default DeleteAccount
