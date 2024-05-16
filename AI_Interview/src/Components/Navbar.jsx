import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({isAuthenticated=false,user}) => {

  // const user=false;
  // const name="abc";

  return (
    <div className='flex justify-between'>

        <div className='flex items-center justify-center  text-white text-2xl font-bold'>
<p>AI Interview</p>
        </div>

        <div className='flex items-center justify-center gap-4 o text-white text-2xl'>
<p>Pricing</p>
<p>Interviews</p>
        </div>

        <div className=' text-white text-2xl'>
          {isAuthenticated==true ? (
     <p>Welcome, {user.name}!</p>
          ):(
            <Link to={'/register'}>
            <p>Sign up</p>
            </Link>
          )}
           
            
        </div>
    </div>
  )
}

export default Navbar