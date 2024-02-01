import { apiconnector } from "../apioperator";
import { category } from "../apis";
import {toast} from 'react-toastify';



const {CATEGORYPAGEDETAILS}=category;
export const catalogPageData=async (categoryid)=>{
    const toastId = toast.loading("Loading...")
    let result=null;
    
    try{
        console.log("a");
        const resp=await apiconnector("POST",CATEGORYPAGEDETAILS,{categoryid})
        console.log("rrrrr",resp);
        if(!resp?.data?.success){
            throw new Error("response not found")
            
        }
        result=resp?.data?.data;
        console.log(result);
        
    }
    catch(error){
    console.log(error);
   
    }
    toast.dismiss(toastId)
    return result;

}
