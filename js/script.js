function priceCalc(km, range) {
  //calcolare prezzo base biglietto: km * costante 0,21
  const basePrice = km * prezzoPerKm;

  //inizzializzo la variabile sconto
  let discount = 0;

  //SE eta < 18
  // sconto = prezzo * percentuale u-18 / 100
  //ALTRIMENTI se eta > 65
  // sconto = prezzo * percentuale o-65 / 100
  if (range == "under18") {
    discount = (basePrice * discountPercentageU18) / 100;
  } else if (range == "over65") {
    discount = (basePrice * discountPercentageO65) / 100;
  }

  //calcolo il prezzo finale
  let finalPrice = basePrice - discount;
  //restituisco indietro il valore del prezzo finale
  return finalPrice.toFixed(2);
}

function generateHtml(info, price, age, start, end, code) {
  ticket.innerHTML = "";
  ticket.innerHTML += `
        <div class="card mb-3 mt-5 w-60 margin-0-auto" >
            <div class="row g-0">
                <div class="col-md-4">
                <img src="./img/image.png" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title"><b>Nome Possessore</b>: ${info}</h5>
                    <p class="card-text"><small class="text-body-secondary"><b>Eta del possessore</b>: ${age}</small></p>
                    <p class="card-text"><b>Prezzo biglietto</b>: ${price}&euro;</p>
                    <p><b>Partenza</b>: ${start} <b>Destinazione</b>: ${end}</p>
                    <p><b>Codice Biglietto</b>: ${code}</p>
                </div>
                </div>
            </div>
        </div>`;
}
//creationCode(info, price, age, start, destination)
//function che mi crea un codice "univoco" per il biglietto
function creationCode(i, p, a, s, d, km){
    //divido la stringa con nome e cognome in un array composto da due stringhe
    const nameSurname= i.split(" ");
    let app; //creo variabile di appoggio dove inserire il valore da mettere nel codice
    //se l'utente ha inserito solo un nome
    if(nameSurname.length < 2){
      app = nameSurname[0].charAt(0); //prendo il primo valore del nome
    }else{
      app = nameSurname[1].charAt(0); //prendo il primo valore del secondo 
    }
    //genero tramite una funzione un numero random che va dal minimo al massimo tra il valore di eta e di km da percorrere
    const randNum =  randomIntBetween(km, a);
    //concateno tutti i primi valori e il numero random
    const string = i[0].toUpperCase()+app.toUpperCase()+p[0]+a+s[0]+d[0]+randNum;
    //restituisco il codice generato
    return string;
}

function randomIntBetween(numOne, numTwo){
    const flagUno = isNaN(numOne);
    const flagDue = isNaN(numTwo);
    let max, min;
    if(!flagUno && !flagDue){
         if(numOne>=numTwo){
            max= numOne;
            min = numTwo;
         }else{
            max = numTwo;
            min = numOne;
         }
         const random = Math.floor(Math.random()*(max-min+1) +min);
         return random
    }else{
         return("non un numero")
    }
}

//function che constrolla se il valore è una stringa
function isString(s) {
  if (typeof s !== "string") {
    return false;
  } else {
    return true;
  }
}
//function che pulisce il valore del form
function cleaning(value) {
  document.getElementById(value).value = "";
}

//function che pulisce il valore del form
function msgError(str) {
  ticket.innerHTML = "";
  ticket.innerHTML += str;
}

//---------------------------------------------------------
//------------MAIN CODE------------------------------------
//---------------------------------------------------------

//dichiare costante percentuale sconto u-18, sconto o-65 e con il prezzo per km
const discountPercentageU18 = 20;
const discountPercentageO65 = 40;
const prezzoPerKm = 0.21;

//salvo dentro ad una variabile l'elemento form e l'elemento button annulla
const form = document.getElementById("form");
const cleanButton = document.getElementById("cleanButton");

//all'invio del form, facciamo partire la funzione
form.addEventListener("submit", function (event) {
  //blocco il normale funzionamento dell'invio del form
  event.preventDefault();

  //memorizzo nome e cognome
  let info = document.getElementById("personal_info").value;

  //se è una stringa andiamo avanti con i controlli
  if (isString(info)) {

    //vado a memorizzare dentro una variabile km da percorrere
    let kmToTravel = parseInt(document.getElementById("km").value);

    //se i km inseriti è un numero e è maggiore di zero
    if (!isNaN(kmToTravel) && kmToTravel > 0) {
      //vado a memorizzare dentro una variabile eta passeggero e la selezione della select
      let age = parseInt(document.getElementById("age").value);

      //se eta inserita è un numero e è compreso tra 0 e 110
      if (!isNaN(age) && age > 0 && age < 110) {

        //vado a memorizzare dentro una variabile la selezione della select
        let select = document.getElementById("ageSel").value;

        //vado a memorizzare dentro una variabile la destinazione e la partenza
        let destination = document.getElementById("end").value;
        let start = document.getElementById("start").value;

        //memorizzo il prezzo che mi ritorna dalla funzione in una variabile
        const price = priceCalc(kmToTravel, select);

        //passo i valori che preso ad una funzione per creare un codice univoco
        const code = creationCode(info, price, age, start, destination, kmToTravel)

        //genero tramite una funzione la card
        generateHtml(info, price, age, start, destination, code);

        //azzero tutti i valori
        cleaning("personal_info");
        cleaning("km");
        cleaning("age");
        cleaning("start");
        cleaning("end");

      } else {
        msgError("l'eta inserita non è un numero o non è un eta fattibile");
      }
    } else {
      msgError("i km inseriti non sono numeri o non è un numero fattibile");
    }
  } else {
    //mandiamo un messaggio di errore
    msgError("nome e cognome non sono stringhe");
  }
});

cleanButton.addEventListener("click", function (event) {
    event.preventDefault();
    cleaning("personal_info");
    cleaning("km");
    cleaning("age");
    cleaning("start");
    cleaning("end");
});
