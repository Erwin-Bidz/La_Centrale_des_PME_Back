const express = require('express')

const app = express()
const port = 8080

app.get('/', (req,res) => res.send('Hello some SME CITY!'))

app.get('/api/smes/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    res.send(`Hello, Small and Medium Sized Enterprise No${id} : ${name}`)
})

app.listen(port, () => console.log('Application lancée sur : http://localhost:'+port))