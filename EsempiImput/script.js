document.addEventListener("DOMContentLoaded", function (){
    const hobbies = document.querySelectorAll(".hobby");
    const radios = document.getElementsByName("sesso")

    for(let i =0; i<hobbies.length; i++)
        hobbies[i].addEventListener("change", stampa);
    for(let i =0; i<radios.length; i++)
        radios[i].addEventListener("change", stampa);

    function stampa(){
        let selezionati = [];
        
        for(let i =0; i<hobbies.length; i++)
            if(hobbies[i].checked)  
                selezionati.push(hobbies[i].value);

        let sessoSelezionato = "";

        for(let i =0; i<radios.length; i++)
            if(radios[i].checked) 
                sessoSelezionato = radios[i].value;
        
        console.log("Hobbies: ", selezionati);
        console.log("Sesso: ", sessoSelezionato);

    }
});

let menu = document.getElementById("menu");
let annoCorrente = new Date().getFullYear();

function stampaSelezionato(){
    let selezionato = menu.value;
    console.log(selezionato);
    let testo = menu.options[menu.selectedIndex].text;
    console.log(testo);
}

function riempiConAnni(){
    let html = "";
    for(let i=1900; i<= annoCorrente;i++)
        html += "<option value=" +i+ ">" + i + "</option>";
    menu.innerHTML = html;
}

let txt1 = document.getElementById("textBox1");
function stampaTextBox(){
    console.log(txt1.value);
}