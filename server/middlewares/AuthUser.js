import jwt from "jsonwebtoken";

export const authUser = async (req,res,next)=>{
const {token} = req.cookies;

if(!token){
    return res.status(500).json({success:false, message:"Not Authorised"})
}

try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
    if(tokenDecode){
        req.body.userId = tokenDecode.id

        console.log(tokenDecode.id)

    }else{
        return res.json({success:false, message:'Not authorized'})
    }
    next();

}catch(error){
res.json({success:false, message:error.message})
}
}

