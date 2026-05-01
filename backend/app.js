import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.js"
import errorMIddleware from "./middleware/errorMiddleware.js";
import courseRoutes from "./routes/course.js"
import paymentRoutes from "./routes/payment.js"
import miscRoutes from './routes/miscellaneousroute.js';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:process.env.FRONTEND_URL || "http://localhost:5173",
    credentials:true,
}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use("/ping",(req,res)=>{
    res.send("/pong");
})

app.use('/api/v1/user',userRoutes);
app.use("/api/v1/courses",courseRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1', miscRoutes);
app.all(/.*/,(req,res)=>{
    res.status(404).send("OOPS! 404 page not found");
})

app.use(errorMIddleware);

export default app;