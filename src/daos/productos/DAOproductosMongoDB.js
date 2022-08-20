const productosSchema = require('../../Models/SchemaProductos');
const ContenedorMongoDB = require('../../Contenedores/ContenedorMongoDB');
const { logError, logConsola } = require('../../Logs/Log4js');

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
            let productoAGuardar = await this.model.create(producto)
            logConsola.info("Guardado" + productoAGuardar)
            this.id++
        } catch (error) {
            logError.error(err);
        }
    }
}




module.exports = DAOproductosMongoDB;