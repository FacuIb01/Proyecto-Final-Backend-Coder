let mongoose = require("mongoose")


const chatSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    timestamp: {type: Number, required: true, default: Date.now()},
    mensaje: {type: String, required: true},
    usuario: {type: String, required: true},
})


const model = mongoose.model("chat", chatSchema);

module.exports = model