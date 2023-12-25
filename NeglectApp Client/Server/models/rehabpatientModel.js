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

        }
    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Rehabpatient",rehabSchema);