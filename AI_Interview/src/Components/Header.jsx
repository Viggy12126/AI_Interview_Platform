import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
    
    
    {/* <h1 className=' text-white text-6xl font-bold mb-10'>AI-Powered Mock Interviews To Unlock Your Dream Career</h1> */}
    
    <h1 className='text-white text-6xl font-bold mb-10'>
  <span className="text-blue-500">AI-Powered</span> Mock Interviews To Unlock Your Dream Career
</h1>

    <p className=' text-white text-2xl  mb-10'>Meet Your AI Interview Coach. The Fastest Way to Excel in Your Job Interviews. Our AI Assistant Provides In-depth Practice and Insights for Interview Mastery.</p>
    <Link to={'/courses'}>
    <button className='bg-blue-600 hover:bg-blue-800  text-white px-3 py-3.5 text-2xl rounded-2xl '>Get Started</button>
    </Link>
    
    
    </div>
  )
}

export default Header
