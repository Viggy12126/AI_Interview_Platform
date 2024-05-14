import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
      },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
      },
    
      password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
      isPremium:{
        type:Boolean,
        default:false
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
      resetPasswordToken: String,
      resetPasswordExpire: String,
})

schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


  schema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

schema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
  };
  

export const User = mongoose.model("User", schema);