let costi = [16,25,350,200]
let metodiPag = ["contanti","carta","bonifico"]
function Totale()
{
   let q1 = document.getElementById("Q1").value;
   let totQ1 = q1 * costi[0];
   document.getElementById("tot1").innerHTML = totQ1;
   let q2 = document.getElementById("Q2").value;
   let totQ2 = q2 * costi[1];
   document.getElementById("tot2").innerHTML = totQ2;
   let q3 = document.getElementById("Q3").value;
   let totQ3 = q3 * costi[2];
   document.getElementById("tot3").innerHTML = totQ3;
   let q4 = document.getElementById("Q4").value;
   let totQ4 = q4 * costi[3];
   document.getElementById("tot4").innerHTML = totQ4;
   let tot = totQ1 + totQ2 + totQ3 + totQ4;
   document.getElementById("totFin").innerHTML = tot;
}

function inviaOrdine()
{
    setCookie("metodoPagamento",document.getElementById("combo1").value,1);
    setCookie("totale",document.getElementById("totFin").innerHTML,1);
    setCookie("email",document.getElementById("txtEmail").value,1);
    if(document.getElementById("radio1").checked)
    {
        setCookie("notifiche","Si",1);
    }
    else
    {
        setCookie("notifiche","No",1);
    }
    window.location.href = "riepilogo.html";
}

function Riepilogo()
{
    let tot = getCookie("totale");
    let metodoPagamento = getCookie("metodoPagamento");
    let email = getCookie("email");
    let notifiche = getCookie("notifiche");
    let s = "";
    s += "Buongiorno il suo ordine di: "+ tot + "$ <br> pagato con : "+ metodoPagamento ;
    s+= "<br> è stato inviato all'email: " + email + "<br> riceverà notifiche: " + notifiche;
    document.getElementById("ciao2").innerHTML = s;
}
function setCookie(nome, valore, giorni){
    let data = new Date();
    data.setTime(data.getTime() + (giorni * 24 * 60 * 60 * 1000));
    document.cookie = nome + "=" + encodeURIComponent(valore) + ";expires=" + data.toUTCString() + ";path=/";
}

function getCookie(nome){
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++){
        let c = cookies[i].trim();
        if(c.startsWith(nome+"=")){
            return decodeURIComponent(c.substring(nome.length+1))
        }
    }
    return "";
}



function riempi()
{
    let menu = document.getElementById("combo1")
    let s ="";
    for(let i=0;i<metodiPag.length;i++)
    {
        s+= "<option>"+metodiPag[i]+"</option>";
    }
    menu.innerHTML = s;
}

riempi();