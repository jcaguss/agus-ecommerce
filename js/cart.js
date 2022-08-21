var carro = [];   

function showObjList (){
    htmlContentToAppend ="";

    for (let i = 0; i < carro.articles.length; i++){
    let obj = carro.articles[i];

    htmlContentToAppend += `

            <div>
                <div class="row">
                    <div class="col-3">
                    <img src="` + obj.src + `" alt="" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-grid ">
                            <h4 class="mb-1">` + obj.name +`</h4><br><br><br><br>
                            <input class='col-2' id="cantidad" onkeyup="total(`+ obj.unitCost +`);" type="number" value="`+ obj.count +`">
                        </div>
                    </div>
                            <p id="precio">`+"Precio Unitario: "+" "+ obj.unitCost +' '+ obj.currency +`</p>
                </div>
            </div>
            <hr>
            <div> <span>Sub Total:</span> <p id="subTotal" value="" type="text" ></p></div>
            <div><span>Total:</span><p id="total" type="text"></p></div>
            <div class='align-items-end d-flex'><button class="btn btn-success" type="submit" >Finaliar Compra</button></div>

            `
    
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function total (precio){
    var cantidad = document.getElementById("cantidad").value;
    var subTotal = precio * cantidad;
    var total = subTotal * 1.22;
    document.getElementById("subTotal").innerHTML = subTotal;
    document.getElementById("total").innerHTML = total;
}


function cargarErrores(id, idMensaje) {
    var elementNombre = document.getElementById(id);
    var elementError = document.getElementById(idMensaje);
    if(elementNombre.value ==='' || elementError.value === null){
        elementError.style.display = "block";
        elementError.style.color = "rgba(300, 26, 26, 1)";
        elementNombre.classList.add("error");
        if(elementNombre.id === 'calle'){
        elementError.innerHTML ='Debe ingresar una calle'; 
        }
        else if(elementNombre.id === 'num'){
            elementError.innerHTML ='Debe ingresar un numero de puerta';
            }
        else if(elementNombre.id === 'esquina'){
        elementError.innerHTML ='Debe ingresar una esquina';
        }
        else if(id === 'pais'){
            elementError.innerHTML ='Debe ingresar un pais';
            }
    }else{
        elementError.style.display = "none";
        elementNombre.classList.remove("error");
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carro = resultObj.data;
            showObjList (carro);
        }
    });
});