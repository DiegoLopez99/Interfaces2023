
//movimiento edificios

const edificio1 = document.querySelector('.edificio-3');
const edificio2 = document.querySelector('.edificio-4');
const edificio3 = document.querySelector('.edificio-5');
const duende = document.querySelector('.img-duende');

window.addEventListener('scroll',function(){
    let value = window.scrollY;

    edificio1.style.backgroundPositionY = value * 0.20 + 'px';
    edificio2.style.backgroundPositionY = value * 0.10 + 'px';
    edificio3.style.backgroundPositionY = value * 0.04 + 'px';
    duende.style.top = value * 0.1 + 'px';
})  

//activado y desactivado del menu mientras scrolleas

// se podria llamar diferente
function callback(entries){
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            mostrar(quitar);
            element.classList.toggle('.navbar-scroll')
        }
        else{
            noMostrar(quitar)
        }
    });
}

function mostrar(entry){
    entry.classList.remove('no-visible');
    entry.classList.add('visible');
}

function noMostrar(entry){
    entry.classList.remove('visible');
    entry.classList.add('no-visible');
}

const options = {
    root: null,
    rootMargin:'50px' ,
    threshold : 0
}

const observer = new IntersectionObserver(callback, options);
const element = document.querySelector('.navbar');
const quitar = document.querySelector('.navbar-scroll')
const observado = document.querySelector('#logo-central')

observer.observe(observado);

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

});

