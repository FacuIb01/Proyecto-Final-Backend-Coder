const productosService = require("../Services/ProductosService")


async function productos (req, res) {
    try{
        let id = req.params.id;
        if(!id){
            let productos = await productosService.traerProductos()
            res.json(productos)
        }else{
            let producto = await productosService.traerProductos(id)
            res.json(producto)
        }
    }catch(err){
        res.json({
            mensaje: "Error al obtener los productos",
            error: err.message
        })
    }
}

async function guardarProducto (req, res) {
    try{
        let producto = req.body
        await productosService.guardarProducto(producto)
        res.json({
            mensaje: "Producto Añadido",
            producto,
        })
    }catch(err){
        res.json({
            mensaje: "Error al añadir el producto",
            err,
        })
    }
}

async function actualizarProducto (req, res) {
    try{
        let id = Number(req.params.id)
        let producto = req.body
        await productosService.actualizarProducto(id, producto)
        res.json({
            mensaje: "producto editado!",
            producto: req.body
        })
    }catch(error){
        res.json({
            mensaje: "Error al editar el producto",
            error
        })
    }
}

async function borrarProducto (req, res) {
    try{
        let id = Number(req.params.id)
        await productosService.borrarProducto(id)
        res.send("Producto Eliminado!")
    }catch(error){
        res.json({
            mensaje: "Error al eliminar el producto",
            error
        })
    }
}

async function guardarEnCarrito (req, res) {
    try{
        let idCarrito = Number(req.params.id)
        let idProducto = Number(req.body.id)
        let producto = await productosService.guardarEnCarrito(idCarrito, idProducto)
        res.json({
            mensaje: "producto añadido!",
            producto: producto,
        })
    }catch(err){
        res.json({
            mensaje: "Error al añadir el producto",
            err,
        })
    }
}

module.exports = {
    productos,
    guardarProducto,
    actualizarProducto,
    borrarProducto,
    guardarEnCarrito,
}