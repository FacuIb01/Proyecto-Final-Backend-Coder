const ContenedorMongo = require("../../contenedores/contenedorMongoDB");
const SchemaOrdenes = require("../../models/schemaOrdenes");
const { logError, logConsola } = require('../../logs/log4js');


class DAOordenesMongoDB extends ContenedorMongo{
    static instance
    constructor(){
        super(SchemaOrdenes)
        this.id = 1
        this.checkId()
        if(!!DAOordenesMongoDB.instance){
            return DAOordenesMongoDB.instance
        }else{
            DAOordenesMongoDB.instance = this
            return this
        }
    }


    async checkId(){
        let ordenes = await this.getAll()
        if(ordenes.length > 1) {
            this.id = parseInt(ordenes[ordenes.length - 1].id) + 1
        }
    }

    async save(orden){
        try {
            orden.id = this.id
            let ordenAguardar = await this.model.create(orden)
            logConsola.info("orden generada" + ordenAguardar)
            this.id++
        } catch (err) {
            logError.error(err);
        }
    }
}

module.exports = DAOordenesMongoDB



