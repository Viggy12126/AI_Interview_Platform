import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const Courses = () => {

    const { loading, courses, error, message } = useSelector(
        state => state.course
      );
    const dispatch=useDispatch();

      useEffect(()=>{
     dispatch(getAllCourses());

     if (error) {
        toast(error, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
           
            });

        // dispatch({ type: 'clearError' });
      }
  
      if (message) {
        toast(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          
            });
        // dispatch({ type: 'clearMessage' });
      }

      },[dispatch,message,error])

  return (
    <div className="min-h-screen px-40 py-20 dark dark:bg-slate-950 items-center flex flex-col overflow-hidden">


        <p className=' text-white text-4xl mb-10'>Try for <span className="text-blue-500">Free</span></p>
 

 
<div className='flex flex-wrap gap-5 overflow-hidden'>

    {/* All Courses */}
    {courses.map(course=>(
 <div className='dark:bg-slate-800 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
      
     

 <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
 <h1 className='text-white font-bold'>{course.title}</h1>
 <p className='text-green-500 font-bold'>{course.difficulty}</p>
  
  <h1 className='font-bold text-white'>These are {course.title} questions</h1>
  {/* <p>{course._id}</p> */}
  <Link to={`/course/${course._id}`}>
  <button className='bg-blue-600 hover:bg-blue-800  text-white text-2xl rounded-xl px-2 py-1'>Try now</button>
  </Link>
 </div>

</div>
    ))}


    {/* <div className='dark:bg-slate-700 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
      
     

        <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
        <h1 className='text-white font-bold'>Behavorial Demo</h1>
        <p className='text-green-500 font-bold'>Easy</p>
         
         <h1 className='font-bold text-white'>These are Behavorial questions</h1>
         <button className='bg-blue-600 hover:bg-blue-800  text-white text-2xl rounded-xl '>Try now</button>
        </div>
     
    </div>

    <div className='dark:bg-slate-700 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
      
     

        <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
        <h1 className='text-white font-bold'>Behavorial Demo</h1>
        <p className='text-green-500 font-bold'>Easy</p>
         
         <h1 className='font-bold text-white'>These are Behavorial questions</h1>
         <button className='bg-blue-600 hover:bg-blue-800  text-white text-2xl rounded-xl '>Try now</button>
        </div>
     
    </div>


    <div className='dark:bg-slate-700 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
      
     

      <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
      <h1 className='text-white font-bold'>Behavorial Demo</h1>
      <p className='text-green-500 font-bold'>Easy</p>
       
       <h1 className='font-bold text-white'>These are Behavorial questions</h1>
       <button className='bg-blue-600 hover:bg-blue-800  text-white text-2xl rounded-xl '>Try now</button>
      </div>
   
  </div>


  <div className='dark:bg-slate-700 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
      
     

      <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
      <h1 className='text-white font-bold'>Behavorial Demo</h1>
      <p className='text-green-500 font-bold'>Easy</p>
       
       <h1 className='font-bold text-white'>These are Behavorial questions</h1>
       <button className='bg-blue-600 hover:bg-blue-800  text-white text-2xl rounded-xl '>Try now</button>
      </div>
   
  </div>


  <div className='dark:bg-slate-700 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
      
     

      <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
      <h1 className='text-white font-bold'>Behavorial Demo</h1>
      <p className='text-green-500 font-bold'>Easy</p>
       
       <h1 className='font-bold text-white'>These are Behavorial questions</h1>
       <button className='bg-blue-600 hover:bg-blue-800  text-white text-2xl rounded-xl '>Try now</button>
      </div>
   
  </div> */}
    
</div>
    
    </div>
  )
}

export default Courses