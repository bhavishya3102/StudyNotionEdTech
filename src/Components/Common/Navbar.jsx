import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/techlearn.png";
import { NavbarLinks } from "../../data/navbar-links";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector } from "react-redux";

import { FiShoppingCart } from "react-icons/fi";
import { apiconnector } from "../../services/apioperator";
import { categories } from "../../services/apis";
import ProfileDropdown from "../Core/Auth/ProfileDropdown";

const Navbar = () => {
  const [links, setlinks] = useState([]);
  const fetchlink = async () => {
    try {
      const res = await apiconnector("GET", categories.CATEGORIE_API);
      console.log(res);
      setlinks(res.data.allcategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchlink();
  }, [categories]);

  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  console.log(links);
  console.log(user);
  console.log(token);

  function match(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div className="h-14 border-b-[1px] border-richblack-700 flex items-center justify-center py-2 ">
      <div className=" w-11/12 flex flex-row items-center justify-between">
        {/**Logo */}

        <Link to="/">
          <img src={logo} alt="error" width={150} height={42}></img>
        </Link>

        {/** Home */}
        <nav>
          <ul className="flex flex-row gap-4">
            {NavbarLinks.map((link, ind) => {
              return (
                <li key={ind} className=" text-white">
                  {link.title === "Catalog" ? (
                    <div className=" group flex flex-row gap-2 items-center group relative cursor-pointer">
                      {link.title}
                      <MdKeyboardArrowDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                        {links.map((elem, ind) => {
                          return <Link to={`/catalog/${elem.name.split(" ").join("-").toLowerCase()}`}><p key={ind}>{elem.name}</p></Link>
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path} >
                      <p
                        className={`${
                          match(link.path) ? "text-yellow-25" : "text-white-25"
                        } flex items-center `}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/**login/signup/dashboard */}

        <div className="flex flex-row gap-2">
          {user && user?.instructortype != "Instructor" && (
            <Link
              to="/dashboard/cart"
              className=" text-white  flex items-center rounded-md"
            >
              <FiShoppingCart size={"1.2rem"}/>
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link
              to="/signup"
              className="border-white border text-white px-4 py-1  rounded-md"
            >
              <button>SignUp</button>
            </Link>
          )}

          {token === null && (
            <Link
              to="/login"
              className="border-white border text-white px-4 py-1 rounded-md"
            >
              <button>Login</button>
            </Link>
          )}

          {token !== null && <ProfileDropdown/>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
