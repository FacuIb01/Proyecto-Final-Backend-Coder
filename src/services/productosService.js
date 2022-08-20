const productosRepository = require("../Repository/Repository.js")





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
        console.log(err)
    }
}

async function guardarEnCarrito (idCarrito, idProducto){
    try {
        let producto = await productosRepository.getById(idProducto)
        await carritoDao.añadirProducto(idCarrito, producto)
        return producto
    } catch (error) {
        console.log(error)
    }
}

async function borrarProducto(id){
    try {
        await productosRepository.deleteById(id)
        return true
    } catch (error) {
        console.log(error)
    }
}
async function actualizarProducto(id, producto){
    try {
        await productosRepository.update(id, producto)
        return true
    } catch (error) {
        console.log(error)
    }
}

async function guardarProducto(producto){
    try {
        let codigo = Math.floor((Math.random() * (22-1))+1);
        producto.codigo = codigo
        await productosRepository.save(producto)
        return true
    }catch (error) {
        console.log(error)
    }
}


module.exports ={
    traerProductos,
    guardarEnCarrito,
    borrarProducto,
    actualizarProducto,
    guardarProducto,
}