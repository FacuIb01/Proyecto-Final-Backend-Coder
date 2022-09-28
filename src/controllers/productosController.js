const { logError } = require("../logs/log4js");
const productosService = require("../services/productosService")

async function productos (req, res) {
    try{
        let id = req.params.id;
        if(!id){
            let productos = await productosService.traerProductos()
            res.status(200).json(productos)
        }else{
            let producto = await productosService.traerProductos(id)
            res.status(200).json(producto)
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
        res.status(200).json({
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
        res.status(200).json({
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
        res.status(200).send("Producto Eliminado!")
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

async function productosCategoria (req, res) {
    try {
        let categoria = req.params.categoria
        let productos = await productosService.traerProductosCategoria(categoria)
        console.log(productos)
        res.json({
            mensaje: "productos filtrado por categoria",
            productos: productos
        })
    } catch (error) {
        logError.error(error)
        res.json({
            mensaje: "error al buscar productos",
            error: "que pedo"
        })
    }
}

module.exports = {
    productos,
    guardarProducto,
    actualizarProducto,
    borrarProducto,
    guardarEnCarrito,
    productosCategoria,
}