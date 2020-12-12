const mysql = require('mysql');
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');

const routes = require("./routes/routes")

//cors enable
// app.options('*', cors());
// app.use(cors({ origin: 'http://localhost:8000' }));
app.use(cors());

// Get post body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
let con =  null;
if (process.env.NODE_ENV === 'production') {
    con = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
} else {
    const dbConfig = require("./db.config.js");
    con = mysql.createPool({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB
    });
}
// Ping the database
// con.connect((err) => {
//     if (err) throw err;
//     else {
//         console.log("connected");
//     }
// })
global.con = con;

// connection with client setup
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile('index.html', {root: path.join(__dirname, 'client/build')});
    })
} else {
    app.get('/', (req, res) => {
        res.send("Welcome to index. More to come.")
    })
}

// API routes
app.use("/api", routes);

// PORT
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
