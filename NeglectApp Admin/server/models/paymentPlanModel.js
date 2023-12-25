const mongoose=require('mongoose');
const paymentPlan=new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    }    
)
module.exports=mongoose.model("Payment Plan",paymentPlan);