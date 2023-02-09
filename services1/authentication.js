require('dotenv').config();
const jwt=require('jsonwebtoken');

function authenticateToken(req,res,next){
    const autherHeader=req.Headers['authorizatiuon']
    const token=authHeader && authHeader.split(' ')[1]
    if(token == null)
      return res.send.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN,(err,response)=>{
        if(err){
            return res.sendStatus(403);
        res.locals = response;
        next();
        }
    })
}

module.exports={ authenticateToken: authenticateToken }