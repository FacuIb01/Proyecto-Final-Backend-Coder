let mongoose = require("mongoose")
const {mongoUri} = require('../config/global.js')
const {logError, logConsola} = require('../logs/log4js')


mongoose.connect(mongoUri,{useNewUrlParser: true, useUnifiedTopology: true},  (err, res) => {
    try{
        if (err) {
            logError.error(err)
        } else {
            logConsola.info("Conexion a la base de datos establecida")
        }
    }catch(err){
        logError.error(err)
    }
})


const usuariosCollection = "usuarios"

const usuariosSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String, required: true},
    direccion: {type: String, required: true},
    edad:{type: Number, required: true},
    numero: {type: Number, required: true},
    avatar: {type: String, required: true},
})



module.exports = mongoose.model(usuariosCollection, usuariosSchema);