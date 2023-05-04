const jwt=require('jsonwebtoken');
const User=require('../models/db')
exports.isauth=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        const verify=jwt.verify(token,'secret:1234');
        console.log(verify);
        console.log(verify.userid);

        const user=await User.findById(verify.userId)
        console.log(user);
        req.user=user;
        next();
    } catch (error) {
        console.log(error)
    }
    
}