import "./App.css";
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./Components/Common/Navbar"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import PrivateRoute from "./Components/Core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./Components/Core/Dashboard/Profile";
import Error from "./pages/Error"
import Settings from "./Components/Core/Dashboard/Settings";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses";
import Cart from "./Components/Core/Dashboard/cart";
import { useSelector } from "react-redux";
import AddCourse from "./Components/Core/Dashboard/AddCourse";
import MyCourses from "./Components/Core/Dashboard/MyCourses";
import EditCourse from "./Components/Core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Components/Core/ViewCourse/VideoDetails";
import Purchasehistory from "./Components/Core/Dashboard/Purchasehistory";
import Instructor from "./Components/Core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const {user}=useSelector((state)=>state.profile);
  console.log(user);

  return (
<div className=" w-screen h-screen bg-richblack-900 flex flex-col font-inter">
<Navbar></Navbar>
<Routes>
<Route path="/" element={<Home />}></Route>
<Route path="/about" element={<About />}></Route>
<Route path="/signup" element={<Signup />}></Route>
<Route path="/login" element={<Login />}></Route>
<Route path="/catalog/:catalogname" element={<Catalog />}></Route>
<Route path="/course/:courseid" element={<CourseDetails/>}></Route>
<Route path="/forgotpassword" element={<ForgotPassword />}></Route>
<Route path="/update-password/:id" element={<UpdatePassword />}></Route>
<Route path="/verify-email" element={<VerifyEmail />}></Route>
<Route path="/contact" element={<Contactus />}></Route>

<Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>

<Route path="/dashboard/my-profile" element={<Profile />}></Route>
<Route path="/dashboard/settings" element={<Settings />}></Route>

{
  user?.accounttype==="Student" &&

<>
<Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />}></Route>
<Route path="/dashboard/purchase-history" element={<Purchasehistory />}></Route>
<Route path="/dashboard/cart" element={<Cart />}></Route>
</>
}
{
  user?.accounttype==="Instructor" && 
  <>
  <Route path="/dashboard/add-course" element={<AddCourse/>}></Route>
  <Route path="/dashboard/my-courses" element={<MyCourses/>}></Route>
  <Route path="/dashboard/instructor" element={<Instructor/>}></Route>
  <Route path="/dashboard/edit-course/:courseid" element={<EditCourse/>}></Route>

  </>
}

</Route>


<Route element={
  <PrivateRoute><ViewCourse/></PrivateRoute>
}>

{
  user?.accounttype==="Student" &&(
    <>
    <Route path="view-course/:courseid/section/:sectionid/subsection/:subsectionid"
    element={<VideoDetails/>}
    ></Route>
    </>
  )
  
}

</Route>
<Route path="*" element={<Error/>}></Route>


</Routes>
</div>
  );
}

export default App;
