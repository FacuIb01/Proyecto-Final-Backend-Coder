const mongoose = require('mongoose');
const {mongoUri} = require("../config/global")



class ContenedorMongo {
    constructor(model) {
        mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Conectado a MongoDB")
        this.model = model

    }



    async getAll(){
        try {
            let productos = await this.model.find()
            return productos
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            let producto = await this.model.find({"id": id})
            return producto[0]
        } catch (error) {
            console.log(error)
        }
    }


    //"updates" debe ser un objeto con los campos a actualizar, lo mismo con "condicion".
    async update(id, updates){
        try{
            let producto = await this.model.updateOne({id: id}, {$set: updates})
        }catch(err){
            console.log(err)
        }
    }

    async deleteById(id){
        try {
            let borrar = await this.model.deleteOne({id: id})
        } catch (error) {
            console.log(error)
        }
    }

}



module.exports = ContenedorMongo

