import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const sellerLogin = async (req,res) => {
  const { email, password } = req.body;
  try {
    if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
      res.status(200).json({ success: true, message: "logged in" });
    } else {
      res.status(401).json({ success: false, message: "not authorized" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};


// seller is auth, /api/seller/is-auth
export const sellerIsAuth = async (req, res) => {
    try {
     
      return res.json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  //logout seller /api/seller/logout

export const sellerlogout = async (req, res) => {
    try {
      res.clearCookie("sellerToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      });
  
      return res.status(200).json({success:true,message:"logged out"})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  };
  