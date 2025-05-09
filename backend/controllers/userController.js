import { User } from "../models/User.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utils/sendToken.js";
import ErrorHandler from "../utils/errorHandler.js";

export const register= catchAsyncError(async (req,res,next)=>{

    const {name,email,password}=req.body;
    console.log(name);

    
  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

    let user = await User.findOne({ email });
    // console.log(user);

  if (user) return next(new ErrorHandler("User Already Exist", 409));


  user=await User.create({
    name,
    email,
    password
  })

//   res.status(200).json({
//     success:true,
//     user,
// })

console.log(user);

sendToken(res, user, "Registered Successfully", 201);

})

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password)
      return next(new ErrorHandler("Please enter all field", 400));
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));
  
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch)
      return next(new ErrorHandler("Incorrect Email or Password", 401));
  
    sendToken(res, user, `Welcome back, ${user.name}`, 200);
  });

  export const logout = catchAsyncError(async (req, res, next) => {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  });

  export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    console.log(user);
  
    res.status(200).json({
      success: true,
      user,
    });
  });

  //Admin

  
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler("User not found", 404));

  if (user.role === "user") user.role = "admin";
  else user.role = "user";

  await user.save();

  res.status(200).json({
    success: true,
    message: "Role Updated",
  });
});
