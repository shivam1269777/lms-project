
import './App.css'

import { Routes,Route} from 'react-router'
import Footer from './Components/Footer'
import HomeLayout from './Layouts/HomeLayout'
import HomePage from './Pages/HomePage.jsx'
import AboutusPage from "./Pages/AboutUsPage.jsx"
import NotFound from './Pages/NotFound.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import CourseList from './Pages/Course/CourseList.jsx'
import Contact from './Pages/Contact.jsx'
import Denied from './Pages/Denied.jsx'
import CourseDescription from './Pages/Course/CourseDescription.jsx'
import RequireAuth from './Components/Auth/RequireAuth.jsx'
import CreateCourse from './Pages/Course/CreateCourse.jsx'
import Profile from './Pages/User/Profile.jsx'
import EditProfile from './Pages/User/EditProfile.jsx'
import ChangePassword from './Pages/User/ChangePassword.jsx'
import Checkout from './Pages/Payments/Checkout.jsx'
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess.jsx'
import CheckoutFail from './Pages/Payments/CheckoutFail.jsx'
import Displaylectures from './Pages/Dashboard/Displaylectures.jsx'
import AddLectures from './Pages/Dashboard/AddLectures.jsx'
import ForgotPassword from './Pages/User/ForgotPassword.jsx'
import ResetPassword from './Pages/User/ResetPassword.jsx'
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx'
import UpdateCourseModal from './Pages/Course/UpdateCourseModal.jsx'
function App() {
  

  return (
    <>
    <Routes>
<Route path='/' element={<HomePage/>}></Route>
<Route path='/about' element={<AboutusPage/>}></Route>
<Route path='/signup' element={<SignUp/>}></Route>
<Route path="/login" element={<Login/>}></Route>
<Route path="/forgot-password" element={<ForgotPassword/>}></Route>
<Route path="/reset-password/:resetToken" element={<ResetPassword />} />
<Route path="/courses" element={<CourseList/>}></Route>
<Route path="/contact" element={<Contact/>}></Route>
<Route path="/denied" element={<Denied/>}></Route>
<Route element={<RequireAuth allowRoles={["ADMIN"]} />}>
<Route path="/course/create" element={<CreateCourse/>}></Route>
<Route path="/course/addlecture" element={<AddLectures/>}></Route>
<Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
<Route path="/course/update" element={<UpdateCourseModal/>}></Route>
</Route>
<Route path="/course/description/:id" element={<CourseDescription/>}></Route>
<Route element={<RequireAuth allowRoles={["ADMIN","USER"]} />}>
<Route path="/user/profile" element={<Profile/>}/>
<Route path="/checkout" element={<Checkout/>}></Route>
<Route path="/checkout/success" element={<CheckoutSuccess/>}></Route>
<Route path="/checkout/fail" element={<CheckoutFail/>}></Route>
<Route path="/course/displaylectures" element={<Displaylectures/>}></Route>
</Route>
<Route path="/user/editprofile" element={<EditProfile/>}></Route>
<Route path="/user/change-password" element={<ChangePassword/>}></Route>
<Route path="*" element={<NotFound/>}></Route>
   </Routes>
   
    </>
  )
}

export default App

