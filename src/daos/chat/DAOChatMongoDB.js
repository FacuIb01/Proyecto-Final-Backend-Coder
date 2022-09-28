const ContenedorMongoDB = require("../../contenedores/contenedorMongoDB")
const chatSchema = require("../../models/schemaMensajes")
const { logError, logConsola } = require('../../logs/log4js');

class DAOChatMongoDB extends ContenedorMongoDB{
    
    static instance

    constructor(){
        super(chatSchema)
        this.id = 1
        this.checkId()
        if(!!DAOChatMongoDB.instance){
            return DAOChatMongoDB.instance
        }else{
            DAOChatMongoDB.instance = this
            return this
        }
    }


    async checkId(){
        let productos = await this.getAll()
        if(productos.length > 1) {
            this.id = parseInt(productos[productos.length - 1].id) + 1
        }
    }

    //guarda un mensaje
    async save(mensaje){
        try {
            mensaje.id = this.id
            let productoAGuardar = await this.model.create(mensaje)
            logConsola.info("Guardado: " + productoAGuardar)
            this.id++
        } catch (err) {
            logError.error(err);
        }
    }
    
    //obtiene todos los mensajes de un usuario en especifico
    async getByUser(user){
        try {
            let mensajes = await this.model.find({"usuario": user})
            return mensajes
        } catch (error) {
            logError.error(error)
        }
    }
}


module.exports = DAOChatMongoDB