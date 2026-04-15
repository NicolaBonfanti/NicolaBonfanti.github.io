let mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];

// Vettore con le risposte corrette
// [RISP1, RISP2_2, RISP3_1, RISP4_1 e RISP4_3, RISP5]
let risposteCorrette = [
    "SQL",              // Domanda 1 (text, in maiuscolo)
    "2",                // Domanda 2 (select)
    "Statiche",         // Domanda 3 (radio)
    ["void", "char"],   // Domanda 4 (checkbox)
    "BYTE"              // Domanda 5 (text)
];

function riempiMesi() {
    let s = "";
    for (let i = 0; i < mesi.length; i++) {
        s += "<option>" + mesi[i] + "</option>";
    }
    document.getElementById("comboMese").innerHTML = s;
}

// Validazione dei campi obbligatori
function validaDati() {
    let cognome = document.getElementById("textCognome").value.trim();
    let nome = document.getElementById("textNome").value.trim();
    let giorno = document.getElementById("textGiorno").value.trim();
    let anno = document.getElementById("textAnno").value.trim();

    if (cognome === "") {
        alert("Il campo Cognome è obbligatorio!");
        return false;
    }
    if (nome === "") {
        alert("Il campo Nome è obbligatorio!");
        return false;
    }

    // Cognome e Nome devono essere maiuscoli
    if (cognome !== cognome.toUpperCase()) {
        alert("Il Cognome deve essere in maiuscolo!");
        return false;
    }
    if (nome !== nome.toUpperCase()) {
        alert("Il Nome deve essere in maiuscolo!");
        return false;
    }

    // Data di nascita obbligatoria
    if (giorno === "" || anno === "") {
        alert("La Data di nascita è obbligatoria!");
        return false;
    }

    // Validazione data GG/MM/AA
    let gg = parseInt(giorno, 10);
    let mm = document.getElementById("comboMese").selectedIndex + 1;
    let aa = parseInt(anno, 10);

    if (isNaN(gg) || isNaN(aa)) {
        alert("La data non è valida!");
        return false;
    }
    if (gg < 1 || gg > 31) {
        alert("Giorno non valido!");
        return false;
    }
    if (anno.length !== 2 || aa < 0 || aa > 99) {
        alert("Anno non valido (deve essere di 2 cifre)!");
        return false;
    }

    // Controllo giorni massimi per mese
    let giorniMese = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let annoCompleto = (aa <= 30) ? 2000 + aa : 1900 + aa;
    if ((annoCompleto % 4 === 0 && annoCompleto % 100 !== 0) || annoCompleto % 400 === 0) {
        giorniMese[1] = 29;
    }
    if (gg > giorniMese[mm - 1]) {
        alert("Giorno non valido per il mese selezionato!");
        return false;
    }

    return true;
}

// Calcolo del punteggio (restituisce il numero di risposte esatte)
function calcolaPunteggio() {
    let punti = 0;

    // Domanda 1 (text)
    let d1 = document.getElementById("textRisposta1").value.trim().toUpperCase();
    if (d1 === risposteCorrette[0]) {
        punti++;
    }

    // Domanda 2 (select)
    let d2 = document.getElementById("comboRisposta2").value;
    if (d2 === risposteCorrette[1]) {
        punti++;
    }

    // Domanda 3 (radio)
    let d3 = "";
    if (document.getElementById("radioRisposta3_1").checked) d3 = "Statiche";
    else if (document.getElementById("radioRisposta3_2").checked) d3 = "Dinamiche";
    if (d3 === risposteCorrette[2]) {
        punti++;
    }

    // Domanda 4 (checkbox) - deve selezionare esattamente void e char
    let c1 = document.getElementById("checkRisposta4_1").checked;
    let c2 = document.getElementById("checkRisposta4_2").checked;
    let c3 = document.getElementById("checkRisposta4_3").checked;
    if (c1 && !c2 && c3) {
        punti++;
    }

    // Domanda 5 (text)
    let d5 = document.getElementById("textRisposta5").value.trim().toUpperCase();
    if (d5 === risposteCorrette[4]) {
        punti++;
    }

    return punti;
}

// Bottone Elabora: 1 punto per risposta esatta
function elaboraDati() {
    if (!validaDati()) {
        return;
    }
    let punti = calcolaPunteggio();
    document.getElementById("textPunteggio").value = punti + " / 5";
}

// Bottone Cancella: pulisce la videata
function cancellaDati() {
    document.getElementById("quizForm").reset();
    document.getElementById("textPunteggio").value = "";
    document.getElementById("textCodice").value = "";
}

// Bottone Utente con punteggio: 10 punti per risposta esatta + codice
function utenteConPunteggio() {
    if (!validaDati()) {
        return;
    }

    let cognome = document.getElementById("textCognome").value.trim();
    let nome = document.getElementById("textNome").value.trim();
    let meseSelezionato = document.getElementById("comboMese").value; // gen, feb, ...
    let anno = document.getElementById("textAnno").value.trim();

    // Costruzione codice: 3 car. cognome + 3 car. nome + 3 car. mese + 2 car. anno
    let codCognome = cognome.substring(0, 3);
    let codNome = nome.substring(0, 3);
    let codMese = meseSelezionato.substring(0, 3).toUpperCase();
    let codAnno = anno.substring(0, 2);

    // Padding con X se cognome o nome sono troppo corti
    while (codCognome.length < 3) codCognome += "X";
    while (codNome.length < 3) codNome += "X";

    let codice = codCognome + codNome + codMese + codAnno;
    let punti = calcolaPunteggio() * 10;

    document.getElementById("textCodice").value = "Codice: " + codice + " - Punti: " + punti;
}

// Eliminazione del vecchio file quiz.html monolitico (se presente)
riempiMesi();
