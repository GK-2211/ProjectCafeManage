const express=require('express');
var cors=require('cors');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//const server =http.createServer(app);
//server.listen(process.env.PORT);
port=process.env.port || 3001
app.listen(port,function(){
    console.log('sucess');
});

module.exports =app;
