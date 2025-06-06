const express = require('express')
const app = express()
app.get('/', function (req, res)  {
    let laquery=req.query.autore;
    res.send('Ecco la lista dei libri per la ricerca:' +laquery);
});

app.post('/books', function (req, res) {
    const book = req.body; // Assuming body-parser middleware is used
    res.status(200).send('Book created successfully!');
});
app.listen(3000);