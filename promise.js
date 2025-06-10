function fintaRichiestaServer(parametro) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (parametro === "ok") {
                resolve("Risposta dal server!");
            } else {
                reject("Errore dal server!");
            }
        }, 2000); // 2 secondi
    });
}

// Esempio di utilizzo:
fintaRichiestaServer("ok")
    .then(risposta => {
        console.log("Successo:", risposta);
    })
    .catch(errore => {
        console.log("Fallimento:", errore);
    });
