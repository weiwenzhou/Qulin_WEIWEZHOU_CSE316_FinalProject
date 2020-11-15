const express = require("express")
const app = express()

app.get('/', (req, res) => {
    res.send("Welcome to index. More to come.")
})

require('./routes/routes.js')(app)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})