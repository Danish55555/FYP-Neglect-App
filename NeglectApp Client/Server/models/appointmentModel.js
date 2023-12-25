const mongoose=require('mongoose');
const appointmentSchema=new mongoose.Schema(
    {
doctorid:{
    type:mongoose.Types.ObjectId,
    ref:'Doctor'
},
patientid:{
    type:mongoose.Types.ObjectId,
    ref:'Patient'
},
date:{
    type:String
},
starttime:{
type:String
},
endtime:{
type:String
},
status:{
    type:Boolean,
    default:false
}

    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Appointment",appointmentSchema);
