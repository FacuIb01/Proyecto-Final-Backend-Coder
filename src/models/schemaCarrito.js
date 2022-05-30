let mongoose = require("mongoose")


const carritoSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    timestamp: {type: Number, required: true, default: Date.now()},
    productos: []
})


const model = mongoose.model("carritos", carritoSchema);

module.exports = model