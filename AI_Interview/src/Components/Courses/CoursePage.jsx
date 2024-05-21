import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseQuestions } from '../../redux/actions/course.js';
import Navbar from '../Navbar.jsx';
import Webcam from 'react-webcam';

const CoursePage = ({isAuthenticated,user}) => {

    const {loading,questions}=useSelector(
        state => state.course
      );

      // const { isAuthenticated, user, message, error, } = useSelector(
      //   state => state.user
      // );
    const dispatch=useDispatch();
    const params = useParams();
    const [index,setIndex]=useState(0);

    useEffect(()=>{
        // console.log(params.id);
   dispatch( getCourseQuestions(params.id));
    },[dispatch,params.id])

    // if (
    //   user.role !== 'admin' &&
    //   (user.isPremium === false)
    // ) {
    //   return <Navigate to={'/subscribe'} />;
    // }

  return (
    <div >

<div className=' px-40 py-6 dark dark:bg-slate-950 lg:gap-40'>
<Navbar isAuthenticated={isAuthenticated} user={user}/>
</div>
{/* {questions && questions.length>0 ? (
  
    <div>
      <h1>{questions[index].question}</h1>

<button onClick={()=>setIndex(index+1)}>Next</button>
    </div>

):(<h1>No questions available</h1>)} */}


  <div className='flex   m-auto my-5 '>

    <div className='w-2/4 px-20 '>
      <h1 className='font-bold mb-10 text-2xl'>Question {index+1}</h1>

      <p className='mb-5'>{questions.length>0 && questions[index].question}</p>
      <p className='rounded-md bg-red-500 p-5'> 
        Caution: We kindly request that you refrain from refreshing
                    or clicking on backward or forward button on the page. Doing
                    so may result in the loss of your current progress,
                    necessitating the need to restart the interview from the
                    beginning. Your cooperation in this matter is greatly
                    appreciated.
      </p>
    </div>

    <div className='w-2/4 mx-5 h-60 flex justify-end pt-20'>
      <Webcam />
    </div>


  </div>

  <div className='w-9/10 h-64 my-10 mx-20   border-2 rounded-md border-black text-start '>

<h1 className='mx-5 my-5 font-bold'>Click on the start button, start speaking and submit your answer after completing</h1>
  </div>

<div className='flex justify-between mx-20'>

  <div>
    <button  className=' bg-green-400 px-4 py-4 '>Copy</button>
  </div>

  <div className='flex gap-5 mb-5'>
    <button className=' bg-blue-600 px-4 py-4 '>Start</button>
    <button  className=' bg-blue-600 px-4 py-4 '>Stop</button>
    <button  className=' bg-blue-600 px-4 py-4 '>Submit</button>
  </div>
</div>

    </div>
  )
}

export default CoursePage