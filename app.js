var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "finalProj_db"
});

const dbConfig = require("../config/db.config.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

const express = require("express")
const app = express()
const url = require('url');



// con.connect((err) => {
//     if (err) throw err;
//     else {
//         console.log("connected");
//     }
// })

// // Backend routes
// require('./routes/routes.js')(app)
// // app.use(routes)

app.use(express.static('client/build'))
// connection with client setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("Welcome to index. More to come.")
    })
}

app.use(express.bodyParser());
app.use(express.methodOverride());

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

//lab tech login page
app.get("/labtech", (req, res) => { 
    // let query = url.parse(req.url, true).query;
    let sql = `SELECT * FROM registered 
        WHERE labID = ` + req.body.labId + ` 
        AND password =` + req.body.password;
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

