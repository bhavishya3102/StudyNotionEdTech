import { setloading } from "../../Slices/Profile";
import { apiconnector } from "../apioperator";
import { setting } from "../apis";
import {toast} from 'react-toastify';
import { setuser } from "../../Slices/Profile";
import { logout } from "./authapi";



const {UPDATEDISPLAY_PICTURE,
DELETE_PROFILE,
UPDATE_PROFILE,
CHANGEPASSWORD}=setting;


export const updatedisplaypicture=(formdata,token)=>{
return async(dispatch)=>{
   
    try{
        dispatch(setloading(true));
const response=await apiconnector("PUT",UPDATEDISPLAY_PICTURE,formdata,{
    Authorisation:`Bearer ${token}`
})
console.log("profileresponse",response);
if(!response.data.success){
    throw new Error(response.data.message);
}
toast.success("update display picture successfully");
dispatch(setuser(response.data.data));
dispatch(setloading(false));

    }catch(error){
        console.log(error);
        toast.error("failed to display picture");
    }

} 
}


export const updateprofile=(formdata,token)=>{
    return async(dispatch)=>{
       
        try{
            dispatch(setloading(true));
    const response=await apiconnector("PUT",UPDATE_PROFILE,formdata,{
        Authorisation:`Bearer ${token}`
    })
    console.log("profileresponse",response);
    if(!response.data.success){
        throw new Error(response.data.message);
    }
    
    toast.success("update Profile successfully");
    dispatch(setloading(false));
    dispatch(setuser(response.data.updateuser));
        }catch(error){
            console.log(error);
            toast.error("failed to update profile ");
        }
    
    } 
    }

    export const changepassword=(formdata,token)=>{
        return async(dispatch)=>{
   
            try{
                dispatch(setloading(true));
        const response=await apiconnector("POST",CHANGEPASSWORD,formdata,{
            Authorisation:`Bearer ${token}`
        })
        console.log("profileresponse",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("update password successfully");
        dispatch(setloading(false));
        
            }catch(error){
                console.log(error);
                toast.error("failed to update password");
            }
        
        } 
    }

    
    export const deleteaccount=(token,navigate)=>{
        return async(dispatch)=>{
   
            try{
                dispatch(setloading(true));
        const response=await apiconnector("DELETE",DELETE_PROFILE,null,{
            Authorisation:`Bearer ${token}`
        })
        console.log("profileresponse",response);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("delete profile successfully");
        dispatch(logout(navigate));
        dispatch(setloading(false));
        
            }catch(error){
                console.log(error);
                toast.error("failed to delete profile");
            }
        
        } 
    }