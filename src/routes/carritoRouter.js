const express = require('express');
const carritos = express.Router();
const carritoController =  require("../Controllers/CarritoController");


carritos.post("/", carritoController.crearCarrito)


carritos.delete("/:id", carritoController.borrarCarrito)


carritos.get("/:id/productos", carritoController.obtenerProductosCarrito)


carritos.delete("/:id/productos/:id_prod", carritoController.borrarProductoDeCarrito)



module.exports = carritos

