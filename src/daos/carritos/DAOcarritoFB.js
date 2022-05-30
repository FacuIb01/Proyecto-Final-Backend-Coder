const ContenedorFB = require('../../Contenedores/contenedorFireBase.js')


class CarritoFB extends ContenedorFB{
    constructor(){
        super("carritos")
        this.id = 1
        this.checkId()
    }

    async checkId(){
        let carritos = await this.getAll()
        if(carritos.length > 1) {
            this.id = parseInt(carritos[carritos.length - 1].id) + 1
        }
    }
    async save(){
        let carrito = this.collection.doc(`${this.id}`)
        await carrito.create({
            id: this.id,
            timestamp: Date.now(),
            productos: []
        })
        this.id++
        return true
    }

    async getProductos(id){
        let carrito = this.collection.doc(`${id}`)
        let productos = await carrito.get()
        return productos.data().productos
    }


    async añadirProducto(id, producto){
        let carrito = this.collection.doc(`${id}`)
        let productos = await carrito.get()
        let productosCarrito = productos.data()
        productosCarrito.productos.push(producto)
        await carrito.update(productosCarrito)
        return true
    }

    async eliminarProducto(idCarrito, idProducto){
        let carritoEncontrado = this.collection.doc(`${idCarrito}`)
        let carrito = await carritoEncontrado.get()
        let carritoInfo = carrito.data()
        let index = carritoInfo.productos.findIndex(e => e.id == idProducto)
        carritoInfo.productos.splice(index, 1)
        await carritoEncontrado.update(carritoInfo)
        return true
    }

}



module.exports = CarritoFB;