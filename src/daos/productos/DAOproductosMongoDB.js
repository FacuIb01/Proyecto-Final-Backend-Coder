const productosSchema = require('../../models/schemaProductos');
const ContenedorMongoDB = require('../../Contenedores/contenedorMongoDB');
const { logError, logConsola } = require('../../logs/log4js');

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
            let productoAGuardar = await this.model.create(producto)
            logConsola.info("Guardado" + productoAGuardar)
            this.id++
        } catch (error) {
            logError.error(err);
        }
    }
}


module.exports = DAOproductosMongoDB;