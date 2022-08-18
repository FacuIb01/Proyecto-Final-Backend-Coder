class CarritoDTO {
    constructor(carrito) {
        this.id = carrito.id;
        this.productos = carrito.productos;
    }
}


module.exports = CarritoDTO;