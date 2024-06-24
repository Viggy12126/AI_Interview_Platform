import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseQuestions, getSpeech } from '../../redux/actions/course.js';
import Navbar from '../Navbar.jsx';
import Webcam from 'react-webcam';
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import CodeEditor from './CodeEditor.jsx';

const CoursePage = ({isAuthenticated,user}) => {

    const {loading,questions,speech,isCoding}=useSelector(
        state => state.course
      );

    const dispatch=useDispatch();
    const params = useParams();
    const [index,setIndex]=useState(0);
    const [feed,setFeed]=useState(false);
    const [feedback,setFeedback]=useState("");
    const [rating,setRating]=useState("");
    const [form,setForm]=useState({answer:'',question:''});
    const [answer,setAnswer]=useState('');
    const [question,setQuestion]=useState('');
    const [loader,setLoader]=useState(false);

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition()
    
    
  useEffect(()=>{

    // console.log(answer);
    // console.log(question);

    setForm({ answer, question });
   
  },[answer,question])

  useEffect(()=>{

    const fetchData=async ()=>{
      const response=await fetch('/api/v1/feedback',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(form)
      })

      const data = await response.json();
      // console.log(data);
      setLoader(false);
      setFeedback(data.feedback);
      setRating(data.rating);
    }

    if(form.answer!==''){
    console.log(form);
    setLoader(true);
  fetchData();
    }
  },[form])

    useEffect( ()=>{
        // console.log("hii");
     
    dispatch( getCourseQuestions(params.id));
    // fetchData();
    },[dispatch,params.id])

    useEffect(()=>{
   
      if(question!=='')
      dispatch(getSpeech(questions[index].question,params.id))
    },[dispatch,index])



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

    const handlesubmit=async ()=>{
   try {
    setFeed(true);

    

    setAnswer(transcript);
    setQuestion(questions[index].question);

    setForm({answer:answer,question:question})

    SpeechRecognition.stopListening();
   } catch (error) {
    console.log(error);
   }
    }

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    console.log(speech);

  return (

    <div>
      {isCoding ==="True" ? (
        <div>
          <CodeEditor />
        </div>
      ) : (
        <div>
 {feed ?(
      
  <div className='bg-custom-blue min-h-screen'>
  <div className='flex justify-between' >

    <div className='w-[640px] h-[560px] my-10 mx-20 px-3 py-3   border-2 rounded-md bg-white  '>
      <h1 className='text-2xl'>Your Answer</h1>
      <p>{transcript}</p>
    </div>

 <div>

 </div>

    <div className='w-[700px] h-[560px] my-10 mx-20  px-3 py-3 border-2 rounded-md bg-white   text-2xl'>
      {loader ? (
          <div>Loading...</div>
      ):(
<>
<h1>Feedback of your answer</h1>
      {feedback}
      <p>The rating for this response on the scale of 10 would be {rating}</p>
</>
      )}
    
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

{/* <audio>
  {speech}
</audio> */}
  <div className='flex justify-between  m-auto my-5 '>

    <div className='w-2/4 px-20 '>
      <h1 className='text-white font-bold mb-10 text-2xl'>Question {index+1}</h1>

      <p className='text-white font-bold text-2xl mb-5'>{questions.length>0 && questions[index].question}</p>
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
      )}
   
        </div>
  )
}

export default CoursePage