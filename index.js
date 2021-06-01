const express=require('express');
const session=require('express-session');
const dataService=require('./Services/dataservice')
const app=express();
app.use(session({
    secret:'randomsecurestring',
    resave:false,
    saveUninitialized:false
}))
app.use(express.json());
app.use((req,res,next)=>{
console.log("Middleware");

    next();


})
const logMiddleware=(req,res,next)=>{
    console.log(req.body);
    next()
   
}
app.use(logMiddleware);

const authMiddleware=(req,res,next)=>{
  if (!req.session.currentUser) {
    return res.json( {
      statusCode: 401,
      status: false,
      message: "Please Log in"
    })
  } 
  else{
      next();
  } 
}
app.get('/',(req,res)=>{
    res.status(401).send("This is a Get method")

});
app.post('/',(req,res)=>{
    res.send("this is a post method")

});
app.post('/register',(req,res)=>{

    dataService.register(req.body.uname,req.body.acno,req.body.pswd)
    .then(result=>{
        res.status(result.statusCode).json(result)
   
    })
    
});
app.post('/login',(req,res)=>{


    dataService.login(req,req.body.acno,req.body.pswd)
    .then(result=>{

    res.status(result.statusCode).json(result)
    })
});




app.post('/deposit',authMiddleware,(req,res)=>{
    console.log(req.session.currentUser);

  dataService.deposit(req.body.acno,req.body.pswd,req.body.amount)
  .then(result=>{
    res.status(result.statusCode).json(result)
  })
   
});






app.post('/withdraw',authMiddleware,(req,res)=>{

    dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount)
    .then(result=>{
        res.status(result.statusCode).json(result)
 
    })
});

app.put('/',(req,res)=>{
    res.send("this is a put method")

})
app.patch('/',(req,res)=>{
    res.send("this is a patch method")

});
app.delete('/',(req,res)=>{
    res.send("this is a delete method")

});
app.listen(3000,()=>{
    console.log("Server Started at port:3000");

});