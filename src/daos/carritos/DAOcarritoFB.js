const ContenedorFB = require('../../contenedores/contenedorFireBase.js')



class CarritoFB extends ContenedorFB{
    static instance
    constructor(){
        super("carritos")
        this.id = 1
        this.checkId()
        if(!!CarritoFB.instance){
            return CarritoFB.instance
        }else{
            CarritoFB.instance = this
            return this
        }
    }

    async checkId(){
        let carritos = await this.getAll()
        if(carritos.length > 1) {
            this.id = parseInt(carritos[carritos.length - 1].id) + 1
        }
    }

    //crea un carrito
    async save(){
        try {
            let carrito = this.collection.doc(`${this.id}`)
            await carrito.create({
                id: this.id,
                timestamp: Date.now(),
                productos: []
            })
            this.id++
            return true
        } catch (err) {
            logError.error(err);
        }
    }

    async getProductos(id){ //devuelve los productos del carrito
        try {
            let carrito = this.collection.doc(`${id}`)
            let productos = await carrito.get()
            return productos.data().productos
        } catch (err) {
            logError.error(err);
        }
    }


    async añadirProducto(id, producto){
        try {
            let carrito = this.collection.doc(`${id}`)
            let productos = await carrito.get()
            let productosCarrito = productos.data()
            productosCarrito.productos.push(producto)
            await carrito.update(productosCarrito)
            return true
        } catch (err) {
            logError.error(err);
        }
    }

    async eliminarProducto(idCarrito, idProducto){
        try {
            let carritoEncontrado = this.collection.doc(`${idCarrito}`)
            let carrito = await carritoEncontrado.get()
            let carritoInfo = carrito.data()
            let index = carritoInfo.productos.findIndex(e => e.id == idProducto)
            carritoInfo.productos.splice(index, 1)
            await carritoEncontrado.update(carritoInfo)
            return true
        } catch (err) {
            logError.error(err);
        }
    }

}




module.exports = CarritoFB;