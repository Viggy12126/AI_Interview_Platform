import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  { courses: [], questions: [] },
  {
    allCoursesRequest: state => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getSpeechRequest:state=>{
      state.loading=true
    },

    getSpeechSuccess:(state,action)=>{
      state.loading=false;
      state.speech=action.payload;
    },

    getSpeechFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getQuestionRequest: state => {
      state.loading = true;
    },
    getQuestionSuccess: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    getQuestionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
