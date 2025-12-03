import Address from "../models/Address.js";

//add address /api/address/add

export const addAddress = async (req, res) => {
    try{

        const {address} = req.body;
        const userId = req.userId

        if(!address || !userId){
            return res.status(400).json({message: "All fields are required"})
        }
        const result = await Address.create({...address, userId});
        res.json({success: true, message: "Address added successfully"})
    }catch(error){
        res.json({message: "Server Error"})
    }
}

//get addresses /api/address/get

export const getAddresses = async (req, res) => {
    try{
           const userId = req.userId;

           if(!userId){
            return res.json({message: "User detail is required"})
        }
        const addresses = await Address.find({userId});
        res.json({success: true, addresses})
    }catch(error){
        res.json({message: "Server Error"})
    }   
}