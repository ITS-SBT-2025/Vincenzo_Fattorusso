const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use("/", express.static(path.join(__dirname, "/public"), { "extensions": ["html"] }));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev')); // Log delle richieste HTTP

app.use(miomw);
function miomw(req, res, next) {
  console.log("Middleware chiamato " + req.method + " " + req.url);
  if (req.method === "GET") {
    next();
  } else {
    res.status(403).send("Metodo non permesso");
  }
}

app.get('/', function (req, res) {
  console.log("cookie: " , req.cookies);
  res.send('Hello World')
});

// Rotta statica PRIMA delle dinamiche
app.get('/books/ciao', function (req, res) {
  res.send('Quest è Ciao');
});

app.get('/booksuuu', function (req, res) {
  res.send('Ecco la lista dei libri')
});

function cercaLibri(req, res) {
  let autore = req.params.autore || req.query.autore;
  let titolo = req.query.titolo;

  let parametri_di_ricerca = [];
  let dbquery = "select name,author from books";
  if (autore) {
    parametri_di_ricerca.push("author like '%" + autore + "%'");
  }
  if (titolo) {
    parametri_di_ricerca.push("title like '%" + titolo + "%'");
  }

  let queryfinale = dbquery;
  if (parametri_di_ricerca.length > 0) {
    queryfinale += " WHERE ";
    queryfinale += parametri_di_ricerca.join(" AND ");
  }

  res.send('Ecco la lista dei libri per la ricerca:' + queryfinale);
}

function getLibro(req, res) {
  if (req.params.idlibro) {
    res.send("Nome libro trovato:" + req.params.idlibro);
  } else {
    res.status(404);
    res.send("libro NON trovato");
  }
}

// Attenzione: solo una rotta dinamica per evitare conflitti
app.get('/books', cercaLibri);
app.get('/books/:autore', cercaLibri);
// app.get('/books/:idlibro', getLibro); // Commentata per evitare conflitto con :autore

app.post('/books', function (req, res) {
  let a = req.body.autore;
  let t = req.body.titolo;
  res.send('Ho creato il tuo libro: ' + t + " scritto da " + a);
});

app.listen(3000);