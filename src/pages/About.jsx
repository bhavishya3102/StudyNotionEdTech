import React from 'react'
import HighlightText from '../Components/Core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Gridtemplate from '../Components/Core/About/Gridtemplate'
import Contactsection from '../Components/Core/About/Contactsection'
import Statssection from '../Components/Core/About/Statssection'
import Footer from '../Components/Common/Footer'
import ReviewSlider from '../Components/Core/HomePage/ReviewSlider'




const About = () => {
  return (
   <div>
   <div className='flex flex-col mx-auto items-center justify-center  mt-8 pb-8  bg-richblack-900'>
   {/**section 1 */}
   <section >
   <div className='flex flex-col gap-4 text-white items-center'>
   {/**heading */}
   <div className=' text-[1.8rem] font-bold font-inter flex flex-col items-center'>
   Driving Innovation in Online Education for a 
   <HighlightText text={"Brighter Future"}></HighlightText>
   </div>

   {/**sub heading */}
   <div className='flex w-[45%] flex-col items-center text-center mx-auto'>
   Studynotion is at the forefront of driving innovation in online education. We are passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
   </div>

  {/**images */}
  <div className='flex gap-x-3 mx-auto'>
  <img src={BannerImage1} />
  <img src={BannerImage2} />
  <img src={BannerImage3} />
</div> 
   </div>
   </section>


   {/**section 2 */}
   <section className='w-full'>
   <div className='text-[1.8rem] font-bold font-inter text-center mx-auto mt-10 w-[70%] text-white'>
   ''We are passionate about revolutionizing the way we learn. Our innovative platform 

   <HighlightText text={"Combine Technology ,"}></HighlightText>
   <span className='text-brown-100'>expertise</span>
   {" "}
   and community to create an
   {" "}
   <span className='text-brown-100'>
 unparalleled educational experience ''
   </span>
   </div>


   {/**mission section */}
   <div className='flex flex-col gap-6 items-center  text-white mt-12 border-t-2 border-richblack-300  p-4 w-full'>
   {/**first part */}
   <div className='flex flex-row gap-24 w-[70%] mt-7 p-4 '>
   <div className='flex flex-col gap-3 '>
   <h1 className='text-[1.5rem] text-richblue-300 font-bold'>Our Founding Story</h1>
   <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
   <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
   </div>

   {/**image */}
 <div >
 <img src={FoundingStory} className='w-[140vw] h-[40vh]'></img>
 </div>
   </div>

   {/**second part */}
   <div className='flex flex-row gap-24 w-[70%]  p-4 mt-12'>
   <div >
   <h1 className='text-[1.5rem] text-richblue-300 font-bold mb-4'>Our Vision</h1>
   <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
</div>

{/* right box */}
<div>
   <h1 className='text-[1.5rem] text-richblue-300 font-bold mb-4'>
       Our Mission
   </h1>
   <p>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
</div>
   </div>
   </div>


   </section>

   {/*section3 */}
   <section>
   <Statssection/>
   </section>

   {/**sction 4 */}
   <section>
   <Gridtemplate></Gridtemplate>
   <Contactsection></Contactsection>
   </section>
   <h2 className="text-white text-[1.7rem] font-bold text-center">Reviews</h2>
   <ReviewSlider ></ReviewSlider>
  
 </div>




   <Footer></Footer>
   </div>
  )
}

export default About
