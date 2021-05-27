const express=require('express');
const dataService=require('./Services/dataservice')
const app=express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(401).send("This is a Get method")

});
app.post('/',(req,res)=>{
    res.send("this is a post method")

});
app.post('/register',(req,res)=>{

    const result=dataService.register(req.body.uname,req.body.acno,req.body.pswd);;
    res.status(result.statusCode).json(result)
    
});
app.post('/login',(req,res)=>{

    const result=dataService.login(req.body.acno,req.body.pswd);;
    res.status(result.statusCode).json(result)
});
app.post('/deposit',(req,res)=>{
    console.log(req.body);

    const result=dataService.deposit(req.body.acno,req.body.pswd,req.body.amount);
    res.status(result.statusCode).json(result)
});
app.post('/withdraw',(req,res)=>{
    console.log(req.body);

    const result=dataService.withdraw(req.body.acno,req.body.pswd,req.body.amount);
    res.status(result.statusCode).json(result)
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

