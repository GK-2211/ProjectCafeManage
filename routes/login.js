const { query } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth= require('../services1/authentication');
var checkRole=require('../services1/checkRole');


router.post('/login', (req, res) => {
    //const {email,password}=req.body;
    const user = req.body;
    var query = "select email,password from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "incorrect username or password" });
            }
            else if (results[0].status === 'false') {
                return res.status.apply(401).json({ message: "wait for Admin  Approval" });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ message: "something went wrong.please try again." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/get',auth.authenticateToken,checkRole.checkRole,(req,res)=>{
    var query="selsect id,name,email,contactno,status from user where role='user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authenticateToken,(req,res)=>{
    let user=req.body;
    var query="update user set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"user does not exit."});
            }
            return res.status(200).json({message:"user upadate successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})

router.post('/changePassword',(req,res)=>{

})
module.exports = router;