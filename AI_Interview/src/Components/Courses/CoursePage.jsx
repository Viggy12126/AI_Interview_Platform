import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseQuestions } from '../../redux/actions/course.js';
import Navbar from '../Navbar.jsx';
import Webcam from 'react-webcam';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

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
    const [feed,setFeed]=useState(false);
    const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition()

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

    const handlestart=()=>{
      alert("Interview Started");
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

    }

    const handleNextQuestion = () => {
      setFeed(false);
      resetTranscript();
      setIndex((prev) => (prev === questions?.length - 1 ? 0 : prev + 1));
      // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      window.speechSynthesis.cancel();
    };

    const handleprevious = () => {
      setFeed(false);
      // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      window.speechSynthesis.cancel();
    };

    
    const handlestop=()=>{
      resetTranscript();
    }

    const handlesubmit=()=>{
      setFeed(true);
      SpeechRecognition.stopListening();
    }

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

  return (

    <div>
    {feed ?(
      
      <div className='bg-custom-blue min-h-screen'>
      <div className='flex justify-between' >
 
        <div className='w-[640px] h-[560px] my-10 mx-20 px-3 py-3   border-2 rounded-md bg-white  '>
          <h1 className='text-2xl'>Your Answer</h1>
          <p>{transcript}</p>
        </div>

        <div className='w-[700px] h-[560px] my-10 mx-20  px-3 py-3 border-2 rounded-md bg-white   text-2xl'>
          <h1>Feedback of your answer</h1>
        </div>

     
      </div>

      <div className='flex justify-center'>

<button onClick={handleNextQuestion} className='px-[10px] py-[20px] m-[10px] rounded-sm w-[200px]  text-black bg-custom-green'>Next Question</button>
<button onClick={handleprevious} className='px-[10px] py-[20px] m-[10px] rounded-sm w-[200px]  text-black bg-custom-green'>Previous Question</button>
</div>

      </div>
     
    
      
    ):(<div className='dark dark:bg-slate-800'>

      

    <div className=' px-40 py-6 dark dark:bg-slate-950 lg:gap-40'>
    <Navbar isAuthenticated={isAuthenticated} user={user}/>
    </div>
    {/* {questions && questions.length>0 ? (
      
        <div>
          <h1>{questions[index].question}</h1>
    
    <button onClick={()=>setIndex(index+1)}>Next</button>
        </div>
    
    ):(<h1>No questions available</h1>)} */}
    
    
      <div className='flex justify-between  m-auto my-5 '>
    
        <div className='w-2/4 px-20 '>
          <h1 className='text-white font-bold mb-10 text-2xl'>Question {index+1}</h1>
    
          <p className='text-white mb-5'>{questions.length>0 && questions[index].question}</p>
          <p className='rounded-md bg-red-500 p-5'> 
            Caution: We kindly request that you refrain from refreshing
                        or clicking on backward or forward button on the page. Doing
                        so may result in the loss of your current progress,
                        necessitating the need to restart the interview from the
                        beginning. Your cooperation in this matter is greatly
                        appreciated.
          </p>
        </div>
    
        <div className=' mx-5 h-60 flex justify-end pt-20'>
          <Webcam />
        </div>
    
    
      </div>
    
      <div className=' h-64 my-10 mx-20   border-2 rounded-md border-green-500 text-start '>
    
    <h1 className='text-white mx-5 my-5 font-bold'>Click on the start button, start speaking and submit your answer after completing</h1>
      </div>
    
    <div className='flex justify-between mx-20'>
    
      <div>
        <button  className=' bg-green-400 px-4 py-4 '>Copy</button>
      </div>
    
      <div className='flex gap-5 mb-5'>
        <button onClick={handlestart} className=' bg-blue-600 px-4 py-4 '>Start</button>
        <button onClick={handlestop}  className=' bg-blue-600 px-4 py-4 '>Stop</button>
        <button onClick={handlesubmit}  className=' bg-blue-600 px-4 py-4 '>Submit</button>
      </div>
    </div>
    
        </div>)}
        </div>
  )
}

export default CoursePage