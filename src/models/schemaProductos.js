let mongoose = require("mongoose")


const productosSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    img: {type: String, required: true},
    descripcion: {type: String, required: true},
    timestamp: {type: String, required: true, default: Date.now()},
    codigo: {type: Number, required: true},
    id:{type: Number, required: true}
})


const model = mongoose.model("productos", productosSchema);

module.exports = model