const jwt=require('jsonwebtoken');
const docauth= async (req,res,next)=>{
try {
    
const token= await req.header("Authorization")
if(!token){
    
    return res.status(400).json({msg:"Invalid Authentication bro"})
}
jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,doctor)=>{
if(err){
    return res.status(400).json({msg:"Invalid Authentication Doctor"})
}
req.doctor=doctor
next()
});
} catch (err) {
      return res.status(500).json({msg:err.message})
}
}
module.exports=docauth;