addEventListener("DOMContentLoaded", (e) => {
    
    // ------- Formulario registro login-------
    
        let formLogin = document.querySelector("#login-formulario");
        let formRegistro = document.querySelector("#registro-formulario");
    
        document.getElementById('btn-login').addEventListener('click', function(){
            if(formLogin.classList.contains("ocultar")){
                formLogin.classList.remove("ocultar");
                formLogin.classList.add("activar");
                formRegistro.classList.remove("activar");
                formRegistro.classList.add("ocultar");
            }else if(formLogin.classList.contains("activar")){
                formLogin.classList.remove("activar");
                formLogin.classList.add("ocultar");
                formRegistro.classList.remove("ocultar");
                formRegistro.classList.add("activar");
            }else{
                formLogin.classList.add("activar");
                formRegistro.classList.remove("activar");
                formRegistro.classList.add("ocultar");
            }
        });
        
        document.getElementById('btn-registro').addEventListener('click', function(){
            if(formRegistro.classList.contains("ocultar")){
                formRegistro.classList.remove("ocultar");
                formRegistro.classList.add("activar");
                formLogin.classList.remove("activar");
                formLogin.classList.add("ocultar");
            }else if(formRegistro.classList.contains("activar")){
                formRegistro.classList.remove("activar");
                formRegistro.classList.add("ocultar");
                formLogin.classList.remove("ocultar");
                formLogin.classList.add("activar");
            }else{
                formRegistro.classList.add("ocultar");
                formLogin.classList.remove("ocultar");
                formLogin.classList.add("activar");
    
            }
        });

});