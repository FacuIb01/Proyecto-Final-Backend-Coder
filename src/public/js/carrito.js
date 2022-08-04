const carrito = JSON.parse(localStorage.getItem("carrito"))
const section = document.getElementById("carrito")
const button = document.getElementById("finalizarCompra")
carrito.forEach((producto, index) => {
    section.innerHTML +=  `<div class="card" style="width: 18rem;">
    <img src="{{img}}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <p class="card-text">${producto.precio}</p>
    </div>
    </div>`
})



button.addEventListener("click", () => {
    fetch("/finalizarCompra", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            carrito
        }),
    }).then(() => {
        localStorage.removeItem("carrito")
        window.location.href = "/compraFinalizada"
    })
})