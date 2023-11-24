addEventListener("DOMContentLoaded", (e) => {

    let linea1 = document.querySelector(".linea1");
    let linea2 = document.querySelector(".linea2");
    let linea3 = document.querySelector(".linea3");

    const nav = document.querySelector("#btn-menu");
    function animateBars(){
        nav.classList.toggle("open");
        /*linea1.classList.toggle("active-linea1");
        linea2.classList.toggle("active-linea2");
        linea3.classList.toggle("active-linea3");*/
    }

    nav.addEventListener("click", animateBars);

    window.addEventListener("scroll", function(event){
        let posicion = window.scrollY || document.documentElement.scrollTop;
        let posicionMouse = event.cientY || event.clientX;
        let personajeRosa = document.querySelector("#personajeRosa");
        let personajeDefault = document.querySelector("#personajeDefault");
        let personajeNegro = document.querySelector("#personajeNegros");
        let duende = document.querySelector("#img-duende");

        personajeDefault.style.bottom = posicion * 0.1 + "px";
        personajeNegro.style.bottom = posicion * 0.3 + "px";
        personajeRosa.style.top = posicion * 0.1 + "px";
        duende.style.bottom = posicion * 0.15 + "px";
        
    });

    document.querySelector("#seccionParallaxMouseMove").addEventListener('mousemove', e=>{
        
        let phanter = document.querySelector("#phanter");
        let hulk = document.querySelector("#hulk");
        let person1 = document.querySelector("#person1");
        let sensibilidad = 135;

        const x = e.clientX;
        const y = e.clientY;

        phanter.style.transform = `
            translate(
                ${x/sensibilidad}%,
                ${y/sensibilidad}%
        ) rotate(15deg)`;

        hulk.style.transform = `
            translate(
                ${x/sensibilidad}%,
                ${y/sensibilidad}%
        )`;

        person1.style.transform = `
            translate(
                ${x/sensibilidad}%,
                ${y/sensibilidad}%
        )`;


    }); 

    const observerCards = new IntersectionObserver(entries =>{
        entries.forEach(entry =>{
            if(entry.isIntersecting){
                document.querySelectorAll(".card")[0].classList.add("card1");
                document.querySelectorAll(".card")[1].classList.add("card2");
                document.querySelectorAll(".card")[2].classList.add("card3");
            }
        });
    });

    observerCards.observe(document.querySelector(".section-3"))

});