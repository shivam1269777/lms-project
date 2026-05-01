import {configureStore} from "@reduxjs/toolkit";
import authSliceReducers from "./Slices/AuthSlice"
import courseSliceReducer from "./Slices/CourseSlice"
import razorpaySliceReducer from "./Slices/RazorpaySlice"
import lectureSliceReducer from "./Slices/LectureSlice"
import stateSliceRducer from "./Slices/StatSlice"
const store=configureStore({
    reducer:{
        auth:authSliceReducers,
        course:courseSliceReducer,
        razorpay:razorpaySliceReducer,
        lecture:lectureSliceReducer,
        stat: stateSliceRducer
    },
    devTools:true
});
export default store;

