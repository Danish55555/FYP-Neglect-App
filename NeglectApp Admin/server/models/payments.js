const mongoose=require('mongoose');
const paymentSchema=new mongoose.Schema(
    {
        doctorId:{
            type: mongoose.Types.ObjectId,
            ref: 'Doctor',
            //type: String,         
            required: true
        }, 
        planId: {
            type: mongoose.Types.ObjectId,
            ref: 'Payment Plan',
            required: true
        },
        paydate:{
            type: Number,
            default: 0
        }
    }
)
module.exports=mongoose.model("Payment",paymentSchema);