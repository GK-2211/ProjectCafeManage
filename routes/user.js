const { query } = require('express');
const express=require('express');
const connection=require('../connection');
const router=express.Router();

router.post('./signup',(req,res)=>{
    let user=req.body;
    query="select email,password,role,status from user where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0){
                query="insert into user(name,contactno,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contactno,user.email,user.password],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message: "successfully Registered"});
                    }
                    else{
                        return res.status(500).json(err);
                    }
                })
            }
            else{
                return res.status(400).json({message: "Email is Allready Exists."});
            }
        }
        else{
            return res.status(500).json(err);
        }
    });
})


router.post('./login',(req,res)=>{
    const user=req.body;
    query="select email,password,role,status from user where email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length <=0 || results[0].password !=user.password){
                return res.status(401).json({message:"incorrect username or password"});
            }
            else if(results[0].status === 'false'){
                return res.status.apply(401).json({message:"wait for Admin  Approval"});
            }
            else if(results[0].password == user.password){

            }
            else{
                return res.status(400).json({message:"something went wrong.please try again."});
            }
        }
        else{
            return res.status(500).json(err);
        }
    })
})
module.exports= router;