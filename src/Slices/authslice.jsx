import { createSlice } from "@reduxjs/toolkit";


const initialState={
    signupdata:null,
    loading:false,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}
const authSlice=createSlice({
name:"auth",
initialState:initialState,
reducers:{
    setsignupdata(state,action){
        state.signupdata=action.payload;
    },
    setloading(state,action){
        state.loading=action.payload;
    },
    settoken(state,action){
        state.token=action.payload;
    }
}
})

export const {setloading,setsignupdata,settoken}=authSlice.actions;
export default authSlice.reducer;