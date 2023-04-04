const mongoose = require("mongoose")
const photo_schema = new mongoose.Schema({
    label : {type:String, required:true},
    file:{type:String, required:true}
})
const model = mongoose.model("photo_gallery", photo_schema)
module.exports = model