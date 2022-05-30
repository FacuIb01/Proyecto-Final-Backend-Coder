const productosSchema = require('../../models/schemaProductos');
const ContenedorMongoDB = require('../../Contenedores/contenedorMongoDB');

class DAOproductosMongoDB extends ContenedorMongoDB{
    constructor(){
        super(productosSchema)
        this.id = 1
        this.checkId()
    }

    async checkId(){
        let productos = await this.getAll()
        if(productos.length > 1) {
            this.id = parseInt(productos[productos.length - 1].id) + 1
        }
    }

    async save(producto){
        try {
            producto.id = this.id
            console.log(producto);
            let productoAGuardar = await this.model.create(producto)
            console.log("Guardado", productoAGuardar)

            this.id++
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = DAOproductosMongoDB;