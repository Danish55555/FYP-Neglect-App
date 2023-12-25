var Admin = require('../models/adminModel')
var Guardian = require('../models/guardianModel')
var Doctor = require('../models/doctorModel')
var Faq = require('../models/faqModel')
var Announcement = require('../models/announcementModel')
var PaymentPlan = require('../models/paymentPlanModel')
var Payment = require('../models/payments')
var userM = require('../models/userModel')
var Statistics = require('../models/statsModel')
var sendMail = require("./sendMail");
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { cloudinary } = require('../utils/cloudinary')
const appointmentModel = require('../models/appointmentModel')
const patientModel = require('../models/patientModel')
const {CLIENT_URL} = process.env

module.exports.adminCtrl = async(req, res, next)=>{
    try{ 

        if(!req.body.name || !req.body.email || !req.body.password){
            return res.status(400).json({msg: "Please fill in all the details"})
        }
        if(!validateEmail(req.body.email)){
            return res.status(400).json({msg: "Invalid email"})
        }

        const email = await Admin.findOne({email: req.body.email})
        if(email) {
            return res.status(400).json({msg: "Email already exists"})
        }

        if(req.body.password.length <6){
            return res.status(400).json({msg: "Password should contain minimum 6 characters"})
        }

        const passwordHash = await bcrypt.hash(req.body.password, 12)
        
        const newAdmin = {name: req.body.name, password: passwordHash, email: req.body.email}
        
        const activation_token = createActivationToken(newAdmin)
        
        const url = `${CLIENT_URL}/admin/activate/${activation_token}`
  
        sendMail(req.body.email, url, "Verify with your email address") 
        
        res.json({msg: "Register Success! Please activate your email to start."})

    }catch(err){
        return res.status(500).json({msg: err.message})
    }
}

module.exports.activateEmail = async(req,res) =>{
  try{
    const {activation_token}=req.body
    const admin=jwt.verify(activation_token,process.env.ACTIVATION_TOKEN_SECRET);
    console.log(admin)
    const {name, email, password} = admin; 
    const check = await Admin.findOne({email})
    if(check) return res.status(400).json({msg:"this email already exists"})

    const newAdmin = new Admin({name, email, password}) 
    await newAdmin.save();
    res.json({msg: "Account has been activated"})

  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.login = async(req,res) => {
  try{
    const admin = await Admin.findOne({email: req.body.email})
    if(!admin) return res.status(400).json({msg: "This email does not exist!"})
    
    const isValid = await bcrypt.compare(req.body.password, admin.password) 
    if(!isValid) return res.status(400).json({msg: "Password is incorrect."})
    const refresh_token = createRefreshToken({id: admin.id})
    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/admin/refresh_token', 
      maxAge: 7*24*60*60*1000
    })
  res.json({msg: "Login Successful"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.getAccessToken  = async(req,res) => {
  try{
    const rf_token = req.cookies.refreshtoken
    if(!rf_token) return res.status(400).json({msg: "Please login now!"})

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, admin) => {
    if(err) return res.status(400).json({msg: "Please login now"})

    const access_token = createAccessToken({id: admin.id})
    res.json({access_token})
    })

  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.forgotPassword = async(req, res) => {
  try{
    const admin = await Admin.findOne({email: req.body.email})
    if(!admin) return res.status(400).json({msg: "This email does not exist!"})

    const access_token = createAccessToken({id: admin.id})
    const url = `${CLIENT_URL}/user/reset/${access_token}`
    sendMail(req.body.email, url, "Reset Password")
    res.json({msg: "Reset your password, please check your mail"})

  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.resetPassword = async(req,res) => {
  try{
    const passwordHash = await bcrypt.hash(req.body.password, 12)

    await Admin.findOneAndUpdate({_id: req.admin.id}, {password: passwordHash})
    res.json({msg: "Password successfully changed!"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
  
}

module.exports.getAdminInfor = async(req,res) => {
  try{
    const admin = await Admin.findById(req.admin.id) 
    res.json(admin)
  }catch(err){
    res.status(500).json({msg: err.message})
  }
}

module.exports.getGuardianInfor = async(req,res) => {
  try{
    const guardians = await Guardian.find({}).select('-password')
    res.json(guardians)
  }catch(err){
    console.log(err.message)
    return res.status(500).json({msg: err.message})
  }
}

module.exports.getDoctorInfor = async(req,res) => {
  try{
    const doctors = await Doctor.find({}).select('-password')
    res.json(doctors)
    
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}
module.exports.logout = async(req,res) => {
  try{
    res.clearCookie('refreshtoken', {path: '/admin/refresh_token'})
    return res.json({msg: "Logged out"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.updateprofile = async(req, res) => {
  try{
    await Admin.findOneAndUpdate({_id: req.admin.id}, req.body)
    res.json({msg: "Profile Updated."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.updateuserrole = async(req,res)=> {
  try{
    await Guardian.findOneAndUpdate({_id: req.params.id}, {role: req.body.role})
    res.json({msg: "Role Updated."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.deleteguardian = async(req,res)=>{
  try{
    await Guardian.findByIdAndDelete(req.params.id)
    res.json({msg: "User Deleted."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.deletedoctor = async(req,res)=>{
  try{
    await Doctor.findByIdAndDelete(req.params.id)
    res.json({msg: "User Deleted."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}
/* FAQ */ 
module.exports.addfaq = async(req,res) => {
  try{
    const faq = new Faq({question: req.body.question, answer: req.body.answer}) 
    await faq.save();
    res.json({msg: "Faq has been added!"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.delfaq = async(req,res)=>{
  try{
    await Faq.findByIdAndDelete(req.params.id)
    res.json({msg: "Faq Deleted."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.getfaq = async(req,res) => {
  try{
    const faq = await Faq.find({})
    res.json(faq)
    
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.updatefaq = async(req, res) => {
  try{
    await Faq.findOneAndUpdate({_id: req.params.id}, req.body) 
    res.json({msg: "Faq Updated."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

/* ANNOUNCEMENTS */ 
module.exports.addannouncement = async(req,res) => {
  try{
    const announce = new Announcement({notice: req.body.notice}) 
    await announce.save();
    res.json({msg: "Announcement has been added!"})
  }catch(err){
    console.log(err)
    return res.status(500).json({msg: err.message})
  }
}

module.exports.delannouncement = async(req,res)=>{
  try{
    await Announcement.findByIdAndDelete(req.params.id)
    res.json({msg: "Announcement Deleted."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.getannouncement = async(req,res) => {
  try{
    const announce = await Announcement.find({})
    res.json(announce)
    
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.updateannouncement = async(req, res) => {
  try{
    await Announcement.findOneAndUpdate({_id: req.params.id}, req.body) 
    res.json({msg: "Announcement Updated."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}



/* Payment Plans */ 
module.exports.addplan = async(req,res) => {
  try{
    const plan = new PaymentPlan({name: req.body.name, price: req.body.price, description: req.body.description, duration: req.body.duration}) 
    await plan.save();
    res.json({msg: "Plan has been added!"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.delplan = async(req,res)=>{
  try{
    await PaymentPlan.findByIdAndDelete(req.params.id)
    res.json({msg: "Plan Deleted."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.getplan = async(req,res) => {
  try{
    const plan = await PaymentPlan.find({})
    res.json(plan)
    
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.updateplan = async(req, res) => {
  try{
    await PaymentPlan.findOneAndUpdate({_id: req.params.id}, req.body) 
    res.json({msg: "Plan Updated."})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}



//upload profile picture
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



//upload detector image
module.exports.uploadImage = async(req,res) => {
  try{
    const filestring = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(filestring, {
      upload_preset: 'dev_setups'
    });
    console.log(uploadResponse)
    res.json({msg: "YAYAYAY"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.cloudImage = async(req,res) => {
  try{
    const { resources } = await cloudinary.search
    .expression('folder:Detector')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
const publicIds = resources.map((file) => file.public_id);
console.log(publicIds)
console.log(publicIds.length)

res.send(publicIds);
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}



//upload rehab images

module.exports.uploadrehabimg = async(req,res) => {
  try{
    const filestring = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(filestring, {
      upload_preset: req.body.roundnumber
    }); 
    console.log(uploadResponse)
    res.json({msg: "YAYAYAY"})
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

module.exports.cloudRehabImage = async(req,res) => {
  try{
    var foldername = ""
    if( req.params.id === "1"){
      foldername = "folder: Detector"
    }
    else if(req.params.id === "2"){
      foldername = "folder: Detector"
    }
    else{
      foldername = "folder: Detector"
    }
    const { resources } = await cloudinary.search 
    .expression(foldername) 
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

const publicIds = resources.map((file) => file.url);
console.log(publicIds)
//res.send(publicIds);
res.json(publicIds)
  }catch(err){
    return res.status(500).json({msg: err.message})
  }
}

//Payments History 

module.exports.getpaymenthistory = async(req,res) => {
  try{
      const ph = await Payment.find().populate('planId').populate('doctorId')
      res.json(ph) 
  }catch(err){
      console.log(err)
      return res.status(500).json({msg: err.message})
  }
}


//Verify payment

module.exports.verifypayment = async(req, res) =>{
  try{
    const ph = await Doctor.findOneAndUpdate({_id: req.params.did, paymentStatus: 1})
    res.json({msg: "Payment Verified!!"}) 
  }catch(err){
    console.log(err)
    return res.status(500).json({msg: err.message})
  }
}


//graphs

module.exports.getTotalUsers=async(req,res)=>{

  try {
      const user=await userM.find({});
      res.json({totalUsers:user});
      
  } catch (err) {
      console.log(err)
                  return res.status(500).json({msg:err.message})   
  }
  
  
  }

  //reports

  module.exports.getStatistics=async(req,res)=>{

    try {

        const Statis=await Statistics.find({}).populate('guardianid').populate('doctorid').populate({path:'appointmentId', model: appointmentModel}).populate({path:'patientid', model: patientModel});
        res.json({allStats:Statis});

    } catch (err) {
      console.log(err)
      return res.status(500).json({msg: err.message})

        
    }
}





const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

  const createActivationToken = (payload) =>{
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: "15m"})
  }
  const createAccessToken = (payload) =>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
  }
  const createRefreshToken = (payload) =>{
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
  }