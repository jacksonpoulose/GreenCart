import User from "../models/User.js";

//update the user cart data

export const updateCart = async (req, res) => {
   try{ 
    const { cartItems } = req.body;
    const userId = req.userId;
    
   await User.findByIdAndUpdate(userId, { cartItems:cartItems });
  


   res.json({ success: true, message: "Cart updated successfully" });
}
    catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
   }
}