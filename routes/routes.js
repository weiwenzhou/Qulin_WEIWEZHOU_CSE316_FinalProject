const express = require("express");
const app = express.Router();

//lab tech login page
app.get("/labtech", (req, res) => { 
    // let query = url.parse(req.url, true).query;
    let sql = `SELECT * FROM registered WHERE labID = ${req.body.id} AND password = ${req.body.password}`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
        }
        res.close()
    })
})

//employee login page
app.get("/employee", (req, res) => {
    res.send("temp to be deleted");
})

//lab home
app.get("/labhome", (req, res) => {
    
})

//test collection
app.get("/testcollection", (req, res) => {
    
})

//pool mapping
app.get("/poolmapping", (req, res) => {
    
})

//well testing
app.get("/welltesting", (req, res) => {
    
})

//employee results page
app.get("/employee_results", (req, res) => {
    
})

module.exports = app;