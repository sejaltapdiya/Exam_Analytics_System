const mongoose=require("mongoose");


const studSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
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
const Student = new mongoose.model("Student",studSchema);
//create document or insert
module.exports=Student;