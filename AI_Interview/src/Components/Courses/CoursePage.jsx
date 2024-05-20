import React, { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseQuestions } from '../../redux/actions/course.js';

const CoursePage = ({user}) => {

    const {loading,questions}=useSelector(
        state => state.course
      );
    const dispatch=useDispatch();
    const params = useParams();

    useEffect(()=>{
        // console.log(params.id);
   dispatch( getCourseQuestions(params.id));
    },[dispatch,params.id])

  return (
    <div>
{questions && questions.length>0 ? (
    // <h1>
    //     {questions.map((question)=>(
    //         questions[question].question
    //     ))}
    // </h1>

    // <h1>{questions[1].question}</h1>

    <div>
        {questions.map((question,index)=>(
            <h1>{questions[index].question}</h1>
        ))}
    </div>

):(<h1>No questions available</h1>)}

    </div>
  )
}

export default CoursePage