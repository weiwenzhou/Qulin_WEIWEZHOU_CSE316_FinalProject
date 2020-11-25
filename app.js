var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "finalProj_db"
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

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})

app.get("/", (req, res) => {
    //login page
})

app.get("/labtech", (req, res) => {
    //lab tech login page
})

app.get("/employee", (req, res) => {
    //employee login page
})