const productosRepository = require("../repository/repository.js")
const {carritoDao} = require("../daos/export");
const { logError } = require("../logs/log4js.js");


async function traerProductos (id){
    try{
        if(!id){
            let productos = await productosRepository.getAll()
            return productos

        }else{
            let producto = await productosRepository.getById(id)
            return producto
        }
    }catch(err){
        logError.error(error)
    }
}

async function guardarEnCarrito (idCarrito, idProducto){
    try {
        let producto = await productosRepository.getById(idProducto)
        await carritoDao.añadirProducto(idCarrito, producto)
        return producto
    } catch (error) {
        logError.error(error)
    }
}

async function borrarProducto(id){
    try {
        await productosRepository.deleteById(id)
        return true
    } catch (error) {
        logError.error(error)
    }
}
async function actualizarProducto(id, producto){
    try {
        await productosRepository.update(id, producto)
        return true
    } catch (error) {
        logError.error(error)
    }
}

async function guardarProducto(producto){
    try {
        let codigo = Math.floor((Math.random() * (22-1))+1);
        producto.codigo = codigo
        await productosRepository.save(producto)
        return true
    }catch (error) {
        logError.error(error)
    }
}

async function traerProductosCategoria(categoria){
    try {
        let productos = await productosRepository.getByCategoria(categoria)
        return productos
    } catch (error) {
        logError.error(error)
    }
}


module.exports ={
    traerProductos,
    guardarEnCarrito,
    borrarProducto,
    actualizarProducto,
    guardarProducto,
    traerProductosCategoria,
}