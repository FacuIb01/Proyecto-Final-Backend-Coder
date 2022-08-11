const {productoDAO} = require("../daos/export")


async function traerProductos (id){
    try{
        if(!id){
            let productos = await productoDAO.getAll()
            return productos

        }else{
            let producto = await productoDAO.getById(id)
            return producto
        }
    }catch(err){
        console.log(err)
    }
}

async function guardarEnCarrito (idCarrito, idProducto){
    try {
        let producto = await productoDAO.getById(idProducto)
        await carritoDao.añadirProducto(idCarrito, producto)
        return producto
    } catch (error) {
        console.log(error)
    }
}

async function borrarProducto(id){
    try {
        await productoDAO.deleteById(id)
        return true
    } catch (error) {
        console.log(error)
    }
}
async function actualizarProducto(id, producto){
    try {
        await productoDAO.update(id, producto)
        return true
    } catch (error) {
        console.log(error)
    }
}

async function guardarProducto(producto){
    try {
        let codigo = Math.floor((Math.random() * (22-1))+1);
        producto.timestamp = Date.now()
        producto.codigo = codigo
        await productoDAO.save(producto)
        return true
    }catch (error) {
        console.log(error)
    }
    producto.timestamp = Date.now()
    producto.codigo = codigo
    await productoDAO.save(producto)
}


module.exports ={
    traerProductos,
    guardarEnCarrito,
    borrarProducto,
    actualizarProducto,
    guardarProducto,
}