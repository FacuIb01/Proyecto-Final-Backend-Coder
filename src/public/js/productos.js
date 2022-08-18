let div = document.getElementById("productos");
let productoss = ""

async function productos () {
    fetch("/api/productos/").then(res => res.json()).then(productos => {
        console.log(productos)
        productos.forEach((producto, index) => {
            div.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="{{img}}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <p class="card-text">${producto.precio}</p>
                <a class="btn btn-primary" onclick="funcion(${index})">Comprar</a>
            </div>
            </div>`
        })
        productoss = productos
    })
}

function funcion(index){
    let producto = productoss[index]
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    if(carrito == null){
        carrito = []
    }
    carrito.push(producto)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

productos()



/* <div class="card" style="width: 18rem;">
<img src="{{img}}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">{{nombre}}</h5>
    <p class="card-text">{{descripcion}}</p>
    <p class="card-text">{{precio}}</p>
    <a href="#" class="btn btn-primary" >Comprar</a>
</div>
</div> */