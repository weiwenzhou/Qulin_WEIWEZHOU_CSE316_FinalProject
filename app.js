const express = require("express")
const app = express()

app.get('/', (req, res) => {
    res.send("Welcome to index. More to come.")
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})