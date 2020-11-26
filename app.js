const mysql = require('mysql');
const express = require("express")
const app = express()
const cors = require('cors');

const dbConfig = require("./db.config.js");

//cors enable
app.options('*', cors());
app.use(cors({ origin: 'http://localhost:5000' }));

// Get post body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
let con =  null;
if (process.env.NODE_ENV === 'production') {
    con = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
} else {
    con = mysql.createConnection({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    });
}
// Ping the database
con.connect((err) => {
    if (err) throw err;
    else {
        console.log("connected");
    }
})
global.con = con;

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

// PORT
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

