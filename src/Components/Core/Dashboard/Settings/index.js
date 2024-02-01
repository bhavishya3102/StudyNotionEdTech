import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'
import { useSelector } from 'react-redux'

const Settings = () => {
  const { logoutbtn } = useSelector((state) => state.blur);


  const {loading}=useSelector((state)=>state.profile);
  return (
    <div className={` ${logoutbtn?"blur-lg":"blur-none"}`}>
    {
      loading?(<div className='text-white'>Loading</div>):(
        <>
        
      <h1>Edit Profile </h1>
      <div>

      <ChangeProfilePicture/>
      <UpdateProfile/>
      <UpdatePassword/>
      <DeleteAccount/>
      
      </div>
        </>
      )
    }



    </div>
  )
}

export default Settings
