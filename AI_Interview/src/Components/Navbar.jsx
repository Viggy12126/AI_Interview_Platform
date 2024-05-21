import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/user';

const Navbar = ({isAuthenticated=false,user}) => {

  // const user=false;
  // const name="abc";

  const dispatch=useDispatch();

  const logoutHandler=()=>{
dispatch(logout());

  }

  return (
    <div className='flex justify-between'>

        <div className='flex items-center justify-center  text-white text-2xl font-bold'>
          <Link to={'/'}>
<p>AI Interview</p>
</Link>
        </div>

        <div className='flex items-center justify-center gap-4 o text-white text-2xl'>
<p>Pricing</p>

<Link to={'/courses'}>
<p>Interviews</p>
</Link>
        </div>

        <div className=' text-white text-2xl'>
          {isAuthenticated==true ? (
            <div className='flex gap-6'>
     <p>Welcome, {user.name}!</p>
     
     <button onClick={logoutHandler}>Logout</button>
    
     </div>
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