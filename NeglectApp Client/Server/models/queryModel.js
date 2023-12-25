const mongoose=require('mongoose');
const querySchema=new mongoose.Schema(
    {
        
guardianid:{
    type:mongoose.Types.ObjectId,
    ref:'Guardian',
    required:true
},doctorid:{
type:mongoose.Types.ObjectId,
ref:'Doctor'

}
,name:{
    type:String,
    required:true
},

comment:{
type:String,
required:true
},
replies:{
type:[{
    userid:{
        type:mongoose.Types.ObjectId
    },
    usertype:{
type:String
    },
    comment:{
        type:String
    }
}]
}

    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Query",querySchema);
