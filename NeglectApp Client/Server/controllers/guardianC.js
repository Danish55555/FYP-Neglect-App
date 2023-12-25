const guardianM = require('../models/guardianModel');
const userM = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail')
const CLIENT_URL = process.env.CLIENT_URL;
const mongoose = require('mongoose');
const reviewModel = require('../models/reviewModel');
const Patient=require('../models/patientModel')
const requestModel=require('../models/requestModel')
const appointmentModel=require('../models/appointmentModel');
const doctorModel=require('../models/doctorModel.js')
const queryModel=require('../models/queryModel')
const Statistics = require('../models/statisticsModel')
const Observation = require('../models/observationModel')
const Faq = require('../models/faqModel')
const RehabPatients =require('../models/rehabpatientModel')
const {cloudinary} = require('../utils/cloudinary')
module.exports.guardianRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const user = await guardianM.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "Email Already exist" })
        }

        const passwordHash = await bcrypt.hash(password, 12);

        //console.log({password,passwordHash})
        const newUser = {
            name, email, password: passwordHash

        }
        //console.log(newUser);
        const activation_Token = createActivationToken(newUser);
        const url = `${CLIENT_URL}/guardian/activate/${activation_Token}`;
        sendMail(email, url, "Verify Your email");



        res.json({ msg: "Register Success please activate Your account email to start." })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message })
    }
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

module.exports.activateEmail = async (req, res) => {
    try {

        const { activation_token } = req.body;
        const guardian = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);
        const { name, email, password } = guardian;
        const check = await guardianM.findOne({ email });
        if (check) {
            return res.status(400).json({ msg: "This email already exist" })
        }
        const newGuardian = new guardianM({
            name, email, password
        })
        await newGuardian.save()

        const newuser = new userM({
            name, email, password, role: 1
        })
        await newuser.save()


        res.json({ msg: "Account Email activated successfully" })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const guardian = await guardianM.findOne({ email });
        if (!guardian) {
            return res.status(400).json({ msg: "Email not exist or registered yet" })
        }
        const isMatch = await bcrypt.compare(password, guardian.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect Password entered" })
        }

        console.log(guardian)
        const refresh_token = createRefreshToken({ id: guardian._id });
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/guardian/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000

        })
        res.json({ msg: "Login Sucessfull" })


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}


module.exports.getAccessToken = async (req, res) => {

    try {
        const rf_token = req.cookies.refreshtoken;
        console.log(rf_token);
        if (!rf_token) {
            return res.status(400).json({ msg: "Please Login Now" })
        }
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, guardian) => {
            if (err) {
                return res.status(400).json({ msg: "Please Login Now" })
            }
            const access_token = createAccessToken({ id: guardian.id })
            res.json({ access_token })


        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.forgetPassword = async (req, res) => {

    try {
        const { email } = req.body;
        const guardian = await guardianM.findOne({ email })

        if (!guardian) {
            return res.status(400).json({ msg: "This email not registerd" })
        }
        const access_token = createAccessToken({ id: guardian._id });
        const url = `${CLIENT_URL}/guardian/reset/${access_token}`
        sendMail(email, url, "Reset Your Password");
        res.json({ msg: "Reset the password, check your Email Please" })


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.resetPassword = async (req, res) => {


    try {
        const password = req.body.password;
        console.log(password)

        const oldpassword = req.body.oldpassword;
        console.log(oldpassword)

        const guardian = await guardianM.findById(req.user.id);
        console.log(guardian)
        const isMatch = await bcrypt.compare(oldpassword, guardian.password);
        if (!isMatch) {
            return res.json({ msg: "Password not matched" })
        }
        const passwordHash = await bcrypt.hash(password, 12)

        console.log(req.user);
        await guardianM.findOneAndUpdate({ _id: req.user.id }, {
            password: passwordHash
        })
        res.json({ msg: "Password updated Sucessfully" })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.getGuardianInfo = async (req, res) => {
    try {

        const guardian = await guardianM.findById(req.guardian.id).select('-password');
        res.json(guardian)
    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/guardian/refresh_token' })
        return res.json({ msg: "Logged Out Succesfully" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.deleteUser = async (req, res) => {
    try {
        await guardianM.findByIdAndDelete(req.params.id);
        res.json({ msg: "Account Deleted Successfully" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }


}
module.exports.updateGuardian = async (req, res) => {
    try {
        const newtid = req.user.id
        console.log(newtid)
        const updatedguardian = await guardianM.findByIdAndUpdate(newtid, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                updatedguardian
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};








module.exports.resetpass = async (req, res) => {


    try {
        const password = req.body.password;
        console.log(password)

        const passwordHash = await bcrypt.hash(password, 12)

        console.log(req.user);
        await guardianM.findOneAndUpdate({ _id: req.user.id }, {
            password: passwordHash
        })
        res.json({ msg: "Password updated Sucessfully" })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.addReview = async (req, res, next) => {

    reviewModel.create(req.body)
        .then((review) => {
            console.log('review has been Added ', review);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(review);
        }, (err) => next(err))
        .catch((err) => next(err));
}


module.exports.updateProfilePicture = async (req, res) => {
    const p = req.file.path;
    const pt = p.substr(15);
    try {
        await guardianM.findById(req.body.id, function (err, result) {
            result.profilepic = pt;
            result.save();
            res.send(result);
        }).clone();
    } catch (err) {
        console.log(err);
    }
}

module.exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().sort({ createdAt: -1 });
        res.json({ reviews })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }


}
module.exports.postReply = async (req, res, next) => {

    reviewModel.findOneAndUpdate({ _id: req.params.id }, {
        "$push": {
            "replies": {
                "userid": req.params.userid,
                "usertype": req.body.usertype,
                "reply": req.body.reply
            }
        }
    }, { new: true, upsert: false },
        function (error, results) {
            if (error) {
                return next(error);
            }
            // Respond with valid data
            res.json(results);
        });
}


module.exports.deleteReview = async (req, res, next) => {


    reviewModel.deleteOne({ _id: req.params.id, userid: req.params.userid }, function (error, results) {
        if (error) {
            return next(error);
        }
        // Respond with valid data
        res.json(results);
    });



}


module.exports.deleteReply = async (req, res, next) => {


    const review = await reviewModel.findById(req.params.id);
    const replies = review.replies;

    for (let [i, reply] of replies.entries()) {
        if (reply._id == req.params.replyid) {
            replies.splice(i, 1);
        }
    }


    await reviewModel.findOneAndUpdate({ _id: req.params.id }, {
        replies: replies
    })
    res.json({ msg: "Reply deleted Sucessfully" })

}

module.exports.editReview = async (req, res, next) => {

    try {
        await reviewModel.findOneAndUpdate({ _id: req.params.id }, {
            comment: req.body.newcomment
        })
        res.json({ msg: "Review updated Sucessfully" })

    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.addPatient = async (req, res, next) => {

    try {
        const newpatient = await Patient.create(req.body);
        res.json({ msg: "Patient Added" });
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ msg: err.message })
    }

}
module.exports.getAllPatients=async(req,res,next)=>{

    try {
        const patientList=await Patient.find({guardianId:req.user.id});
        res.status(200).json({patients:patientList})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err.message })
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








module.exports.updatePatient = async (req, res, next) => {

    try {
        const newpatient = await Patient.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Patient Data Updated",updatedpatient:newpatient });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.deletePatient = async (req, res, next) => {

    try {
        const newpatient = await Patient.findByIdAndDelete(req.params.id);
        res.json({ msg: "Patient Deleted" });
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.setNeglectType=async(req,res,next)=>{
    try {
        const updatedNeglectPatient=await Patient.findByIdAndUpdate(req.params.id,{neglecttype:req.body.neglecttype});
        res.json({msg:'Neglect Type Updated', patient:updatedNeglectPatient})
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}




module.exports.getAllAppointments=async(req,res,next)=>{
    try {
        const allapointments=await appointmentModel.find({patientid:req.params.id});
        res.json({appointments:allapointments})
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }   
}




module.exports.postRequest=async(req,res,next)=>{
    try {
        console.log(req.body);
        const check=await requestModel.find({patientid:req.body.patientid});
        console.log()
        try{
        if(check[0].patientid){
            return res.json({msg:'Request for this patient already request'});
        }
    }catch(eee){
        const newquery=await requestModel.create(req.body);
        res.json({msg:"Request is posted related to patient rehabilitation"})}
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }
}

module.exports.getRequest=async(req,res,next)=>{
    try{
        const allrequest=await requestModel.find({guardianid:req.user.id})
        res.json({requests:allrequest});
    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}


module.exports.deleteRequest=async(req,res,next)=>{
    try{
        const allrequest=await requestModel.findByIdAndDelete(req.params.id)
        res.json({msg:"Request Deleted"});
    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }
}
module.exports.getAllDoctors=async(req,res,next)=>{

try{
    const doctors=await doctorModel.find({}).select('-password');
    res.json({doctorlist:doctors})
}
catch(err){
    return res.status(500).json({ msg: err.message })
}


}
module.exports.getDoctor=async(req,res,next)=>{
    try{
        const doctors=await doctorModel.findById(req.params.id).select('-password');
        res.json({doctor:doctors})
    }
    catch(err){
        return res.status(500).json({ msg: err.message })
    }

}
module.exports.sendQuery=async(req,res,next)=>{
    try {
        console.log(req.body);
        const check=await queryModel.find({$and:[{guardianid:req.body.guardianid},{doctorid:req.body.doctorid},{patientid:req.body.doctorid}]});
        
        try{
        if(check[0].guardianid){
           

const replynew=await queryModel.findOneAndUpdate({

    $and:[{guardianid:req.body.guardianid},{doctorid:req.body.doctorid}]

}, {"$push": {
                    "replies": {
                        "userid": req.body.userid,
                        "usertype": req.body.usertype,
                        "comment": req.body.comment
                    }
                }
            }, { new: true, upsert: false });
            console.log(replynew);
            res.json({msg:"reply posted"})
        }
    }catch(eee){
        const newquery=await queryModel.create(req.body);        
        res.json({msg:"Query Posted"})}
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message })
    }   
}

module.exports.getAllReplies=async(req,res,next)=>{
    try {
console.log(req.body)
        const check=await queryModel.findOne({$and:[{guardianid:req.params.gid},{doctorid:req.params.did}]});
        
        res.json({replies:check.replies})
        }
        
    catch (err) {
        console.log(err)
        return res.json({replies:[{}]})
    }
    }

module.exports.getAllRequest=async(req,res,next)=>{
    try {
        const allRequest=await requestModel.find({guardianid:req.user.id}).populate('patientid').populate('doctorid','-password').populate('guardianid','-password');
        console.log(allRequest);
        res.json({requeslist:allRequest});
    
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: err.message,requestlist:[{}] })
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




//appointments

module.exports.getAllAppointments=async(req,res,next)=>{
    try{
        const appts = await appointmentModel.find({guardianid: req.params.gid})
        .populate('patientid')
        .populate('doctorid')
        console.log(appts)
        res.json(appts)
        
      }catch(err){
        return res.status(500).json({msg: err.message})
      }
}

module.exports.faq=async(req,res)=>{
    try {
        const faq = await Faq.find({})
        return res.json(faq)
    } catch (err) {
        console.log(err)
        return res.status(500).json({msg:err.message})   
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

module.exports.getrehabpatients = async(req,res) => {
    try{
        const ph = await RehabPatients.find({guardianid: req.params.id}).populate('patientid')
        res.json(ph) 
    }catch(err){
        console.log(err)
        return res.status(500).json({msg: err.message})
    }
}