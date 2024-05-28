import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import ErrorHandler from "../utils/errorHandler.js";
import { feedback} from "../utils/openai.js";



export const getAllCourses=catchAsyncError(async(req,res,next)=>{

    const courses=await Course.find({});

    res.status(200).json({
        success: true,
        courses
    })
})

export const createCourse=catchAsyncError(async(req,res,next)=>{

    const {title,difficulty,isPremium}=req.body;

    if (!title || !difficulty || !isPremium)
        return next(new ErrorHandler("Please add all fields", 400));

    await Course.create({
        title,
        difficulty,
        isPremium
    })

    res.status(200).json({
        success:true,
        message:"Course created successfully"
    })

})

export const addQuestions=catchAsyncError(async(req,res,next)=>{

    const {id}=req.params;
    const {question}=req.body;

    const course=await Course.findById(id);

    if(!course)
        return next(new ErrorHandler("Course not found",400));

    course.questions.push({
        question
    })

    await course.save();

    res.status(200).json({
        success:true,
        message:"Question added successfully"
    })

})


export const getQuestions=catchAsyncError(async(req,res,next)=>{

    const {id}=req.params;
 

    const course=await Course.findById(id);

    if(!course)
        return next(new ErrorHandler("Course not found",400));



    res.status(200).json({
        success:true,
        questions:course.questions
    })

})

export const deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
  
    const course = await Course.findById(id);
  
    if (!course) return next(new ErrorHandler("Course not found", 404));
  
  
    await course.remove();
  
    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  });

  export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;
  
    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));
  
    const lecture = course.lectures.find((item) => {
      if (item._id.toString() === lectureId.toString()) return item;
    });
  
    course.lectures = course.lectures.filter((item) => {
        if (item._id.toString() !== lectureId.toString()) return item;
      });
    
    await course.save();
  
    res.status(200).json({
      success: true,
      message: "Lecture Deleted Successfully",
    });
  });

  export const speechToText= catchAsyncError(async (req,res,next)=>{

    const {text}=req.body;

const buffer=await convert(text);

// console.log(buffer);
  
//   res.json({buffer});

res.send(buffer);
  })

  export const postFeedback=async (req,res,next)=>{
      
    const {answer,question}=req.body;

    // console.log(answer);
    
    const data=await feedback(answer,question);

    // console.log(data);

   res.json(data);

  }
  
  


