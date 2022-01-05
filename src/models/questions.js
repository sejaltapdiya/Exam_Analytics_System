const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
const { stringify } = require("nodemon/lib/utils");
const QuestionsSchema = new mongoose.Schema({
testId:{
  type: String,
  //required:true,
},
questiontext:{
  type:String,
  //required:true
},
option1:{
  type:String,
  //required:true
},
option2:{
  type:String,
  //required: true
},
option3:{
  type:String,
  //required:true
},
option4:{
  type:String,
  //required:true
},
correctoption:{
  type:String,
  //required:true
},
marks:{
  type:Number
}
});

//create collections
const Questions = new mongoose.model("Questions", QuestionsSchema);
//create document or insert
module.exports = Questions;
//module.exports = mongoose.model("questions", QuestionsSchema, "questions");