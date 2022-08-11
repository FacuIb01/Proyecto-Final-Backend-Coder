const {Router} = require("express")
const productos = Router()

const productosController = require("../controllers/productosController")


productos.get("/:id?", productosController.productos) 

productos.post("/", productosController.guardarProducto)

productos.put("/:id", productosController.actualizarProducto)

productos.delete("/:id", productosController.borrarProducto) 

productos.post("/:id/productos", productosController.guardarEnCarrito)

module.exports = productos