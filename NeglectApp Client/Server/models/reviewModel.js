const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema(
    {
userid:{
    type:mongoose.Types.ObjectId,
    required:true
},
usertype:{
    type:String,
    required:true
}
,name:{
    type:String

},
subject:{
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
    reply:{
        type:String
    }
}]
}

    },
    {
        timestamps:true
    }
)
module.exports=mongoose.model("Review",reviewSchema);
