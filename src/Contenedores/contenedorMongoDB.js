const mongoose = require('mongoose');
const {mongoUri} = require("../config/global")
const {logError, logConsola} = require("../Logs/Log4js");
const DTOproductos = require("../DTO/DTOProductos");




class ContenedorMongo {
    constructor(model) {
        mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
        logConsola.info("Conectado a MongoDB")
        this.model = model
    }



    async getAll(){
        try {
            let productos = await this.model.find()
            return productos
        } catch (error) {
            logError.error(err);
        }
    }

    async getById(id){
        try {
            let producto = await this.model.find({"id": id})
            return producto[0]
        } catch (error) {
            logError.error(err);
        }
    }


    //"updates" debe ser un objeto con los campos a actualizar, lo mismo con "condicion".
    async update(id, updates){
        try{
            let producto = await this.model.updateOne({id: id}, {$set: updates})
        }catch(err){
            logError.error(err);
        }
    }

    async deleteById(id){
        try {
            let borrar = await this.model.deleteOne({id: id})
        } catch (error) {
            logError.error(err);
        }
    }

}



module.exports = ContenedorMongo

