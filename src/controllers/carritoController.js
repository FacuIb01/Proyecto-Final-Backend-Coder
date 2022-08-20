const carritoService = require("../Services/CarritoService")


async function crearCarrito (req, res) {
    try {
        await carritoService.crearCarrito()
        res.send("Carrito Creado!")
    } catch (error) {
        res.json({
            mensaje: "Error al ingresar el carrito",
            error: error.message
        })
    }
}

async function borrarCarrito (req, res) {
    try{
            let id = Number(req.params.id)
            await carritoService.deleteById(id)
            res.send("Eliminado!")
    }catch(error){
        res.json({
            mensaje: "Error al eliminar el carrito",
            error
        })
    }
}
async function obtenerProductosCarrito (req, res) {
    try {
        let id = Number(req.params.id)
        let productos = await carritoService.obtenerProductos(id)
        res.json({
            mensaje: "aca estan los productos",
            productos: productos
        })
    } catch (error) {
        res.json({
            mensaje: "Error al obtener los productos",
            error: err.message
        })
    }

}

async function borrarProductoDeCarrito (req, res) {
    
    try{
        let idCarrito = Number(req.params.id) 
        let idProducto = Number(req.params.id_prod)
        await carritoService.eliminarProductos(idCarrito, idProducto)
        res.send("Producto Eliminado!")
    }catch(error){
        res.json({
            mensaje: "Error al eliminar el producto",
            error
        })
    }
}

module.exports = {
    crearCarrito,
    borrarCarrito,
    obtenerProductosCarrito,
    borrarProductoDeCarrito,
}