import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"


export default function Sidebarlinks({ link,iconname }) {
  const Icon = Icons[iconname]
  const location = useLocation()
  const dispatch = useDispatch()
  console.log('A');

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }
  console.log(link);

  return (
    <NavLink
      to={link.path}
    
      className={`relative  text-sm font-medium  ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50 w-[100%]  py-1"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
     
      <div className="flex items-center gap-x-2 pl-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}

