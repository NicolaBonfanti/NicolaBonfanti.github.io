// Array globale degli studenti
const studenti = [];

/**
 * Legge i campi, valida, crea l'oggetto studente,
 * lo aggiunge all'array e aggiorna la tabella.
 */
function aggiungiStudente() {
  const nome    = document.getElementById("inputNome").value.trim();
  const cognome = document.getElementById("inputCognome").value.trim();
  const eta     = document.getElementById("inputEta").value.trim();

  // Validazione: tutti i campi devono essere compilati
  if (!nome || !cognome || !eta) {
    document.getElementById("alert-msg").style.display = "block";
    return;
  }

  document.getElementById("alert-msg").style.display = "none";

  // Creazione oggetto studente
  const studente = {
    nome:    nome,
    cognome: cognome,
    eta:     parseInt(eta)
  };

  // Inserimento nell'array
  studenti.push(studente);

  // Aggiornamento tabella
  mostraStudenti();

  // Svuotamento campi
  document.getElementById("inputNome").value    = "";
  document.getElementById("inputCognome").value = "";
  document.getElementById("inputEta").value     = "";
  document.getElementById("inputNome").focus();
}

/**
 * Svuota il corpo della tabella e la rigenera
 * scorrendo l'array studenti.
 */
function mostraStudenti() {
  const tbody = document.getElementById("tabellaBody");
  tbody.innerHTML = ""; // Svuota il corpo

  studenti.forEach(function(studente, indice) {
    const riga = document.createElement("tr");

    riga.innerHTML = `
      <td>${studente.nome}</td>
      <td>${studente.cognome}</td>
      <td>${studente.eta}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="eliminaStudente(${indice})">
          Elimina
        </button>
      </td>
    `;

    tbody.appendChild(riga);
  });

  // Aggiorna il contatore
  const contatore = document.getElementById("contatore");
  if (studenti.length === 0) {
    contatore.textContent = "Nessuno studente inserito.";
  } else {
    contatore.textContent = `Studenti in elenco: ${studenti.length}`;
  }
}

/**
 * Rimuove dall'array lo studente all'indice ricevuto
 * e richiama mostraStudenti() per aggiornare la tabella.
 * @param {number} indice - posizione dello studente nell'array
 */
function eliminaStudente(indice) {
  studenti.splice(indice, 1);
  mostraStudenti();
}

// Permette di aggiungere premendo Invio su qualsiasi campo
document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    aggiungiStudente();
  }
});