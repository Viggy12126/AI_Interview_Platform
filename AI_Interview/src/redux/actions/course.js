

export const getAllCourses = () =>
  async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

    //   const { data } = await axios.get(
    //     `/api/v1/courses?keyword=${keyword}&category=${category}`
    //   );

    const res=await fetch('/api/v1/getCourses');
    const data=await res.json();

      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

  export const getCourseQuestions = id => async dispatch => {
    try {

        console.log(id);
      dispatch({ type: 'getQuestionRequest' });
  
    //   const { data } = await axios.get(`/api/v1/course/${id}`, {
    //     withCredentials: true,
    //   });

    const res=await fetch(`/api/v1/course/${id}`)
    const data=await res.json();

    console.log(data);
  
      dispatch({ type: 'getQuestionSuccess', payload: data.questions });
    } catch (error) {
      dispatch({
        type: 'getQuestionFail',
        payload: error.response.data.message,
      });
    }
  };