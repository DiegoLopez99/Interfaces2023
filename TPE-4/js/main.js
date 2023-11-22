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
    entry.classList.remove('no-visible')
    entry.classList.add('visible');
}

function noMostrar(entry){
    entry.classList.remove('visible');
    entry.classList.add('no-visible')
}

const options = {
    root: null,
    rootMargin:'0px' ,
    threshold : 0
}

const observer = new IntersectionObserver(callback, options);
const element = document.querySelector('.navbar');
const quitar = document.querySelector('.navbar-scroll')

observer.observe(element);

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

