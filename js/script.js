function priceCalc(km, age){
    //calcolare prezzo base biglietto: km * costante 0,21
    const basePrice = km * prezzoPerKm;

    //inizzializzo la variabile sconto
    let discount = 0; 

    //SE eta < 18 
        // sconto = prezzo * percentuale u-18 / 100
    //ALTRIMENTI se eta > 65 
        // sconto = prezzo * percentuale o-65 / 100
    if(age<18){
        discount = basePrice * discountPercentageU18 / 100;
    }else if(age > 65){
        discount = basePrice * discountPercentageO65 / 100;
    }
    //calcolo il prezzo finale 
    let finalPrice = basePrice - discount;
    //restituisco indietro il valore del prezzo finale
    return finalPrice.toFixed(2);
}
function generateHtml(info, price, age){
    ticket.innerHTML = '';
    ticket.innerHTML +=
    `<div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="./img/image.png" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">Nome Possessore: ${info}</h5>
                <p class="card-text"><small class="text-body-secondary">Eta del possessore: ${age}</small></p>
                <p class="card-text">Prezzo biglietto: ${price}&euro;</p>
            </div>
            </div>
        </div>
      </div>`;


};
//dichiare costante percentuale sconto u-18, sconto o-65 e con il prezzo per km
const discountPercentageU18 = 20;
const discountPercentageO65 = 40;
const prezzoPerKm = 0.21;


//salvo dentro ad una variabile l'elemento form
const form = document.getElementById("form");
console.log(form)
//all'invio del form, facciamo partire la funzione
form.addEventListener("submit", function(event){
    //blocco il normale funzionamento dell'invio del form
    event.preventDefault();
    //memorizzo nome e cognoem
    let info = document.getElementById("personal_info").value;
    //vado a memorizzare dentro due variabilki rispettivamente km da percorrere e eta passeggero
    let kmToTravel = document.getElementById("km").value;
    let age = document.getElementById("age").value;
    console.log(kmToTravel, age);
    //memorizzo il prezzo che mi ritorna dalla funzione in una variabile
    const price = priceCalc(kmToTravel, age);
    console.log(price);

    generateHtml(info, price, age);

    //azzero tutti i valori
    document.getElementById("personal_info").value = '';
    document.getElementById("km").value='';
    document.getElementById("age").value= '';

})

