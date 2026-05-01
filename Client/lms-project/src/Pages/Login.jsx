
import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast"
import { login } from "../Redux/Slices/AuthSlice";
import { motion } from "framer-motion";
function Login() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
   
    const [LoginData,setLoginData]=useState({
        email:"",
        password:"",
       
    });

    function handleUserInput(e){
     
        const {name,value}=e.target;
        setLoginData({
            ...LoginData,[name]:value
        })

    }



async function handleLogin(e){
    e.preventDefault()
    if(!LoginData.email || !LoginData.password ){
        toast.error("Please fill all the details");
        return ;
    }
   



//dispatch create account action

const response =await dispatch(login(LoginData));
console.log(response)
if (response?.payload?.success)
{navigate("/")}
setLoginData({
        
        email:"",
        password:"",
       
    });

}

return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-black px-4">
        <motion.form
          noValidate
          onSubmit={handleLogin}
          className="flex flex-col justify-center gap-5 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 15,
            duration: 0.8,
          }}
        >
          <h1 className="text-center text-3xl font-extrabold mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-center text-gray-300 mb-4">
            Login to continue your journey
          </p>

          {/* Email Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-200">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border border-gray-500 focus:border-yellow-400 px-3 py-2 rounded-md outline-none transition-all placeholder-gray-400"
              onChange={handleUserInput}
              value={LoginData.email}
              autoComplete="email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-200">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full bg-transparent border border-gray-500 focus:border-yellow-400 px-3 py-2 rounded-md outline-none transition-all placeholder-gray-400"
              onChange={handleUserInput}
              value={LoginData.password}
              autoComplete="current-password"
            />
            <Link
              to="/forgot-password"
              className="text-sm text-accent/80 hover:underline self-end"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="mt-4 w-full py-2.5 text-lg font-semibold text-white  bg-yellow-600 hover:bg-yellow-500 transition-all duration-300 rounded-md shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(255, 193, 7, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>

          {/* Redirect to Signup */}
          <p className="text-center mt-4 text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-accent/80 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </motion.form>
      </div>
    </HomeLayout>
  );

}

export default Login;
