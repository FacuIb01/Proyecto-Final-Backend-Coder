const productosSchema = require('../../models/schemaProductos');
const ContenedorMongoDB = require('../../contenedores/contenedorMongoDB');
const { logError, logConsola } = require('../../logs/log4js');

class DAOproductosMongoDB extends ContenedorMongoDB{
    
    static instance

    constructor(){
        super(productosSchema)
        this.id = 1
        this.checkId()
        if(!!DAOproductosMongoDB.instance){
            return DAOproductosMongoDB.instance
        }else{
            DAOproductosMongoDB.instance = this
            return this
        }
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

    async getByCategory(category) {
        try {
            let productos = await this.model.find({"categoria": category})
            return productos
        } catch (error) {
            logError.error(error)
        }
    }
}




module.exports = DAOproductosMongoDB;