const express = require('express')
const fs=require('fs');
const app = express()
const port = 5553
var path = require('path');
var compression = require('compression')

app.use(express.json());
app.use(compression())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', async (req, res) => {
    const filePath = path.resolve(path.join(__dirname, 'build', 'index.html'))
    fs.readFile(filePath, 'utf8', function (err, data) {
        res.send(data);
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))