var mongoose = require('mongoose');
const announcementSchema=new mongoose.Schema({
            notice:{
                type: String
            }
},{
    timestamps: true
})
module.exports=mongoose.model("Announcement", announcementSchema);