addEventListener("DOMContentLoaded", (e) => {

    let linea1 = document.querySelector(".linea1");
    let linea2 = document.querySelector(".linea2");
    let linea3 = document.querySelector(".linea3");

    function animateBars(){
        
        linea1.classList.toggle("active-linea1");
        linea2.classList.toggle("active-linea2");
        linea3.classList.toggle("active-linea3");
    }

    document.querySelector(".btn-menu").addEventListener("click", animateBars);
    window.addEventListener("scroll", function(){
        let posicion = window.scrollY || document.documentElement.scrollTop;
        let personajeRosa = document.querySelector("#personajeRosa");
        let personajeDefault = document.querySelector("#personajeDefault");
        let personajeNegro = document.querySelector("#personajeNegros");

        personajeDefault.style.bottom = posicion * 0.1 + "px";
        personajeNegro.style.bottom = posicion * 0.3 + "px";
        personajeRosa.style.top = posicion * 0.2 + "px";
    });

});