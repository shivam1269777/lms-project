import AppError from "../utils/errorUtils.js";
import User from "../models/userModels.js";
import cloudinary from "cloudinary";
import fs from "fs";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"
const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
      secure: true,           // ✅ Render pe always true
  sameSite: "None", 
}

const register=async (req,res,next)=>{
    const {fullName,email,password}=req.body;
    if(!fullName||!email||!password)
    {return next( new AppError("All fields are required",400));
    }
    const userExists=await User.findOne({email});
    if(userExists){
        return next(new AppError("Email aleready exists",400))
    }

const user=await User.create({
    fullName,
email,
password,
avatar:{
    public_id:email,
    secure_url:"https://res.cloudinary.com/demo/image/upload/v1694762487/default_avatar.png"
}
});
if(!user){
    return next(new AppError("User registration failed ,please try again",400))
}

if(req.file){
console.log(req.file);
    try{
const result=await cloudinary.v2.uploader.upload(req.file.path,{folder:"Lms",width:250,height:250,gravity:"faces",crop:"fill"});

if(result){
    user.avatar.public_id=result.public_id;
    user.avatar.secure_url=result.secure_url;

    //remove file from local system
fs.rm(`uploads/${req.file.filename}`, (err) => {
  if (err) {
    console.error("Failed to delete file:", err);
  } else {
    console.log("File deleted successfully");
  }
});

}

    }catch(e){

        return next(new AppError(e.message || "File not uploaded,please try again",500))
    }
}

await user.save();

user.password=undefined;

const token=await user.generateJWToken();

res.cookie('token',token,cookieOptions)

res.status(201).json({
    success:true,
    message:"User registerd successfully",
    user,
});

}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new AppError("Email or password does not match", 400));
    }

    // Await the comparePassword function
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new AppError("Email or password does not match", 400));
    }

    const token = await user.generateJWToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};


const logout=(req,res)=>{
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true,
        sameSite: "None",
    });

res.status(200).json({
    success:true,
    message:"User Logged out successfully"
})

};

const getProfile=async(req,res,next)=>{
   try{const userId=req.user.id;
    const user=await User.findById(userId);
res.status(200).json({success:true,
    message:"User details",
    user
})
   }catch(error){return next(new AppError("failed to fetch profile of User"))}
};



const changePassword=async(req,res)=>{
    const {oldPassword,newPassword}=req.body;
    const {id}=req.user;

    if(!oldPassword||!newPassword){
        return next(new AppError("All fields are mandatory",400))
    }

    const user=await User.findById(id).select("+password");
    if(!user){
        return next(new AppError("User does not found",400))
    }

    const isPasswordValid=await user.comparePassword(oldPassword);
    if(!isPasswordValid){
        return next(new AppError("Invalid old password",400))
    }
    user.password=newPassword;
    await user.save();

    user.password=undefined;
    res.status(200).json({
        success:true,
        message:"Password Changed Successfully!"
    });
}
const forgot = async (req, res, next) => {
    const { email } = req.body;
    if (!email) return next(new AppError("Email is required", 400));

    const user = await User.findOne({ email });
    if (!user) return next(new AppError("Email not registered", 400));

    const resetToken = await user.generatePasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const subject = "Reset Password";
    const message = `You can reset your password by clicking <a href="${resetPasswordUrl}" target="_blank">Reset your password</a>.\nIf the link doesn't work, copy-paste this URL: ${resetPasswordUrl}.\nIf you did not request this, please ignore this email.`;

    try {
        await sendEmail(email, subject, message);
        return res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`
        });
    } catch (e) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError(e.message, 500));
    }
};

const reset = async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    const forgotPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) return next(new AppError('Token is invalid or expired, please try again', 400));

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return res.status(200).json({
        success: true,
        message: "Password changed successfully!"
    });
};


const updateUser =  async (req, res, next) => {
  // Destructuring the necessary data from the req object
  const { fullName } = req.body;
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError('Invalid user id or user does not exist'));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  // Run only if user sends a file
  if (req.file) {
    // Deletes the old image uploaded by the user
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: 'fill',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        await fs.promises.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || 'File not uploaded, please try again', 400)
      );
    }
  }

  // Save the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User details updated successfully',
  });
};


export {
    register,
    login,
    logout,
    getProfile,
    forgot,
    reset,
    changePassword,
    updateUser
}