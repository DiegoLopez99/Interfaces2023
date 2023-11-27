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
        let gamecard1 = document.querySelector('.gamecard-1');
        let gamecard2 = document.querySelector('.gamecard-2');
        let gamecard3 = document.querySelector('.gamecard-3');

        personajeDefault.style.bottom = posicion * 0.1 + "px";
        personajeNegro.style.bottom = posicion * 0.3 + "px";
        personajeRosa.style.top = posicion * 0.1 + "px";
        duende.style.bottom = posicion * 0.15 + "px";
        
        gamecard1.style.top = posicion * -0.03 + "px";
        gamecard2.style.top = posicion * -0.15 + "px";
        gamecard3.style.top = posicion * -0.3 + "px";
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

// menu desplegable
    function callback(entries){
        entries.forEach(entry => {
            if(!entry.isIntersecting){
                //console.log("funciona")
                activarLogoNavbar(logoNavbar);
                activarNavbarOnScroll(navbar);
            }
            else{
                desactivarLogoNavbar(logoNavbar);
                desactivarNavbarOnScroll(navbar);
            }
        });
    }
    
    function activarNavbarOnScroll(entry){
        entry.classList.toggle('activar');
    }

    function activarLogoNavbar(entry){
        entry.classList.add('activarImg');
    }

    function desactivarLogoNavbar(entry){
        entry.classList.remove('activarImg')
        entry.classList.add('desactivarImg')
    }

    function desactivarNavbarOnScroll(entry){
        entry.classList.remove('activar')
    }


    const options = {
        root: null,
        rootMargin:'50px' ,
        threshold : 0
    }
    
    const observer = new IntersectionObserver(callback, options);

    const navbar = document.querySelector('.navbar');
    const logoNavbar = document.querySelector('#titulo-logo');
    const element = document.querySelector('#logo-central')
    
    observer.observe(element);
    
});


// distintos tipos de animacion a los heroes
document.addEventListener('DOMContentLoaded' , () => {
    const personaje1 = document.querySelector('.person1');
    const personaje2 = document.querySelector('.person2');
    const personaje3 = document.querySelector('.person3');

    const fondoIntercambiable = document.querySelector('.fondoIntercambiable')

    personaje1.addEventListener('mouseenter', () =>{
        cambiarFondo(fondoIntercambiable ,'fondo-rosa.png');
        desenfoque(personaje2,personaje3);
        efectoPersonaje(personaje1);
    });

    personaje1.addEventListener('mouseleave', () => {
        quitarDesenfoque(personaje2,personaje3);
        quitarEfectoPersonaje(personaje1);
        restaurarFondo(fondoIntercambiable);
    })

    personaje2.addEventListener('mouseenter', () =>{
        cambiarFondo(fondoIntercambiable, 'fondo-azul.png');
        desenfoque(personaje1,personaje3);
        efectoPersonaje(personaje2);
    });

    personaje2.addEventListener('mouseleave', () => {
        quitarDesenfoque(personaje1,personaje3);
        quitarEfectoPersonaje(personaje2);
        restaurarFondo(fondoIntercambiable);
    })
    
    personaje3.addEventListener('mouseenter', () =>{
        cambiarFondo(fondoIntercambiable, 'fondo-gris.png');
        desenfoque(personaje1,personaje2);
        efectoPersonaje(personaje3);
    });

    personaje3.addEventListener('mouseleave', () => {
        quitarDesenfoque(personaje1,personaje2);
        quitarEfectoPersonaje(personaje3);
        restaurarFondo(fondoIntercambiable);
    })

    function cambiarFondo(elemento, ruta) {
        if(elemento && elemento.tagName === 'IMG'){
            elemento.style.transition = 'opacity 0.5 ease';
            elemento.src =`./img/${ruta}`;
        }
        else{
            console.error("elemento no encontrado");
        }
    }

    function restaurarFondo(elemento){
        if(elemento){
            elemento.src = './img/Rectangle 10fongo back 7.png';
        }
        else{
            console.error('el elemento no fue encontrado');
        }
    }

    function desenfoque(elem1, elem2){
        elem1.style.transition = 'filter 0.3s ease'; 
        elem2.style.transition = 'filter 0.3s ease';

        elem1.style.filter = 'blur(5px)';
        elem2.style.filter = 'blur(5px)';
    }

    function efectoPersonaje(elem){
        elem.style.filter = 'blur(0px)';
        elem.style.transition = 'transform 3s ease';
        elem.style.transform = 'scale(1.1)';
    }

    function quitarDesenfoque(elem1,elem2){
        elem1.style.transition = 'filter 0.3s ease'; 
        elem2.style.transition = 'filter 0.3s ease';

        elem1.style.filter = 'blur(0px)';
        elem2.style.filter = 'blur(0px)';
    }

    function quitarEfectoPersonaje(elem){
        elem.style.transition = 'transform 3s ease';
        elem.style.transform = 'scale(1)';
    }

});

