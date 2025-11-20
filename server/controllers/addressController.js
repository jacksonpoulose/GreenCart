import Address from "../models/Address.js";

//add address /api/address/add

export const addAddress = async (req, res) => {
    try{

        const {address,userId} = req.body;
        if(!address || !userId){
            return res.status(400).json({message: "All fields are required"})
        }
        await Address.create({...address, userId});
        res.status(201).json({success: true, message: "Address added successfully"})
    }catch(error){
        res.status(500).json({message: "Server Error"})
    }
}

//get addresses /api/address/get

export const getAddresses = async (req, res) => {
    try{
           const {userId} = req.params;
        if(!userId){
            return res.status(400).json({message: "User detail is required"})
        }
        const addresses = await Address.find({userId});
        res.status(200).json({success: true, addresses})
    }catch(error){
        res.status(500).json({message: "Server Error"})
    }   
}