import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../Slices/authslice"
import Profile from "../Slices/Profile";
import Cartslice from "../Slices/Cartslice";
import Blurslice from "../Slices/Blur"
import Course from "../Slices/Course";
import viewCourseSlice from "../Slices/viewCourseSlice";

const rootReducer=combineReducers({
    auth:authSlice,
    profile:Profile,
    cart:Cartslice,
    blur:Blurslice,
    course:Course,
    viewCourse:viewCourseSlice
    
})

export default rootReducer;