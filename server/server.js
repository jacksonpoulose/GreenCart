import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import userRouter from './routes/UserRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

//allowed cors
const allowedOrigins = ['http://localhost:5173'];
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin:allowedOrigins, credentials:true}));

//db connection
await connectDB();

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})