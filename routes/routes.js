module.exports = app => {
    
    // Lab tech Login Page
    app.get('/labtech', (req, res) => {
        res.send("Lab login page.")
    })

    // Employee Login Page
    app.get('/employee', (req, res) => {
        res.send("Employee login page.")
    })

    // Employee Home Page
    app.get('/employee/:userId', (req, res) => {
        res.send(`Showing homepage for employee ${req.params.userId}`)
    })

    // Test Collection Page
    app.get('/collection/:userId', (req, res) => {
        res.send(`Test Collection page for employee ${req.params.userId}`)
    })

    // Lab Home Page
    app.get('/lab/:userId', (req, res) => {
        res.send(`Lab Home page for employee ${req.params.userId}`)
    })

    // Pool Mapping Page
    app.get('/pool/:userId', (req, res) => {
        res.send(`Pool Mapping page for employee ${req.params.userId}`)
    })

    // Well Testing Page
    app.get('/well/:userId', (req, res) => {
        res.send(`Well Testing page for employee ${req.params.userId}`)
    })
}