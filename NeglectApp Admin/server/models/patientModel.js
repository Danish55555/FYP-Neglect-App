const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema(
    {
name:{
    type:String,
    required:[true,"Please Enter Your Name"],
    trim:true
},

age:{
    type:Number,
    default:25

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
neglecttype:{
    type:String,
    default:'none'
}
,
milestone:{
    type:Number,
    default:0
},
currentmilestone:{
    type:Number,
    default:0

},
guardianId:{
    type:mongoose.Types.ObjectId,
    ref:'Guardian',
    required:true
},
doctorAlloted:{
    type:Boolean,
    default:false
}



    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Patient",patientSchema);