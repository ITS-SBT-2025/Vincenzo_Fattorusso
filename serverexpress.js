/*const express = require('express')
const app = express()
app.get('/', function (req, res)  {
    let laquery=req.query.autore;
    res.send('Ecco la lista dei libri per la ricerca:' +laquery);
});

app.post('/books', function (req, res) {
    const book = req.body; // Assuming body-parser middleware is used
    res.status(200).send('Book created successfully!');
});
app.listen(3000);*/

const express = require('express'); // Importa il modulo express
const app = express(); // Crea un'applicazione express

// Rotta GET su /books
app.get('/books', (req, res) => {
    let author = req.query.q;      // Prende il parametro 'q' dalla query string (?q=...)
    let titolo = req.query.title;  // Prende il parametro 'title' dalla query string (?title=...)

    let parametri_di_ricerca = []; // Array per costruire le condizioni della query
    
    let dbQuery = "select author, title from books"; // Query base

    // Se è stato passato un autore, aggiunge la condizione alla query
    if (author) {
        parametri_di_ricerca.push('author like %' + author + '%');
    }
    // Se è stato passato un titolo, aggiunge la condizione alla query
    if (titolo) {
        parametri_di_ricerca.push('title like %' + titolo + '%');
    }

    let queryFinale = dbQuery; // Inizializza la query finale
    // Se ci sono condizioni, le aggiunge alla query
    if( parametri_di_ricerca.length > 0) {
        queryFinale += ' where ';
        queryFinale += parametri_di_ricerca.join(' and ');
    }

    // Risponde al client con la query costruita
    res.status(200).send(`Query eseguita: ${queryFinale}`);
});

// Rotta POST su /book/insert
app.post('/book/insert', (req, res) => {
    // Risponde con un messaggio di successo (non salva davvero il libro)
    res.status(200).send('Book inserted successfully');
});

// Avvia il server sulla porta 3000
app.listen(3000)
