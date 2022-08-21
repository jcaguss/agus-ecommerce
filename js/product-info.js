var product = [];
var comentarios = [];
var autos = [];

function mostrarImagen(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function productosRelacionados(product,autos){
    let htmlContentToAppend = "";
    for(let i = 0; i < product.relatedProducts.length; i++){
        let PrRe = product.relatedProducts[i];
        htmlContentToAppend += `
        <dl>
            <dt> <br>`+ autos[PrRe].name +`</dt>
            <dd>
            <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + autos[PrRe].imgSrc + `" alt="">
            </div>
            <p>`+ autos[PrRe].description+`</p>
        </div>
            </dd>
        </dl>
        <hr>        
        `
        document.getElementById("productosRelacionados").innerHTML = htmlContentToAppend;
    }
}
function showCommentsGallery(){

    let htmlContentToAppend = "";

    for(let i = 0; i < comentarios.length; i++){ 
        let comment = comentarios[i];
        let estrellasOn = '<span class="fa fa-star checked"></span>';
        let estrellasOff = '<span class="fa fa-star"></span>';
        let score = estrellasOn.repeat(comment.score);
        let noScore = estrellasOff.repeat(5-comment.score);

        htmlContentToAppend += `
        <a class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <dt> `+ comment.user +` </dt>
                <p class="mb-1"> `+ comment.description +` </p>
                <p>` + score + noScore +` </p>
            </div>
            <small class="mb-6 text-muted"> `+ comment.dateTime +` </small>
        </div>
        </div>
    </a>
    `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
} 


function agregarComentario(){
    let inner = "";
    var error = document.getElementById('error')
    var usuario = sessionStorage.getItem('login');
    var nuevoComentario = document.getElementById("nuevoComentario");
    var usuarioScore = document.getElementsByClassName("checkear").length;
    let starsOn = '<span class="fa fa-star checked"></span>'
    let starsOff = '<span class="fa fa-star"></span>'
    let score = starsOn.repeat(usuarioScore);
    let scoreNo = starsOff.repeat(5 - usuarioScore);
    var hoy = new Date();     
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();     
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    if (nuevoComentario.value !== "" && usuarioScore !== 0) {
inner += `
        <a class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <dt> `+ usuario +` </dt>
                    <p class="mb-1"> `+ nuevoComentario.value +` </p>
                    <p> `+ score +  scoreNo + `</p>
            </div>
            <small class="mb-6 text-muted"> `+ fecha +' '+ hora +` </small>
        </div>
        </div>
    </a>`
    var espacio = document.getElementById("comentarios");
    espacio.innerHTML = inner +  espacio.innerHTML;

    error.style.display = 'none'
} else {
    error.innerHTML = 'Debe ingresar un comentario'
    error.style.color = 'red'
    usuario.classList.add("error");
    nuevoComentario.classList.add("error");
}
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrency = document.getElementById("productCurrency")
            let productVendidos = document.getElementById("productSoldCount")


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrency.innerHTML = product.currency;
            productVendidos.innerHTML = product.soldCount;


            //Muestro las imagenes en forma de galería
            mostrarImagen(product.images);
        }
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                autos = resultObj.data;
                productosRelacionados(product,autos);
            }
        })
    });   
});



$(".clasificacion").find("input").change(function() {
var valor = $(this).val()
$(".clasificacion").find("input").removeClass("checkear")
$(".clasificacion").find("input").each(function(index) {
    if (index + 1 <= valor) {
        $(this).addClass("checkear")
    }
})
})
$(".clasificacion").find("label").mouseover(function() {
var valor = $(this).prev("input").val()
$(".clasificacion").find("input").removeClass("checkear")
$(".clasificacion").find("input").each(function(index) {
    if (index + 1 <= valor) {
        $(this).addClass("checkear")
    }
})
})

getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok"){
        comentarios = resultObj.data;
        showCommentsGallery();
    }
});

