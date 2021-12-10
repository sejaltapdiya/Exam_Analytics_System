const express = require("express");
const { Mongoose, mongo } = require("mongoose");
const path=require("path");
const app =  express();



require("./db/conn");
const Student=require("./models/students");
const Teacher=require("./models/teachers");
const Test = require("./models/test")
const json=require("express");


const port = process.env.PORT || 3000;

//console.log(path.join(__dirname,"../public"));
const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


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
             res.sendFile(path.join(__dirname, 'views/login.html'));
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
             res.sendFile(path.join(__dirname, 'views/login.html'));
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
           //res.status(201).render("studenthomepage");
           res.sendFile(path.join(__dirname, 'views/studenthomepage.html'));
       }}
       else
       {
        const tuseremail = await Teacher.findOne({email:email});
        if(tuseremail.password == password)
        {
         //res.status(201).render("teacherhome");
         res.sendFile(path.join(__dirname, 'views/teacherhome.html'));
        }
       }
})
app.get("/test",(req,res)=>
{
    res.render("test");
})

app.get("/teacherhome",(req,res)=>
{
    res.render("teacherhome");
});
app.post("/teacherhome",async(req,res)=>
{
    const name=req.body.name;
    const uname= await Student.findOne({name:name});
    //res.send(uname);
    console.log(uname);
    res.sendFile(path.join(__dirname, 'views/studentprofile.html'));

    
});

app.get("/viewprofile",(req,res)=>
{
    res.render("teacherhome");
});
app.post("/viewprofile",async(req,res)=>
{
const name1=req.body.name1;
    const uname= await Teacher.findOne({name:name1});
    //res.send(uname);
    console.log(uname);
    res.sendFile(path.join(__dirname, 'views/teacherprofile.html'));
});

app.get("/viewprofile",(req,res)=>
{
    res.render("teacherhome");
});
app.post("/start",(req,res)=>
{
    res.sendFile(path.join(__dirname, 'views/createtest.html'));
});
app.listen(port, () =>{
    console.log('server is running at port no ${port}');
    
});
app.get("/testset")