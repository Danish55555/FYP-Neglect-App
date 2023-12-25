const doctorM=require('../models/doctorModel');
const userM=require('../models/userModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const sendMail=require('./sendMail')
const CLIENT_URL=process.env.CLIENT_URL;
const reviewModel=require('../models/reviewModel')
const mongoose=require('mongoose');
const Patient=require('../models/patientModel');
const appointmentModel = require('../models/appointmentModel');
const requestModel=require('../models/requestModel');
const rehabpatientModel = require('../models/rehabpatientModel');
const patientModel = require('../models/patientModel');
const queryModel=require('../models/queryModel');
const PaymentPlan = require('../models/paymentPlanModel')
const Payment = require('../models/payments')
const  RehabPatients =require('../models/rehabpatientModel');
const Statistics=require('../models/statisticsModel');
const Observation = require('../models/observationModel')
const Faq = require('../models/faqModel')


const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51KYVHgEqKv9XyXpoV8qqx29mh11V10euA5SySBjQPh4wq7TryXXvYj5hXWmAkRDqOPsQgqjLFUv9QqrNkBtNZXc7008rbpqRSJ");
const {cloudinary} = require('../utils/cloudinary')



 module.exports.doctorRegister= async (req,res)=>{
try {
    const {name,email,password}=req.body;
    console.log(name,email,password);
    const user=await doctorM.findOne({email})
    if(user){
        return res.status(400).json({msg:"Email Already exist"})
    }

    const passwordHash=await bcrypt.hash(password,12);

    //console.log({password,passwordHash})
    const newUser={
        name,email,password:passwordHash

    }
    //console.log(newUser);
    const activation_Token=createActivationToken(newUser);
    const url=`${CLIENT_URL}/doctor/activate/${activation_Token}`;
    sendMail(email,url,"Verify Your email");
    


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

module.exports.activateEmail= async(req,res)=>{
    try {
        
const {activation_token}=req.body;
const doctor=jwt.verify(activation_token,process.env.ACTIVATION_TOKEN_SECRET);
const {name,email,password}=doctor;
const check=await doctorM.findOne({email});
if(check){
    return res.status(400).json({msg:"This email already exist"})
}
const newdoctor=new doctorM({
    name,email,password
})
await newdoctor.save()
const newuser=new userM({
    name,email,password,role:2
})
await newuser.save();

res.json({msg:"Account Email activated successfully"})

    } catch (err) {
        return res.status(500).json({msg:err.message})
    }

}

module.exports.login=async (req,res)=>{
    try {
        const{email,password}=req.body;
        const doctor=await doctorM.findOne({email});
        if(!doctor){
            return res.status(400).json({msg:"Email not exist or registered yet"})
        }
        const isMatch=await bcrypt.compare(password,doctor.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect Password entered"})
        }
     
console.log(doctor)
        const refresh_token=createRefreshToken({id:doctor._id});
        res.cookie('refreshtoken',refresh_token,{
                    httpOnly:true,
                    path:'/doctor/refresh_token',
                    maxAge: 7*24*60*60*1000

        })
        res.json({msg:"Login Sucessfull"})


    } catch (err) {
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
        jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,doctor)=>{
            if(err){
                return res.status(400).json({msg:"Please Login Now"})
            }
            const access_token=createAccessToken({id:doctor.id})
            res.json({access_token})


        })
        
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
module.exports.forgetPassword=async (req,res)=>{

    try {
        const {email}=req.body;
        const doctor=await doctorM.findOne({email})

        if(!doctor){
            return res.status(400).json({msg:"This email not registerd"})
        }
        const access_token=createAccessToken({id:doctor._id});
        const url=`${CLIENT_URL}/doctor/reset/${access_token}`
        sendMail(email,url,"Reset Your Password");
res.json({msg:"Reset the password, check your Email Please"})


    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
}
module.exports.resetPassword=async (req,res)=>{


    try {
        const password=req.body.password;
        console.log(password)
    
    const oldpassword=req.body.oldpassword;
    console.log(oldpassword)
    
    const doctor=await doctorM.findById(req.user.id);
    console.log(doctor)
    const isMatch=await bcrypt.compare(oldpassword,doctor.password);
    if(!isMatch){
        return res.json({msg:"Password not matched"})
    }
        const passwordHash=await bcrypt.hash(password,12)
        
        console.log(req.user);
        await doctorM.findOneAndUpdate({_id:req.user.id}, {
            password:passwordHash
        })
        res.json({msg:"Password updated Sucessfully"})
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({msg:err.message})
    }
    
    }
module.exports.getDoctorInfo= async(req,res)=>{
    try{
        
        const doctor=await doctorM.findById(req.doctor.id).select('-password');
res.json(doctor)
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}
module.exports.logout=async(req,res)=>{
    try {
        res.clearCookie('refreshtoken',{path:'/doctor/refresh_token'})
        return res.json({msg:"Logged Out Succesfully"})
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:err.message})   
    }
}
module.exports.deleteUser=async(req,res)=>{
try {
    await doctorM.findByIdAndDelete(req.params.id);
    res.json({msg:"Account Deleted Successfully"})
} catch (err) {
    return res.status(500).json({msg:err.message}) 
}


}



module.exports.updateDoctor=async(req,res)=>{
    try {
    const newtid=req.user.id
    console.log(newtid)
    const updatedDoctor = await doctorM.findByIdAndUpdate(newtid, req.body, {
        new: true,
        runValidators: true
      });
  
      res.status(200).json({
        status: 'success',
        data: {
          updatedDoctor
        }
      });
    } catch (err) {
        console.log(err.message)
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };



  module.exports.updateProfilePicture = async(req,res)=>{
    const p = req.file.path;
    const pt = p.substr(15);
    try{
        await doctorM.findById(req.body.id, function(err, result){
                result.profilepic = pt; 
                result.save();
                res.send(result);
            }).clone();
    }catch(err){
        console.log(err);
    }
}
module.exports.addReview=async(req,res,next)=>{

    reviewModel.create(req.body)
        .then((review) => {
            console.log('review has been Added ', review);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(review);
        }, (err) => next(err))
        .catch((err) => next(err));
}

module.exports.postReply=async(req,res,next)=>{

    reviewModel.findOneAndUpdate({ _id: req.params.id }, {
        "$push": {
            "replies": {
                "userid": req.params.userid,
                "usertype":req.body.usertype,
                "reply":req.body.reply
            }
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });
}


module.exports.getAllReviews=async(req,res)=>{
    try {
        const reviews=await reviewModel.find().sort({createdAt:-1}); 
        res.json({reviews})
    } catch (err) {
        return res.status(500).json({msg:err.message}) 
    }
    
    
    }




    module.exports.deleteReview=async(req,res,next)=>{


        reviewModel.deleteOne({ _id: req.params.id,userid:req.params.userid }, function(error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
    
    
    
    }
    
    
    module.exports.deleteReply=async(req,res,next)=>{
    try{
    
    const review= await reviewModel.findById(req.params.id);   
    const replies=review.replies;
    
    for (let [i, reply] of replies.entries()) {
        if (reply._id == req.params.replyid) {
            replies.splice(i, 1);
        }
     }
    
    
     await reviewModel.findOneAndUpdate({_id:req.params.id}, {
        replies:replies
    })
    res.json({msg:"Reply deleted Sucessfully"})
    }
    catch(err){
        return res.status(500).json({msg:err.message})        
    }        
    }
    



    module.exports.editReview=async(req,res,next)=>{

        try{
            await reviewModel.findOneAndUpdate({_id:req.params.id}, {
                comment:req.body.newcomment
            })
            res.json({msg:"Review updated Sucessfully"})
    
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

//Patients addition,removal to doctor list
module.exports.addPatient=async(req,res,next)=>{
try{


    doctorM.findOneAndUpdate({ _id: req.user.id }, {
        "$push": {
            "patients": {
                "sid": req.params.sid
            }
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json({msg:"Patient Added",results});
    });
}
catch(err){
    return res.status(500).json({msg:err.message})
}

}


module.exports.getPatient=async(req,res,next)=>{

    try {
        const patientList=await Patient.findById(req.params.id);
        res.json({patient:patientList})
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.deletePatient=async(req,res,next)=>{

    try {
        const deletedpatient=await doctorM.findByIdAndUpdate(req.user.id,{
"pull":{
    patients:{
        sid:req.params.id
    }
}

        },{new:true})
res.json({msg:"Patient deleted from list"});

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


module.exports.getAllRequest=async(req,res,next)=>{
    try {
        const allRequest=await requestModel.find({doctor:req.user.id}
            ).populate('patientid').populate('guardianid','-password');
        console.log(allRequest);
        res.json({requeslist:allRequest});
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message,requestlist:[{}] })
    }
}
module.exports.acceptRequest=async(req,res,next)=>{

try {
    const updatedrequest=await requestModel.findByIdAndUpdate(req.params.id,{
        status:true
    })
    const rehabpatient=await rehabpatientModel.create(req.body);
    const patient=await patientModel.findByIdAndUpdate(req.body.patientid,{doctorAlloted:true});
    res.json({msg:"Patient is now in Your rehabilitation List"})
} catch (err) {
    return res.status(500).json({ msg: err.message })    
}

}
module.exports.getAllQueries=async(req,res,next)=>{

    try{
        const allQueries=await queryModel.find({doctorid:req.user.id}).populate('guardianid','-password');
        res.json({Queries:allQueries});
    }
    catch(err){
console.log(err);
return res.status(500).json({ msg: err.message })

    }
}



module.exports.getAllReplies=async(req,res,next)=>{
    try {

        const check=await queryModel.findById(req.params.id);
        
        res.json({replies:check.replies})
        }
        
    catch (err) {
        console.log(err)
        return res.json({replies:[{}]})
    }
    }
module.exports.postReply=async(req,res,next)=>{

    try {
        const updateReply=await queryModel.findByIdAndUpdate(req.params.id,
            {"$push": {
                "replies": {
                    "userid": req.body.userid,
                    "usertype": req.body.usertype,
                    "comment": req.body.comment
                }
            }
        },{ new: true, upsert: false } );

        res.json({updatedReply:updateReply});

            
            
            
            
            
            
            
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message })       
    }
}



//PAYMENTS
module.exports.payments=async(req,res)=>{
    try{
        const {product, token} = req.body
        console.log(new Date())
        console.log(token)
        console.log("PRODUCT: ", product)
        console.log("PRICE: ", product.price)
        const idempotencyKey = uuidv4();      //makes sure user is not charged twice for the same plan
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            stripe.charges.create({ 
                amount: product.price * 100,
                currency: 'usd', 
                customer: customer.id,
                receipt_email: token.email,
                description: `PAYMENT PLAN: product.name`
            },{idempotencyKey}) 
        })
        .then(async() =>{
            try{
                const newpayment = await Payment.create({doctorId: req.params.did, planId: req.params.pid, paydate: new Date() })
            }catch(error){
                console.log(error)
                return res.status(500).json({ msg: error.message })
            }
        })
        .then(result=> res.status(200).json(result))
        .catch(err=>console.log(err))
    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}

//PAYMENT PLANS

module.exports.getplan = async(req,res) => {
    try{
      const plan = await PaymentPlan.find({})
      res.json(plan)
      
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }

module.exports.getpaymenthistory = async(req,res) => {
    try{
        const ph = await Payment.find({doctorId: req.params.did}).populate('planId','-_id')
        res.json(ph) 
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
}



//Appointments
module.exports.addAppointment=async(req,res,next)=>{
    try{
const newappointment=await  appointmentModel.create(req.body);
console.log(newappointment)
res.json({msg:"Appointment is scheduled", appointment:newappointment})

    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.updateAppointment=async(req,res,next)=>{
    try{
const newappointment=await  appointmentModel.findByIdAndUpdate(req.params.id,req.body);
res.json({msg:"Appointment is updated", appointment:newappointment})
    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.deleteAppointment=async(req,res,next)=>{
    try{
const newappointment=await  appointmentModel.findByIdAndDelete(req.params.id);
res.json({msg:"Appointment is deleted", appointment:newappointment})
    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.getAllAppointments=async(req,res,next)=>{
    try{
        const appts = await appointmentModel.find({}).populate('patientid')
        console.log(appts)
        res.json(appts)
        
      }catch(err){
        return res.status(500).json({msg: err.message})
      }
}



//Rehab patients
module.exports.getrehabpatients = async(req,res) => {
    try{
        const ph = await RehabPatients.find({doctorid: req.params.id}).populate('patientid')
        res.json(ph) 
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
}



//Cloudinary upload profile picture 
module.exports.uploadprofilepicture = async(req,res) => {
    try{
      const filestring = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(filestring, {
        upload_preset: 'ml_default'
      });
      console.log(uploadResponse)
      res.json({msg: uploadResponse.url})
    }catch(err){
      return res.status(500).json({msg: err.message})
    }
    }
module.exports.uploadStatistics=async(req,res)=>{

    try {

        const Statis=await Statistics.create(req.body);
        res.json({msg:"Statistics Posted"});

    } catch (err) {
      return res.status(500).json({msg: err.message})

        
    }
}


module.exports.getStatistics=async(req,res)=>{

    try {

        const Statis=await Statistics.find({}).populate('appointmentId').populate('patientid').populate('guardianid').populate('doctorid');
        res.json({allStats:Statis});

    } catch (err) {
      return res.status(500).json({msg: err.message})

        
    }
}


module.exports.postobservation=async(req,res,next)=>{
    try{
const obs=await  Observation.create(req.body);
console.log(obs)
res.json({msg:"Observation is added"})

    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}

//faq

module.exports.faq=async(req,res)=>{
    try {
        const faq = await Faq.find({})
        return res.json(faq)
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:err.message})   
    }
}

module.exports.setMilestone=async(req,res,next)=>{

    try {
        const mile=await Patient.findByIdAndUpdate(req.params.pid, {milestone: req.body.milestone});
        res.json("Milestone set")
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}



