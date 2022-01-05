const express = require("express");
const { Mongoose, mongo } = require("mongoose");
const path=require("path");
const app =  express();
const ejs=require('ejs');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
const methodOverride=require('method-override');
require("./db/conn");
const Student=require("./models/students");
const Teacher=require("./models/teachers");
const Test = require("./models/tests");
const json=require("express");
const QuestionsSchema = require("./models/questions");
const Questions = require("./models/questions");
const { Console } = require("console");
//const Questions = require("./models/questions");



const port = process.env.PORT || 3000;

//console.log(path.join(__dirname,"../public"));
const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.set('view engine','ejs');



app.get("/",(req,res) => {

   // res.send("hello exam analytics system")
  // res.sendFile(path.join(__dirname, 'views/index.html'));

  res.render("index");
});
app.get("/student",(req,res)=>
{
    res.render("student");
})
//create a new user in our database
app.post("/student",async(req,res)=>
{
    try{
        //console.log(req.body.fullname);
        //res.send(req.body.fullname);
        
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;

        if(password==confirmpassword)
        {
         

         const stud1 = new Student({
                 name:req.body.name,
                 email:req.body.email,
                 contact:req.body.contact,
                 gender:req.body.gender,
                 password:req.body.password,
             confirmpassword:req.body.confirmpassword


             })
            // console.log(req.body.contact);

             const registered=await stud1.save();
             //res.sendFile(path.join(__dirname, 'views/login.html'));
             res.render("login");
        }else
        {
            res.send("password is not matching")
        }


    }
    catch(error){
            res.status(400).send(error);
    }
})


app.get("/teacher",(req,res)=>
{
    res.render("teacher");
})

//create a new user in our database
app.post("/teacher",async(req,res)=>
{
    try{
        //console.log(req.body.fullname);
        //res.send(req.body.fullname);
        
        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;

        if(password==confirmpassword)
        {
         

         const tea1 = new Teacher ({
                 name:req.body.name,
                 subject:req.body.subject,
                 email:req.body.email,
                 contact:req.body.contact,
                 gender:req.body.gender,
                 password:req.body.password,
             confirmpassword:req.body.confirmpassword


             })
             //console.log(req.body.contact);

             const registered=await tea1.save();
            // res.sendFile(path.join(__dirname, 'views/login.html'));
             res.render("login");
        }else
        {
            res.send("password is not matching")
        }

    }
    catch(error){
            res.status(400).send(error);
    }
})
app.get("/login",(req,res)=>
{
    res.render("login");
})
app.post("/login", async(req,res)=>{
   
        const email=req.body.email;
        const password=req.body.password;

       const suseremail = await Student.findOne({email:email});
      
       if(suseremail!=null)
       {
       if(suseremail.password == password){
      //  res.send(suseremail);
           //res.status(201).render("studenthomepage");
          // res.sendFile(path.join(__dirname, 'views/studenthomepage.html'));
          studentdetails=new Array(suseremail);
          const tests=await Test.find({});          
           res.render("studenthomepage",{studentails:suseremail,testList:tests});
       }}
       else
       {
        const tuseremail = await Teacher.findOne({email:email});
       const students=await Student.find({});
       const tests=await Test.find({});
        if(tuseremail.password == password)
        {
         //  res.send(tuseremail);
         //res.status(201).render("teacherhome");
         //res.sendFile(path.join(__dirname, 'views/teacherhome.html'));
         teacherdetails= new Array(tuseremail);
    //console.log(teacherdetails);
    res.render("teacherhome",{teachertails:tuseremail,studentdetails:students,testList:tests});
    
        }
       }
})

app.get("/studenthomepage",async(req,res)=> {
   // res.render("studenthomepage");
   const name1=req.body.name1;
   const uname= await Student.findOne({name:name1})
    Test.find({},function(err,tests)
    {
        res.render("studenthomepage",{testList:tests,studentdetails:uname});
    })
 });
  app.post("/studenthomepage",async(req,res)=>
 {
    const name=req.body.name1;
     const uname= await Student.findOne({name:name});
     //res.send(uname);
     //console.log(uname); 
        // res.sendFile(path.join(__dirname, 'views/studentprofile.html'));
       
  res.render("studenthomepage",{studentdetails:uname});

 });
// });
app.get("/studentprofile",(req,res)=>
{
    res.render("studentprofile");
});
app.post("/studentprofile",async(req,res)=>
{
    try{
const name1=req.body.name1;
 //console.log(name1);
    const uname= await Student.findOne({name:name1});
    {
    studentdetails= new Array(uname);
   // console.log(teacherdetails);
    res.render("studentprofile",{studentails:uname});
   // console.log(uname);
         
    }}
        catch(error)
        {
            console.log(error);
            res.status(500).json({error:err});
        }
   
   // res.sendFile(path.join(__dirname, 'views/teacherprofile.html'));
  
  
});

app.get("/test",(req,res)=>
{
    res.render("test");
});
app.post("/test", async(req,res)=>{
    const testDetails = new Test ({
        testname:req.body.testname,
        topicName:req.body.topicName,
        description:req.body.description,
        numberOfQuestions:req.body.numberOfQuestions,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        
})
    const registered=await testDetails.save();
    //res.sendFile(path.join(__dirname, 'views/question.html'));
    testinfo = new Array(registered);
    res.render("question", {testinfo:testinfo});
  //  res.sendFile(path.join(__dirname, 'views/studenthomepage.html'));
});
app.get("/question",(req,res)=>
{
    res.render("question");
});

app.post("/question", async(req,res)=>{
    try {

        const tests = await Test.find({});
        const students = await Student.find({});
        

        const questionDetails = new QuestionsSchema({
            testId: req.body.testId,
            questiontext: req.body.questiontext,
            marks: req.body.marks,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            correctoption: req.body.correctoption

        })

        const registered = await questionDetails.save();
        const numberOfQuestions = req.body.numberOfQuestions;
        var query = QuestionsSchema.findOne({ testId: req.body.testId });
        query.count(function (err, count) {
            if (err) console.log(err)
            else {
                //console.log(numberOfQuestions);
                console.log("Count is", count)
                if (count == numberOfQuestions) 
                    { res.render("teacherhome", { testList: tests, studentdetails: students }); }
                else 
                    { res.render("question") }
            }
        });


        //  res.render("question");

    }
    catch (error) {
        console.log(error);
        //res.status(500).json({error:err});
    }
         
            
});
app.post("/teacherhome",async(req,res)=>
{
    
    //res.send(uname);
    //console.log(uname); 
       // res.sendFile(path.join(__dirname, 'views/studentprofile.html'));
      
 res.render("teacherhome");
 
    

    
});
app.get("/searchstudent",async(req,res)=>
{
    
    res.render("teacherhome");
});
app.post("/searchstudent",async(req,res)=>
{
    const name1=req.body.name1;
    const uname= await Student.findOne({name:name1});
    {
     studentdetails= new Array(uname);
   // console.log(teacherdetails);
    res.render("studentprofile",{studentdetails:studentdetails});
    }
     
  
});


app.get("/viewprofile",(req,res)=>
{
    res.render("teacherhome");
});
app.post("/viewprofile",async(req,res)=>
{
    try{
const name1=req.body.name1;
 //console.log(name1);
    const uname= await Teacher.findOne({name:name1});
    {
     teacherdetails= new Array(uname);
   // console.log(teacherdetails);
    res.render("teacherprofile",{teachertails:uname});
   // console.log(uname);
         
    }}
        catch(error)
        {
            console.log(error);
            res.status(500).json({error:err});
        }
   
   // res.sendFile(path.join(__dirname, 'views/teacherprofile.html'));
  
  
});
 app.get("/teacherupdate",async(req,res)=>
 {
    
    res.render("teacherprofile");

  });
  app.post("/teacherupdate",async(req,res)=>
  {
 
      try{
  const _id=req.body._id;
   //console.log(name1);
      //const uname= await Teacher.findOne({_id:_id});
      const result=await Teacher.findByIdAndUpdate(_id,
              { name:req.body.name1,
             subject:req.body.subject,
                email:req.body.eamil,
               gender:req.body.gender,
             contact:req.body.contact,
         password:req.body.password,
              confirmpassword:req.body.confirmpassword},
            function (err, docs) {
              if (err){
                console.log(err)
                }
                 else{
                     
             
                   // alert("Updated details");
                       console.log("Updated User : ", docs);
                     //  res.redirect("/teacherhome",{teacherdetails:result});
                     res.redirect("/login");
                     
                    }
             })
           
      }
          catch(error)
          {
              console.log(error);
              res.status(500).json({error:err});
          }
     
     // res.sendFile(path.join(__dirname, 'views/teacherprofile.html'));
    
    
  });
  app.get("/studentupdate",async(req,res)=>
  {
     
     res.render("studentprofile");
 
   });
   app.post("/studentupdate",async(req,res)=>
   {
       try{
   const _id=req.body._id;
    //console.log(name1);
       //const uname= await Teacher.findOne({_id:_id});
       const result=await Student.findByIdAndUpdate(_id,
               { name:req.body.name1,
              subject:req.body.subject,
                 email:req.body.eamil,
                gender:req.body.gender,
              contact:req.body.contact,
          password:req.body.password,
               confirmpassword:req.body.confirmpassword},
             function (err, docs) {
               if (err){
                 console.log(err)
                 }
                  else{
                    // alert("Updated details");
                        console.log("Updated User : ", docs);
                        res.redirect("/studenthomepage");
                      
                     }
              })
            
       }
           catch(error)
           {
               console.log(error);
               res.status(500).json({error:err});
           }
      
      // res.sendFile(path.join(__dirname, 'views/teacherprofile.html'));
     
     
   });
   app.get("/about",async(req,res)=>
   {
       res.render("about");
   });
   app.post("/about",async(req,res)=>
   {
        res.render("about");
   });
   app.get("/contact",async(req,res)=>
   {
       res.render("contact");
   });
   app.post("/contact",async(req,res)=>
   {
        res.render("contact");
   });
   app.get("/index",async(req,res)=>
   {
       res.render("index");
   });
   app.post("/index",async(req,res)=>
   {
        res.render("index");
   });
   app.get("/start",async(req,res)=>
   {
       res.render("test");
   });
   app.post("/start",async(req,res)=>
   {
        res.render("test");
   });

app.listen(port, () =>{
    console.log('server is running at port no ${port}');
    
});
