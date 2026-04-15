let mesi = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];

function riempiMesi(){
    let s ="";
    for (let i=0;i<mesi.length;i++){
        s += "<option>" + mesi[i]+ "</option>";
    }
    document.getElementById("comboMese").innerHTML=s;
}

function elaboraDati(){
    let punteggio =0;
    let nome = document.getElementById("textNome").value;
    let cognome = document.getElementById("textCognome").value;


    if(document.getElementById("testRsposta1").value == "SQL")  punteggio ++;    
    
    
}

riempiMesi();