import AppError from "../utils/errorUtils.js";
import jwt from "jsonwebtoken"

 const isLoggedin = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError("Unauthenticated, please login again", 401));
  }

  try {
    const userDetails = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails; // req.user will have { id, role, ... } depending on your token payload
    next();
  } catch (err) {
    return next(new AppError("Invalid or expired token, please login again", 401));
  }
};


const authorizedRoles=(...roles)=>async(req,res,next)=>{
   const currentUserRole=req.user.role;
   if(!roles.includes(currentUserRole)){
return next(new AppError("You don not have permission to  access this route"))
   }

   next();
}

const authorizedSubscriber=async(req,res,next)=>{
   const subscription=req.user.subscription;
   const currentUserRole=req.user.role;
   if(currentUserRole!=="ADMIN" && subscription.status!=="active"){
      return next(
         new AppError("Please subscribe to access this route",403)
      )
   }
   next();
}

export{isLoggedin,authorizedRoles,authorizedSubscriber}