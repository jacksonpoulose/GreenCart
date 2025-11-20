import e from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

//place order COD : /api/orders/cod

export const placeOrderCOD = async (req, res) => {
    try{
        const {userId, items, address} = req.body;
        if(!userId || !items || !address){
            return res.status(400).json({message: "All fields are required"})
        }

//calculate amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + product.price * item.quantity;         
           },0 );


           // add tax 2%
amount = Math.floor(amount + (amount * 0.02));

        await Order.create({userId, items, amount, address, paymentType : "COD" });
        res.status(201).json({success: true, message: "Order placed successfully"})
    }catch(error){
        res.status(500).json({message: "Server Error"})
    }
}

//get orders by userId /api/orders/user

export const getUserOrders = async (req, res) => {
    try{
   const {userId} = req.params;
        if(!userId){
            return res.status(400).json({message: "User detail is required"})
        }
        const orders = await Order.find({userId,
            $or : [{paymentType : "COD"}, {isPaid : true}]
        }).populate('items.product').sort({createdAt: -1});
        res.status(200).json({success: true, orders})
    }catch(error){
        res.status(500).json({message: "Server Error"})
    }
}

//get all orders /api/orders/seller

export const getAllOrders = async (req, res) => {
    try{
           const orders = await Order.find({
            $or : [{paymentType : "COD"}, {isPaid : true}]
        }).populate('items.product').sort({createdAt: -1});
        res.status(200).json({success: true, orders})
    }catch(error){
        res.status(500).json({message: "Server Error"})
    }
}