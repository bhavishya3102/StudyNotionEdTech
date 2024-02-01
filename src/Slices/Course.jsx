import { createSlice } from "@reduxjs/toolkit";

const initialState={
    step:1,
    course:null,
    editCourse:false,
    paymentLoading:false

}

const Course=createSlice({
    name:"course",
    initialState,
    reducers:{
        setstep:(state,action)=>{
            state.step=action.payload;
        },
        setcourse:(state,action)=>{
            state.course=action.payload;

        },
        seteditCourse:(state,action)=>{
            state.editCourse=action.payload;
        },
        setpaymentLoading:(state,action)=>{
            state.paymentLoading=action.payload;
        },
        resetcourse:(state,action)=>{
            state.step=1;
            state.course=null;
            state.editCourse=false;
        }
    }
})

export const {setcourse,setstep,setpaymentLoading,seteditCourse,resetcourse}=Course.actions;
export default Course.reducer;