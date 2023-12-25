const mongoose=require('mongoose');
const observationSchema=new mongoose.Schema(
    {
        patientid:{
            type:mongoose.Types.ObjectId,
            ref:'Patient'
        },
        appointmentId:{
            type:mongoose.Types.ObjectId,
            ref:'Appointment'
        },
        comment: {
            type: String,
            default: null
        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Observation",observationSchema);