//dichiare costante percentuale sconto u-18, sconto o-65 e con il prezzo per km
const percentualeScontoU18 = 20;
const percentualeScontoO65 = 40;
const prezzoPerKm = 0.21;

//calcolare prezzo base biglietto: km * costante 0,21
const prezzoBase = numeroKm * prezzoPerKm;
//inizzializzo la variabile sconto
let sconto = 0; 
//SE eta < 18 
    // sconto = prezzo * percentuale u-18 / 100
//ALTRIMENTI se eta > 65 
    // sconto = prezzo * percentuale o-65 / 100

if(eta<18){
    sconto = prezzoBase * percentualeScontoU18 / 100
}else if(eta > 65){
    sconto = prezzoBase * percentualeScontoO65 / 100
}

let prezzoFinale = prezzoBase - sconto;

console.log("prezzo finale: "+prezzoFinale.toFixed(2));