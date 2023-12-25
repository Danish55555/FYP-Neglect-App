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
},
age:{
    type:Number,
    default:25

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
gender:{
    type:String,
    default:"male"

}
,


phonenumber:{
    type:String,
    default:"1234567"
    },
    address:{
        type:String,
        default:"hello address"

    },country:{
        type:String,
        default:"Pakistan"
    
    },
    city:{
        type:String,
        default:"Rwp"
    }
    
,

role:{
    type:Number,
    default:1

}


    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Guardian",userSchema);