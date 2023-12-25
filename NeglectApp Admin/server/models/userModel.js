const mongoose=require('mongoose');
const userSchema=new mongoose.Schema(
    {
name:{
    type:String,
    required:[true,"Please Enter Your Name"],
    trim:true
},

email:{
    type:String,
    required:[true,"Please Enter Your Email"],
    trim:true,
    unique:true
}
,
password:{
    type:String, 
    required:[true,"Please Enter Passsword"],
}
, profilepic:{
    type:String,
    default:"https://res.cloudinary.com/drimnkool/image/upload/v1636226843/samples/landscapes/beach-boat.jpg"
},
role:{
    type:Number,
    default:1

}


    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model(" User",userSchema);