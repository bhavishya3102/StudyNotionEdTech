import { apiconnector } from "../apioperator";
import {auth} from "../apis"
import { setloading ,settoken} from "../../Slices/authslice";
import {setuser} from "../../Slices/Profile"
import {resetcart} from "../../Slices/Cartslice"
import {toast} from 'react-toastify';
import { setblur } from "../../Slices/Blur";

const {RESETPASSWORDTOKEN_API,RESETPASSWORD_API,SENDOTP_API,SIGNUP_API,LOGIN_API}=auth;

export const signup=(firstname,lastname,email,password,confirmpassword,accounttype,otp,navigation)=>{
        return async(dispatch)=>{
            dispatch(setloading(true));
            console.log("a");
            try{
                console.log("d");
                console.log(firstname);
                console.log(otp);
                
                const resp=await apiconnector("POST",SIGNUP_API , {firstname,lastname,email,password,confirmpassword,accounttype,otp});
                console.log("b");
                console.log(resp);
                console.log("c");
            if(!resp.data.success){
            throw new Error(resp.data.message);
            
            }
            toast.success("signup successfully");
            navigation("/login");


                    
            }catch(error){
                console.log(error);
                toast.error("failed to signup");

            }
            dispatch(setloading(false));
            
        }
    }


    
export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
      try{
        const response=await apiconnector("POST",LOGIN_API,{email,password});
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);

        }
        
        dispatch(settoken(response.data.token));
        const userimage=response.data?.checkuser?.image?response.data.checkuser.image: `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.checkuser.firstName} ${response.data.checkuser.lastName}`;
        dispatch(setuser({...response.data.checkuser,userimage}));
        localStorage.setItem("token",JSON.stringify(response.data.token));
        localStorage.setItem("user",JSON.stringify(response.data.checkuser));
        
        toast.success("Login Successfully")

        navigate("/dashboard/my-profile");

      }catch(error){
console.log(error);
toast.error("Login failed");
      }

dispatch(setloading(false));
    }
}


export const sendotp=(email,navigate)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
      try{
        const response=await apiconnector("POST",SENDOTP_API,{email});
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message);

        }
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")

      }catch(error){
console.log(error);
toast.error("Send otp failed");
      }

dispatch(setloading(false));
    }
}

export const getResetPasswordToken=(email,setemailsent)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
        console.log("b");
        try{
            const response=await apiconnector("POST",RESETPASSWORDTOKEN_API,{email});
            console.log(response);
            if(!response.data.success){
                throw new Error(response.data.message);

            }
            setemailsent(true);

            toast.success("Reset email sent");
        }
    catch(error){
        console.log(error);
        toast.error("Failed to send email ");
    }

dispatch(setloading(false));

    }
}

export const getresetpassword=(password,confirmPassword,token)=>{
    return async(dispatch)=>{
        dispatch(setloading(true));
        try{
const response=await apiconnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
console.log(response);
if(!response.data.success){
    throw new Error(response.data.message);

}

toast.success("password reset successfully");

        }catch(error){
console.log(error);
toast.error("fail to reset password");
        }
        dispatch(setloading(false));

    }
}

export const logout=(navigate)=>{
    return async(dispatch)=>{
        dispatch(settoken(null));
        console.log("a");
        dispatch(setuser(null));
        console.log("b");
        console.log("c");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setblur(false));
        dispatch(resetcart());
        toast.success("logout successfully");
        navigate("/");
    }
}


