// Univerzální napojovač pro service-worker (pro offline režim)
if("serviceWorker" in navigator) {
    window.addEventListener("load", ()=> {
        navigator.serviceWorker.register("sw.js")
        .then(registration => {
            console.log("SW registered");
        })
        .catch(error => {
            console.log("SW registration failed: ", error);
        });
    });
}

// Vytáhnutí do konstanty - hledá v HTML podle ID (pokud se název neshoduje, vyskočí chyba null)
const prepinac = document.getElementById("RingSwitch");
const prepinac2 = document.getElementById("RingSwitch2");
const obrazek = document.getElementById("RingStatic");

// Vytáhnutí divu, abychom mu přes tečku mohli měnit barvu rámečku
const ramecek = document.querySelector("div"); 

// Posluchače - JS čeká na událost (změnu stavu checkboxu)
prepinac.addEventListener("change", prepniObrazek);
prepinac2.addEventListener("change", prepniObrazek2);

// Funkce pro první přepínač (Darkness) - mění barvu pozadí a rámečku
function prepniObrazek(event){
    if (prepinac.checked) {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        ramecek.style.borderColor = "white"; 
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        ramecek.style.borderColor = "black";
    }
}

// Funkce pro druhý přepínač (Evil) - mění src obrázku podle toho, jestli je zaškrtnuto
function prepniObrazek2(event){
    if (prepinac2.checked) {
        obrazek.src = "TheOneRing02.png";
    } else {
        obrazek.src = "TheOneRing01.png";
    }
}