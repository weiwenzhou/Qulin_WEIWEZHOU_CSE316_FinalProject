const express = require("express")
const app = express()

// Backend routes
const routes = require('./routes/routes.js');
app.use('/api', routes)

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