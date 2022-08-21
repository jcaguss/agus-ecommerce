
document.addEventListener("DOMContentLoaded", function(e){

}); 
function cargarErrores(id, idMensaje) {
    var elementNombre = document.getElementById(id);
    var elementError = document.getElementById(idMensaje);
    if(elementNombre.value ==='' || elementError.value === null){
        elementError.style.display = "block";
        elementError.style.color = "rgba(231, 26, 26, 0.5)";
        elementNombre.classList.add("error");
        if(elementNombre.id === 'email'){
            elementError.innerHTML ='Debe ingresar un usuario o email'; 
        }else{
            elementError.innerHTML = 'Debe ingresar un password';
        }
    }else{
        elementError.style.display = "none";
        elementNombre.classList.remove("error");
    }
}

function redirect(){
    var email = document.getElementById('email');
    var pass = document.getElementById('password');
    if(email.value !== '' && pass.value !== ''){
        sessionStorage.setItem('login', email.value);
        location.replace('index.html');
    }
}
