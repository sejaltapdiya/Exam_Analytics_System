const { create } = require("express-handlebars");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/examdb", {
    useNewUrlParser:true
   
}).then(()=>{
    console.log('connection successful');
}).catch((e)=>{
    console.log('no connection');
})


//collection creation
