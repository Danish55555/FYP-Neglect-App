const guardianM=require('../models/guardianModel');
const doctorM=require('../models/doctorModel');
const userM=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const sendMail=require('./sendMail')
const CLIENT_URL=process.env.CLIENT_URL;
const mongoose=require('mongoose');
module.exports.register=async (req,res)=>{
    try {
        const {name,email,password,role}=req.body;
        console.log(name,email,password,role);
        const user=await userM.findOne({email});
        if(user){

            return res.status(400).json({msg:"Email Already exist"})
        }


        
    
        const passwordHash=await bcrypt.hash(password,12);
    
        //console.log({password,passwordHash})
        const newUser={
            name,email,password:passwordHash,role
    
        }
        //console.log(newUser);
        const activation_Token=createActivationToken(newUser);
        const url1=`${CLIENT_URL}/guardian/activate/${activation_Token}`;
        const url2=`${CLIENT_URL}/doctor/activate/${activation_Token}`;
        if(role==1){
            sendMail(email,url1,"Verify Your email");
    }
        else{
            sendMail(email,url2,"Verify Your email");
        }
    
    
    
        res.json({msg:"Register Success please activate Your account email to start."})
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:err.message})
    }
     }
     const createActivationToken=(payload)=>{
         return jwt.sign(payload,process.env.ACTIVATION_TOKEN_SECRET,{expiresIn:'5m'});
     }
     const createAccessToken=(payload)=>{
        return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'});
    }
     const createRefreshToken=(payload)=>{
        return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'});
    }
    

    module.exports.login=async (req,res)=>{
        try {
            const{email,password}=req.body;
            const user=await userM.findOne({email});

            if(!user){
                return res.status(400).json({msg:"Email not exist or registered yet"})
            }
       const guardian= await guardianM.findOne({email});    
       const doctor=await doctorM.findOne({email});
            if(guardian){



                const isMatch=await bcrypt.compare(password,guardian.password);
                if(!isMatch){
                    return res.status(400).json({msg:"Incorrect Password entered"})
                }
             
        console.log(guardian)
                const refresh_token=createRefreshToken({id:guardian._id});
                res.cookie('refreshtoken',refresh_token,{
                            httpOnly:true,
                            path:'/user/refresh_token',
                            maxAge: 7*24*60*60*1000
        
                })
                res.json({msg:"Login Sucessfull"})






            }
            
    


else{

            const isMatch=await bcrypt.compare(password,doctor.password);
            if(!isMatch){
                return res.status(400).json({msg:"Incorrect Password entered"})
            }
         
    console.log(doctor)
            const refresh_token=createRefreshToken({id:doctor._id});
            res.cookie('refreshtoken',refresh_token,{
                        httpOnly:true,
                        path:'/user/refresh_token',
                        maxAge: 7*24*60*60*1000
    
            })
            res.json({msg:"Login Sucessfull"})

    
        }} catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
    




    module.exports.getAccessToken=async (req,res)=>{

        try {
            const rf_token=req.cookies.refreshtoken;
            console.log(rf_token);
            if(!rf_token){
                return res.status(400).json({msg:"Please Login Now"})
            }
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err){
                    return res.status(400).json({msg:"Please Login Now"})
                }
                const access_token=createAccessToken({id:user.id})
                res.json({access_token})
    
    
            })
            
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
    











    module.exports.getUserInfo= async(req,res)=>{
        try{
            const newtid=req.user.id
            console.log(newtid)
            const user1 = await guardianM.findById(newtid).select('-password')
            const user2= await doctorM.findById(newtid).select('-password')
            if(user1){
    res.status(200).json(user1)}
    else{
        res.status(200).json(user2)
    }
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    }


    module.exports.logout=async(req,res)=>{
        try {
            res.clearCookie('refreshtoken',{path:'/guardian/refresh_token'})
            return res.json({msg:"Logged Out Succesfully"})
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg:err.message})   
        }
    }



    














    module.exports.forgetPassword=async (req,res)=>{

        try {
            const {email}=req.body;
            const guardian=await guardianM.findOne({email});
            const doctor=await doctorM.findOne({email});
            console.log(guardian);
            console.log(doctor)
            console.log(email)
    
            if(doctor){
            
                const access_token=createAccessToken({id:doctor._id});
                const url=`${CLIENT_URL}/user/reset/${access_token}`
                sendMail(email,url,"Reset Your Password");
        res.json({msg:"Reset the password, check your Email Please"})
            }
else if(guardian){
    
            const access_token=createAccessToken({id:guardian._id});
            const url=`${CLIENT_URL}/user/reset/${access_token}`
            sendMail(email,url,"Reset Your Password");
    res.json({msg:"Reset the password, check your Email Please"})
}
else{
    return res.status(400).json({msg:'email not found'})
}
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }











    module.exports.resetpassword=async (req,res)=>{


        try {
            const password=req.body.password;
    
            console.log(password)
            
            const passwordHash=await bcrypt.hash(password,12)
            const guardian=guardianM.findById(req.user.id)
            const doctor=doctorM.findOne(req.user.id);
            
            if(guardian){
            await guardianM.findOneAndUpdate({_id:req.user.id}, {
                password:passwordHash
            })
            res.json({msg:"Password updated Sucessfully"})
        }
        if(doctor){

            await doctorM.findOneAndUpdate({_id:req.user.id}, {
                password:passwordHash
            })
            res.json({msg:"Password updated Sucessfully"})


        }



        } catch (err) {
            console.log(err.message)
            return res.status(500).json({msg:err.message})
        }
        
        }
        


        module.exports.logout=async(req,res)=>{
            try {
                res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
                return res.json({msg:"Logged Out Succesfully"})
            } catch (err) {
                console.log(err)
                return res.status(500).json({msg:err.message})   
            }
        }

module.exports.getTotalUsers=async(req,res)=>{

try {
    const user=await userM.find({});
    res.json({totalUsers:user});
    
} catch (err) {
    console.log(err)
                return res.status(500).json({msg:err.message})   
}


}
