import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,active,link}) => {
  return (
    <Link to={link}>
    <div className={`px-5 py-3 rounded-md font-bold  ${active?" bg-yellow-100 text-black border-yellow-5 border-b-2 border-r-2":" bg-richblack-600 text-white  border-richblack-100 border-b-2 border-r-2"}` }>
    {children}
    </div>
    
    </Link>
  )
}

export default Button
