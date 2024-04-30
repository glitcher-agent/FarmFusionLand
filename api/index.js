import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js"
import cookieParser from "cookie-parser";
import collectionRoute from "./routes/collection.js";


const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use("/role",roleRoute);
app.use('/auth',authRoute);
app.use('/user',userRoute);
app.use('/collection', collectionRoute);



app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 500;
    const Msg =  obj.message || "something went wrong";
    return res.status(statusCode).json({
        success:[200,201,204].some(a=>a===obj.status)? true : false,
        status: statusCode,
        message: Msg,
        data : obj.data
    });
});

const connectDB= async()=> {
    try{
        await mongoose.connect("mongodb+srv://revanth8119:FarmFusionLand%4081@cluster0.fgqqvk6.mongodb.net/Farm");
        console.log("connected to database")
    } catch(error){
        throw error;
    }
}


app.listen(8800,()=>{
    console.log("connected");
    connectDB();  
});