import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800 text-richblack-400">

      <div className="flex flex-row w-11/12 items-center mx-auto ">
        {/**left part */}
        <div className="flex flex-row w-[50%] gap-8 ">
          {/**1st part */}
          <div>
            <img src={Logo} alt="error"></img>

            <div>

            <div className="text-white font-bold">Company</div>
              {["about", "carrer", "affiliates"].map((element, index) => {
                return <div key={index}>{element}</div>;
              })}
            </div>

            <div className="flex flex-row gap-3 items-center">
              <FaFacebook />
              <FaGoogle />
              <FaTwitter />
              <FaYoutube />
            </div>
          </div>
          {/**2nd part */}
          <div>
          <div className="text-white font-bold">Resources</div>
            <div>
              {Resources.map((elem, ind) => {
                return <div key={ind}>{elem}</div>;
              })}
            </div>

            <div >
              <div className="text-white font-bold"> Support</div>
              <p>Help Center</p>
            </div>
          </div>
          {/**3rd part */}
          <div>
          <div className="text-white font-bold">Plans</div>

            <div>
              {Plans.map((elem, ind) => {
                return <div key={ind}>{elem}</div>;
              })}
            </div>
            <div>
              {Community.map((elem, ind) => {
                return <div key={ind}>{elem}</div>;
              })}
            </div>
          </div>
        </div>
        {/**right part */}
        <div className="flex flex-row items-center  w-[50%] mt-[169px] ">
          <div className="flex flex-row   gap-14 ">
            {FooterLink2.map((item, i) => {
              return (
                <div key={i}>
                  <div className="text-white font-bold">{item.title}</div>
                  <div className="flex flex-col ">
                    {item.links.map((elem, ind) => {
                      return (
                        <Link to={elem.link} key={ind}>
                          <div>{elem.title}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/**bottom footer */}
      <div className="flex flex-row justify-between mt-24 border-t-2 border-richblack-400 p-4">
      <div className="flex flex-row gap-4">
    {
        BottomFooter.map((elem,ind)=>{
            return(
                <div key={ind}>{elem}</div>
            )
        })
    }  
      
      </div>

      <div className=" pr-6">Made with ❤️ CodeHelp © 2023 Studynotion</div>
      </div>
    </div>
  );
};

export default Footer;
