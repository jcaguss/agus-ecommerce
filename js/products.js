const ORDER_ASC_BY_Precio = "Max-Min";
const ORDER_DESC_BY_Precio = "Min-Max";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentsProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


function buscar(texto){
    var elemento = currentsProductsArray.filter(function(ele){
        return ele.name.toLowerCase().indexOf(texto) > -1 ||ele.description.toLowerCase().indexOf(texto) > -1 
    })

let result = '';
for (i = 0; i< elemento.length; i++){
    let productos = elemento[i];

    result += `
    <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
            <img src="` + productos.imgSrc + `" alt="` + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + productos.name +`<br><br>`+ productos.description + `</h4>
                    <h5 class="mb-1">`+ productos.cost + ' ' + productos.currency + ` </h5>
                    <p class="text-muted">`+ `Vendidos:`+ ' ' + productos.soldCount +' '+`articulos </p>
                </div>
            </div>
        </div>
    </div>
    `
}
document.getElementById('cat-list-container').innerHTML = result
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_Precio)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_Precio){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    for (let i = 0; i < currentsProductsArray.length; i++) {
        let productos = currentsProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html">
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <img src="` + productos.imgSrc + `" alt="` + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + productos.name +`<br><br>`+ productos.description + `</h4>
                            <h5 class="mb-1">`+ productos.cost + ' ' + productos.currency + ` </h5>
                            <p class="text-muted">`+ `Vendidos:`+ ' ' + productos.soldCount +' '+`articulos </p>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        }
    }

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentsProductsArray = productsArray;
    }

    productsArray = sortProducts(currentSortCriteria, currentsProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_Precio, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_Precio);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_Precio);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showPorductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
    document.getElementById('inputBuscador').addEventListener('keyup', function(){
        let texto = document.getElementById('inputBuscador').value;
        buscar(texto)
    });
});

