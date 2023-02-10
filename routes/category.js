const { query } = require('express');
const express=require('express');
const connection=require('../connection');
const router=express.Router();
var auth=require('../services1/authentication');
var checkRole=require('../services1/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let category=req.body;
     var query="insert into category (name) values(?)";
    connection.query(query,[category.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"category Added sucessfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query="select * from category order by name";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product=req.body;
    var query="update category set name=? where id=?";
    connection.query(query,[product.name,product.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({mesage:"category id does not found."});
            }
            return res.status(200).json({message:"category updated successfully."});
        }
      else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;