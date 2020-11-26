const mysql = require('mysql');
const express = require("express");
const app = express();
const cors = require('cors');

const dbConfig = require("./db.config.js");
const routes = require("./routes/routes")

//cors enable
app.options('*', cors());
app.use(cors({ origin: 'http://localhost:8000' }));

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

// API routes
app.use("/api", routes);

// PORT
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
