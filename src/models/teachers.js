const mongoose=require("mongoose");


const teaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subject:
    {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    contact:{
        type: Number,
        required:true,
        unique:true
    },
    gender: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    confirmpassword: {
        type: String,
        required:true
    }

})
//create collections
const Teacher = new mongoose.model("Teacher",teaSchema);
//create document or insert
module.exports=Teacher;