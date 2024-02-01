import { createSlice } from "@reduxjs/toolkit";


const initialState={
logoutbtn:false
    
}
const Blurslice=createSlice({
name:"blur",
initialState:initialState,
reducers:{
    setblur(state,action){
        state.logoutbtn=action.payload;
    }
}
})

export const {setblur}=Blurslice.actions;
export default Blurslice.reducer;