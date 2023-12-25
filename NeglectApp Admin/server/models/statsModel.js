const mongoose=require('mongoose');
const rehabSchema=new mongoose.Schema(
    {


        guardianid:{
            type:mongoose.Types.ObjectId,
            ref:'Guardian',
            required:true
        },doctorid:{
        type:mongoose.Types.ObjectId,
        ref:'Doctor'
        
        },patientid:{

            type:mongoose.Types.ObjectId,
            ref:'Patient'

        },
        appointmentId:{
            type:mongoose.Types.ObjectId,
            ref:'Appointment'
        },
        r1score:{
            type:Number,
            default:0
        },        r2score:{
            type:Number,
            default:0
        },        r3score:{
            type:Number,
            default:0
        }
        

    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Statistics",rehabSchema);