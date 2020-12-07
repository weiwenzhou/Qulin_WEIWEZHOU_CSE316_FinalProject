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
app.post("/employee", (req, res) => {
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
    })
})

//test collection
app.post("/testcollection", (req, res) => {
    // let sql = `INSERT INTO employeetest 
    //         (testBarcode, employeeID, collectionTime, collectedBy)
    //     SELECT * FROM 
    //         (SELECT '${req.body.testBarcode}', '${req.body.employeeID}', CURDATE(), '${req.body.labID}') as tmpa  
    //         WHERE NOT EXISTS (
    //             SELECT testBarcode FROM employeetest WHERE testBarcode ='${req.body.testBarcode}') as tmpb LIMIT 1`;
    let sql = `INSERT IGNORE INTO employeetest (testBarcode, employeeID, collectionTime, collectedBy)
        VALUES ('${req.body.testBarcode}', '${req.body.employeeID}', CURDATE(), '${req.body.labID}')`;            
    con.query(sql, function(err, result) {
        if (err) throw err;
        let sql = `SELECT employeeID, testBarCode FROM employeetest`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    })
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
})
app.get("/testcollection", (req, res) => { 
    let sql = `SELECT employeeID, testBarCode FROM employeetest`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

//pool mapping
function strSplit(str) {
    return str.split(",");
}
app.post("/poolmapping", (req, res) => {
    let sql = `REPLACE INTO pool (poolBarcode)
        VALUES ('${req.body.poolBarcode}')`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        let str = req.body.testBarcode;
        let arr = strSplit(str);
        arr.forEach(function (element) {
            let sql = `REPLACE INTO poolMap(poolBarcode, testBarcode) 
            VALUES ('${req.body.poolBarcode}', '${element}')`;
            con.query(sql, function(err, result) {
                if (err) throw err;
            })
        });
        sql = `SELECT * FROM poolmap`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            res.send(result);
        })
    })
})
app.delete("/poolmapping", (req, res) => {
    let sql = `DELETE FROM poolMap 
        WHERE poolBarcode = '${req.body.poolBarcode}'`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        let sql = `DELETE FROM pool 
        WHERE poolBarcode = '${req.body.poolBarcode}'`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            let sql = `SELECT * FROM poolMap`;
            con.query(sql, function(err, result) {
                if (err) throw err;
                res.send(result);
            })
        })
    })
})
app.get("/poolmapping", (req, res) => {
    let sql = `SELECT * FROM poolMap`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    })

})

//well testing
app.delete("/welltesting", (req, res) => {
    let sql = `DELETE FROM welltesting 
        WHERE wellBarcode = '${req.body.wellBarcode}';`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        let sql = `DELETE FROM well 
            WHERE wellBarcode = '${req.body.wellBarcode}';`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            let sql = `SELECT wellBarcode, poolBarcode, result FROM welltesting`;
            con.query(sql, function(err, result) {
                if (err) throw err;
                res.send(result);
            })
        })
    })
})
app.get("/welltesting", (req, res) => {
    let sql = `SELECT wellBarcode, poolBarcode, result FROM welltesting`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})
app.post("/welltesting", (req, res) => {
    let sql = `REPLACE INTO well(wellBarcode)
        VALUES ('${req.body.poolBarcode}')`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        sql = `REPLACE INTO welltesting (poolBarcode, wellBarcode, testingStartTime, testingEndTime, result)
            VALUES ('${req.body.poolBarcode}', '${req.body.wellBarcode}', CURDATE(), CURDATE(), ' ${req.body.result}')`;
        con.query(sql, function(err, result) {
            if (err) throw err;
            let sql = `SELECT wellBarcode, poolBarcode, result FROM welltesting`;
            con.query(sql, function(err, result) {
                if (err) throw err;
                res.send(result);
            })
        })
    }) 
})

//employee results page
app.get("/employee_results", (req, res) => {
    let sql =  `SELECT employeetest.collectionTime, welltesting.result 
        FROM welltesting
        INNER JOIN (
            SELECT employeetest.employeeID, employeetest.collectionTime, employeetest.testBarcode, poolmap.poolBarcode
            FROM employeetest
            INNER JOIN poolmap 
                ON (employeetest.testbarcode = poolmap.testbarcode AND employeetest.employeeID = ${req.body.employeeID})) as fst
        ON poolmap.poolBarcode = welltesting.poolBarcode`;
    con.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    })
})

module.exports = app;