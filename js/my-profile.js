const objeto = { nombre: "", apellido: "", edad: "", email: "", contacto: "" };
const json = JSON.stringify(objeto);
var nombre = document.getElementById("nom");
var apellido = document.getElementById("ape");
var edad = document.getElementById("edad");
var email = document.getElementById("email");
var contacto = document.getElementById("cont");
var edit = document.getElementById('edit');
var guardar = document.getElementById('guardar');
var error = document.getElementById('errorPerfil');

function guardarRegistro() {

    localStorage.setItem("regristro", json);
    var obj = localStorage.getItem("regristro");
    var objDato = JSON.parse(obj);

    objDato.nombre = document.getElementById('nom').value;
    objDato.apellido = document.getElementById('ape').value;
    objDato.edad = document.getElementById('edad').value;
    objDato.email = document.getElementById('email').value;
    objDato.contacto = document.getElementById('cont').value;


if (objDato.nombre !== '' && objDato.apellido !== '' && objDato.edad !== '' &&objDato.email !== '' 
&& objDato.contacto !== ''){

    obj = JSON.stringify(objDato);
    localStorage.setItem("regristro", obj);

    guardar.style.display = "none";
    edit.style.display = "block";
    error.style.display = "none"
    
    nombre.setAttribute("disabled",true);
    apellido.setAttribute("disabled",true);
    edad.setAttribute("disabled",true);
    email.setAttribute("disabled",true);
    contacto.setAttribute("disabled",true);


} else{
error.style.color = "rgba(300, 26, 26, 1)"
error.style.display = "block";};


};



function obtenerRegristro() {

    var obj = localStorage.getItem("regristro")
    var dataUser = JSON.parse(obj);

    document.getElementById('nom').value = dataUser.nombre;
    document.getElementById('ape').value = dataUser.apellido;
    document.getElementById('edad').value = dataUser.edad;
    document.getElementById('email').value = dataUser.email;
    document.getElementById('cont').value = dataUser.contacto;

    nombre.setAttribute("disabled",true);
    apellido.setAttribute("disabled",true);
    edad.setAttribute("disabled",true);
    email.setAttribute("disabled",true);
    contacto.setAttribute("disabled",true);

    guardar.style.display = "none";
    edit.style.display = "block";

};


function editarRegistro(){
    
    nombre.removeAttribute("disabled",true);
    apellido.removeAttribute("disabled",true);
    edad.removeAttribute("disabled",true);
    email.removeAttribute("disabled",true);
    contacto.removeAttribute("disabled",true);

    guardar.style.display = "block";
    edit.style.display = "none";
}

function cargarErrores(id, idMensaje) {
    var elementNombre = document.getElementById(id);
    var elementError = document.getElementById(idMensaje);
    if(elementNombre.value ==='' || elementError.value === null){
        elementError.style.display = "block";
        elementError.style.color = "rgba(300, 26, 26, 1)";
        elementNombre.classList.add("error");
        if(elementNombre.id === 'nom'){
        elementError.innerHTML ='Debe ingresar un Nombre'; 
        }
        else if(elementNombre.id === 'ape'){
            elementError.innerHTML ='Debe ingresar un Apellido';
            }
        else if(elementNombre.id === 'edad'){
        elementError.innerHTML ='Debe ingresar una fecha';
        }
        else if(elementNombre.id === 'email'){
        elementError.innerHTML ='Debe ingresar un email'; 
        }
        else if(elementNombre.id === 'cont'){
        elementError.innerHTML ='Debe ingresar su telefono'; 
        }
    }else{
        elementError.style.display = "none";
        elementNombre.classList.remove("error");
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    obtenerRegristro()
});