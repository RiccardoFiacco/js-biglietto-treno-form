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
    
    //vado a memorizzare dentro due variabilki rispettivamente km da percorrere e eta passeggero
    let kmToTravel = document.getElementById("km").value;
    let age = document.getElementById("age").value;
    console.log(kmToTravel, age);
    const price = priceCalc(kmToTravel, age);
    console.log(price);
})

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