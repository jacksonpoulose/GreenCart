import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/db.js";
import userRouter from "./routes/UserRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoutes.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const allowedOrigins = ["https://green-cart-fw2k.vercel.app/", "http://localhost:5173"];

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//db connection
await connectDB();
await connectCloudinary();

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
