import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'

dotenv.config();

mongoose.connect("mongodb+srv://gopiyadu17:0hdGOLUy5Bx1DgyY@projectsp.mvscbmi.mongodb.net/SmartCatelog")
    .then(()=>{
        console.log("Connected to MongoDB!");
    })
    .catch((err)=>{
        console.log(err);
    })


const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!')
})