import mongoose from "mongoose";

const schema=new mongoose.Schema({

    title:{
        type:String,
        required: [true, "Please enter course title"],
    },
    difficulty:{
        type:String,
        required: [true, "Please enter difficulty level"],
    },
    isPremium:{
        type:String,
        enum:["True","False"],
        required: [true, "Please enter subscription details"],
    },
    questions:[
        {
            question:{
                type:String,
                require:true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
      },
})

export const Course = mongoose.model("Course", schema);