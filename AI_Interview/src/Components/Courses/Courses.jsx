import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { loadUser } from '../../redux/actions/user.js';
import { FaLock } from "react-icons/fa";

const Courses = () => {
    const { loading, courses, error, message } = useSelector(
        state => state.course
    );

    const { isAuthenticated, user } = useSelector(
        state => state.user
    );
 
    const dispatch = useDispatch();

    useEffect(() => {
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

    }, [dispatch, message, error]);

    // useEffect(()=>{
    //   dispatch(loadUser())
    //    },[dispatch])

    return (
        <div className="items-center flex flex-col overflow-hidden">
            <ToastContainer />
            <p className='text-white text-4xl mb-10'>Try for <span className="text-blue-500">Free</span></p>

            <div className='flex flex-wrap gap-5 overflow-hidden'>
                {/* All Courses */}
                {courses && courses.map(course => (
                    <React.Fragment key={course?._id}>
                        {course && course.isPremium === "False" && (
                            <div className='dark:bg-slate-800 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
                                <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
                                    <h1 className='text-white font-bold'>{course.title}</h1>
                                    <p className='text-green-500 font-bold'>{course.difficulty}</p>
                                    <h1 className='font-bold text-white'>These are {course.title} questions</h1>
                                    <Link to={`/course/${course._id}`}>
                                        <button className='bg-blue-600 hover:bg-blue-800 text-white text-2xl rounded-xl px-2 py-1'>Try now</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className='my-10'>
                <h2 className='text-white text-4xl'>Our best interviews for your <span className="text-blue-500">preparation</span></h2>
            </div>

            <div className='flex flex-wrap gap-5 mx-30'>
                {/* All Courses */}
                {courses && courses.map(course => (
                    <React.Fragment key={course?._id}>
                        {course && course.isPremium === "True" && (
                            <div className='dark:bg-slate-800 flex gap-3 rounded-3xl items-center justify-center w-[250px] overflow-hidden shadow-xl'>
                                <div className='flex flex-col justify-center px-14 py-7 gap-5 text-xl'>
                                    {user?.subscription.status === "active" ? (
                                         <div className='flex justify-center h-[6px]'>
                                        <FaLock className=''/>

                                        </div>
                                    ):(
                                        <>
                                        </>
                                    )}
                                    <h1 className='text-white font-bold'>{course.title}</h1>

{course.difficulty === 'Easy' ? (
  <p className='text-green-500 font-bold'>{course.difficulty}</p>
) : course.difficulty === 'Medium' ? (
  <p className='text-yellow-500 font-bold'>{course.difficulty}</p>
) : (
  <p className='text-red-500 font-bold'>{course.difficulty}</p>
)}

                                   
                                    <h1 className='font-bold text-white'>These are {course.title} questions</h1>
                                    {user?.subscription.status === "active" ? (
                                      

<Link to={`/course/${course._id}`}>
<button className='bg-blue-600 hover:bg-blue-800 text-white text-2xl rounded-xl px-2 py-1'>Try now</button>
</Link>
                                    ) : (
                                        <Link to={`/pricing`}>
                                        <button className='bg-blue-600 hover:bg-blue-800 text-white text-2xl rounded-xl px-2 py-1'>Try now</button>
                                    </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Courses;
