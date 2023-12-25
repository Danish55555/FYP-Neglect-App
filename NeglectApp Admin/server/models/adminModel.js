var mongoose = require('mongoose');
const adminSchema=new mongoose.Schema({
            name:{
                type: String,
            },
            age:{
                type: Number,
            },
            email:{
                type: String,
                unique: true,
                required: [true, "Please enter your email!"]
            },
            password:{
                type: String,
                required: [true, "Please enter your password!"]
            },
            gender:{
                type: String,
            },
            phoneNumber:{
                type: String,
            },
            experience: {
                type: [{
                    company: {
                        type: String,
                    },
                    years:{
                        type: Number,
                    }
                }]
            },
            role: {
                type: Number,
                default: 0
            },
            profilePic: {
                type: String,
                default: "https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png"
            }
},{
    timestamps: true
})
module.exports=mongoose.model("Admin", adminSchema);