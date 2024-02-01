import axios from "axios";
export const axiosInstance=axios.create({});
export const apiconnector=(method,url,bodydata,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodydata?bodydata:null,
        headers:headers?headers:null,
        params:params?params:null,


    })

}