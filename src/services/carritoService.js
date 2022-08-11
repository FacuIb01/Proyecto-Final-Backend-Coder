const {carritoDao} = require("../daos/export");

async function crearCarrito () {
    try{
        await carritoDao.save()
        return true
    }catch(err){
        console.log(err.message)
    }
}

async function borrarCarrito(id){
    try{
        await carritoDao.deleteById(id)
        return true
    }catch(err){
        console.log(err.message)
    }
}


async function obtenerProductos(id){
    try {
        let productos = await carritoDao.getProductos(id)
        return productos
    } catch (error) {
        console.log(error)
    }
}


async function eliminarProductos(idCarrito, idProducto){
    try {
        await carritoDao.eliminarProducto(idCarrito, idProducto)
        return true
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    crearCarrito,
    borrarCarrito,
    obtenerProductos,
    eliminarProductos,
}