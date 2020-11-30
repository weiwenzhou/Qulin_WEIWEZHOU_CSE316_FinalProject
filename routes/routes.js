const express = require("express");
const app = express.Router();
// var labID;
// var empEmail;

//lab tech login page
app.post("/labtech", (req, res) => { 
    // let query = url.parse(req.url, true).query;
    console.log(req.body);
    let sql = `SELECT * FROM labemployee WHERE labID = '${req.body.id}' AND password = '${req.body.password}'`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
            // labID = req.body.labID;
        }
    })
})

//employee login page
app.get("/employee", (req, res) => {
    // res.send("temp to be deleted");
    let sql = `SELECT * FROM employee WHERE email = '${req.body.email}' AND password ='${req.body.password}'`;
    // empEmail = req.body.email;
    con.query(sql, function(err, result) {
        if (err) throw err;
        if (result.length === 0) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
        }
        // res.close()
    })
})

//test collection
app.post("/testcollection", (req, res) => {
    let sql = `INSERT INTO employeetest 
            (testBarcode, employeeID, collectionTime, collectedBy)
        SELECT * FROM 
            (SELECT '${req.body.testBarcode}', '${req.body.employeeID}', CURDATE(), '${req.body.labID}')  
            WHERE NOT EXISTS (
                SELECT testBarcode FROM employeetest WHERE testBarcode ='${req.body.testBarcode}') LIMIT 1`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        let sql = `SELECT employeeID, testBarCode FROM employeetest`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    })
    // res.close();
})
app.delete("/testcollection", (req, res) => {
    let sql = `DELETE FROM employeetest 
           WHERE testBarcode ='${req.body.testBarcode}'LIMIT 1`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        let sql = `SELECT employeeID, testBarCode FROM employeetest`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    })
    // res.close();
})

//pool mapping
app.get("/poolmapping", (req, res) => {
    
})

//well testing
app.get("/welltesting", (req, res) => {
    
})

//employee results page
app.get("/employee_results", (req, res) => {
    let sql = `SELECT `;
})

module.exports = app;