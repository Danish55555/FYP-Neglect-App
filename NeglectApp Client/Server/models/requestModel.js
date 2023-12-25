const mongoose=require('mongoose');
const requestSchema=new mongoose.Schema(
    {
guardianid:{
    type:mongoose.Types.ObjectId,
    ref:'Guardian',
    required:true
}
,guardianname:{
    type:String

},
subject:{
    type:String, 
    default:'Request for Patient Rehabilitation'
},
comment:{
type:String,
default:"Hello. I want rehabilitation plan for my relative who is spatial neglect patient. kindly Accept the request."
},
patientid:{
    type:mongoose.Types.ObjectId,
    ref:'Patient',
    required:true
},

doctorid:{
    type:mongoose.Types.ObjectId,
    ref:'Doctor'
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
module.exports=mongoose.model("Request",requestSchema);
