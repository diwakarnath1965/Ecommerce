import catchAsyncError from "../middleware/catchAsyncError.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplate.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import e from "express";
//register user

export const registerUser = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

//login user

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  //finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//logout user

export const logout = catchAsyncError(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  //get reset token

  const resetToken = user.getResetPasswordToken();

  await user.save();

  //create reset password url

  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset password

export const resetPassword = catchAsyncError(async (req, res, next) => {
  //hash url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req?.params?.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }, //check if token is not expired
  });

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  //setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//get currently logged in user details

export const getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.user?.id);
    
    res.status(200).json({
        success: true,
        user,
    });
    }
);

//update password

export const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.user?.id).select("+password");
    
    //check previous user password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }
    
    user.password = req.body.password;
    await user.save();
    
    res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
    }
);

//update user profile

export const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    
    //update avatar: TODO
    
    const user = await User.findByIdAndUpdate(req?.user?.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    res.status(200).json({
        success: true,
        user
    });
    }
);


//get all users (admin)

export const AllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    
    res.status(200).json({
        success: true,
        users
    });
    }
);

//get user details (admin)

export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.params?.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req?.params?.id}`));
    }

    res.status(200).json({
        success: true,
        user
    });
    }   
);

//update user profile (admin)

export const updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    
    //update avatar: TODO
    
    const user = await User.findByIdAndUpdate(req?.params?.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    
    res.status(200).json({
        success: true,
        user
    });
    }
);

//delete user (admin)

export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req?.params?.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req?.params?.id}`));
    }

    //remove avatar from cloudinary: TODO

    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    });
    }
);