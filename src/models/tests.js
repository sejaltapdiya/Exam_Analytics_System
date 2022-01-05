const mongoose=require("mongoose");
const testSchema = new mongoose.Schema({
    testname:{
        type: String,
        required: true
    },
    topicName:
    {
        type: String,
        required:true
    },
    description:{
        type: String,
    },
    numberOfQuestions:{
        type: Number,
        required:true,
    },
    startDate: {
        type: Date,
        required:true
    },
    endDate: {
        type: Date,
        required:true
    },
    startTime: {
        type: String,
        required:true
    },
    endTime: {
        type: String,
        required:true
    },
   

})
//create collections
const Test = new mongoose.model("Test",testSchema);
//create document or insert
module.exports=Test;
