const express=require('express');
var cors=require('cors');
const userRoute=require('./routes/user');
const loginRoute=require('./routes/login');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/login',loginRoute);

//const server =http.createServer(app);
//server.listen(process.env.PORT);
port=process.env.port || 8080
app.listen(port,function(){
    console.log('sucess');
});

module.exports =app;
