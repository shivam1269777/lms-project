import {  BsPersonCircle } from "react-icons/bs";
import HomeLayout from "../Layouts/HomeLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast"
import { createAccount } from "../Redux/Slices/AuthSlice";
import { motion } from "framer-motion";
function SignUp() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [previewImage,setPreviewImage]=useState("");
    const [signupData,setSignupData]=useState({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    });

    function handleUserInput(e){
        const {name,value}=e.target;
        setSignupData({
            ...signupData,[name]:value
        })

    }

    function getImage(e){
        e.preventDefault();
        const uploadedImage=e.target.files[0];
        if(uploadedImage){
            setSignupData({
                ...signupData,avatar:uploadedImage
            });
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setPreviewImage(this.result);
            })
        }
    }

async function createNewAccount(e){
    e.preventDefault()
    if(!signupData.email || !signupData.password || !signupData.fullName|| !signupData.avatar){
        toast.error("Please fill all the details");
        return ;
    }
    if(signupData.fullName.length<5){
        toast.error("Name should be atleast of 5 character");
        return ;
    }

    if(!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
)){
    toast.error("Invalid Email id")
    return ;
}

if(!signupData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
))
{
    toast.error("Password should be atleast 8 character and contain one number and one special character and upper and lower case Letters")
}

const formData=new FormData()
formData.append("fullName",signupData.fullName);
formData.append("email",signupData.email);
formData.append("password",signupData.password);
formData.append("avatar",signupData.avatar);

//dispatch create account action

const response =await dispatch(createAccount(formData));
console.log(response)
if (response?.payload?.success)
{navigate("/")}
setSignupData({
        fullName:"",
        email:"",
        password:"",
        avatar:""
    });
    setPreviewImage("");

}
return (
    <HomeLayout>
      <motion.div
        className="flex items-center justify-center h-[100vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-4 rounded-xl p-6 text-white w-96 shadow-[0_0_15px_rgba(0,0,0,0.3)]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-center text-2xl font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Registration Page
          </motion.h1>

          <motion.label
            htmlFor="image_uploads"
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {previewImage ? (
              <motion.img
                className="w-24 h-24 rounded-full m-auto"
                src={previewImage}
                alt="avatar"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
              </motion.div>
            )}
          </motion.label>

          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg,.jpeg,.png,.svg"
            name="avatar"
          />

          {/* Full Name */}
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your Full Name"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </motion.div>

          {/* Email */}
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your Password"
              className="bg-transparent px-2 py-1 border"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="mt-2 w-full text-white bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm cursor-pointer py-2 font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account
          </motion.button>

          <motion.p
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="Link text-accent cursor-pointer">
              Login
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </HomeLayout>
  );
}

export default SignUp;
