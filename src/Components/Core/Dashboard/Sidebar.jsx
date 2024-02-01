import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import Sidebarlinks from "../../Core/Dashboard/Sidebarlinks";
import { logout } from "../../../services/operations/authapi";
import Confirmation from "../../Common/Confirmation";
import { setblur } from "../../../Slices/Blur";


const Sidebar = () => {
  console.log("A");
  const { loading: authloading } = useSelector((state) => state.auth);
  const { user, loading: profileloading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [confirmationmodel, setconfirmationmodel] = useState(null);
  const { logoutbtn } = useSelector((state) => state.blur);
  console.log(logoutbtn);

  console.log("confirm", confirmationmodel);
  if (authloading || profileloading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }
  function cancelhandler(){
    setconfirmationmodel(null);
    dispatch(setblur(false));
    
  }

  function logouthandler() {
    setconfirmationmodel({
      text1: "Are You Sure?",
      text2: "You will be logged out!!",
      btntext1: "Logout",
      btntext2: "Cancel",
      btnhandler1: () => dispatch(logout(navigation)),
      btnhandler2: () => cancelhandler(),
    });

    dispatch(setblur(true));
  }

  return (
    <div>
      <div className={`h-[calc(100vh-3.5rem)] min-w-[220px] flex flex-col bg-richblack-800 w-[10%] ${logoutbtn?"blur-lg":"blur-none"}`}>
        <div className="flex flex-col gap-4">
          {sidebarLinks.map((links) => {
            if (links.type && user?.accounttype !== links.type) return null
            return (
              <Sidebarlinks key={links.id} link={links} iconname={links.icon} />
            );
          })}
        </div>

        {/**setting and logout section */}
        <div></div>
        <div className="mt-[16px]">
          {/**setting section */}
          <Sidebarlinks
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconname={"VscSettingsGear"}
          ></Sidebarlinks>
          <button onClick={() => logouthandler()}>
            <div className="flex items-center gap-x-2 text-richblack-300  translate-y-4 pl-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {confirmationmodel && logoutbtn && (
        <Confirmation modaldata={confirmationmodel} />
      )}
    </div>
  );
};

export default Sidebar;
