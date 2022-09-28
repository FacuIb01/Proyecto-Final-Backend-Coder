let mongoose = require("mongoose")
let fechaYHora = require("../utils/fechaYHora")

const ordenesSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    timestamp: {type: Number, required: true, default: Date.now()},
    items: [],
    fecha: {type: String, required:true, default: fechaYHora()},
    estado: {type: String, required:true, default: "generada"},
    email: {type: String, required: true}
})



const model = mongoose.model("ordenes", ordenesSchema);

module.exports = model