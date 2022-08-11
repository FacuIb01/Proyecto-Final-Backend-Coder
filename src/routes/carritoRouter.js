const express = require('express');
const carritos = express.Router();
const carritoController =  require("../controllers/carritoController");


carritos.post("/", carritoController.crearCarrito)


carritos.delete("/:id", carritoController.borrarCarrito)


carritos.get("/:id/productos", carritoController.obtenerProductosCarrito)


carritos.delete("/:id/productos/:id_prod", carritoController.borrarProductoDeCarrito)



module.exports = carritos

