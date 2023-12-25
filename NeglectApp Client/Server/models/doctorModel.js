var mongoose = require('mongoose');

const doctorSchema=new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            default:25
        },
        email:{
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        gender:{
            type: String,
            default:"male"
        },
        phonenumber:{
            type: String,
            default:"1234567"
        },
        address:{
            type: String,
            default:"hello address"
        },
        qualification:{
            type: String,
            default:"abc"
        },
        paymentStatus:{
            type: Number,
            default:0
        },
        country:{
            type: String,
            default:"Pakistan"
        },
        city:{
            type: String,
            default:"Rwp"
        },
        profilepic:{
            type: String,
            default:"https://res.cloudinary.com/drimnkool/image/upload/v1636226843/samples/landscapes/beach-boat.jpg"
        },
        planId:{
            type: mongoose.Types.ObjectId,
            ref: 'PaymentPlan'

        }, 
        paymentStatus:{
            type: Number
        },
        role:{
            type: Number,
            default:2
        },
        paymentverify:{
type:Boolean,
default:false
        },
        patients: {
            type: [{
                sid: {
                    type: mongoose.Types.ObjectId,
                    ref: 'Patient',
                    unique:true
                }
            }]
        }
    }
)
module.exports=mongoose.model("Doctor",doctorSchema);