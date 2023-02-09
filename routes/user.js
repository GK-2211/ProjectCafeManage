const { query } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();

router.post('/signup', (req, res) => {
    const { name, contactno, email, password, status, role } = req.body;
    //let user=req.body;

    var query = "select email,password,role,status from user where email=?";
    connection.query(query, [email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                var query = "insert into user(name,contactno,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query, [name, contactno, email, password, status, role], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "successfully Registered" });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ message: "Email is Allready Exists." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    });
})
module.exports = router;