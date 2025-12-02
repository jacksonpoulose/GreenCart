import Product from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

//add product
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;



    let imagesURL = await Promise.all(images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path, 
            {resource_type:'image'});
            fs.unlinkSync(item.path);
        return result.secure_url
    }))

    await Product.create({...productData, image:imagesURL})

    return res.json({success:true,message:"product added"})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message: 'product not added'})
  }
};
// product list
export const productList = async (req, res) => {
    try{
const products = await Product.find({});
res.json({success:true,products})
    }catch(error){
        console.log(error.message)
        res.json({success:false,message: 'product list not found'})
    }
};

//Product individual
export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//update product stock
export const changeStock = async (req, res) => {
try{
const {id,inStock}= req.body;

await Product.findByIdAndUpdate(id,{inStock})

res.json({success:true,message:"stock updated"})

}catch(error){
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
}
};
