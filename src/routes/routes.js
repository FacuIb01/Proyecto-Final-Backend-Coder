const express = require('express');

const productos = express.Router();
const carritos = express.Router();





const {carritoDao, productoDAO} = require("../daos/export");







/*****************/
/***DAOCARRITOS**/
/*****************/

// const DAOCarritoFB = require("../src/daos/carritos/DAOcarritoFB.js")
// const carritoDao = new DAOCarritoFB()

// const DAOCarritoMongoDB = require("../src/daos/carritos/DAOcarritoMongoDB.js")
// const carritoDao = new DAOCarritoMongoDB()

// const DAOCarritoArchivo = require("../src/daos/carritos/DAOCarritoArchivo.js")
// const carritoDao = new DAOCarritoArchivo()

/*****************/
/***DAOCARRITOS**/
/*****************/




/*****************/
/***DAOPRODUCTOS**/
/*****************/

// const DAOfireBase = require("../src/daos/productos/DAOProductosFireBase.js")
// const productoDAO = new DAOfireBase()

// const DAOMongoDB = require("../src/daos/productos/DAOProductosMongoDB.js")
// const productoDAO = new DAOMongoDB()

// const DAOArchivo = require("../src/daos/productos/DAOProductosArchivo.js")
// const productoDAO = new DAOArchivo()


/*****************/
/***DAOPRODUCTOS**/
/*****************/


productos.get("/productoss", async (req, res) => {
    let productos = await productoDAO.getAll()

    res.json(productos)
})

productos.get("/:id?", async(req, res) => {
    try{
        let id = req.params.id;
        if(id == undefined){
            let productos = await productoDAO.getAll()
            
            res.render("productos")
        }else{
            let producto = await productoDAO.getById(id)
            res.send(producto)
        }
    }catch(err){
        res.json({
            mensaje: "Error al obtener los productos",
            error: err.message
        })
    }
})


productos.post("/", async (req, res)=>{
    let codigo = Math.floor((Math.random() * (22-1))+1);
    try{
        let producto = req.body
        producto.timestamp = Date.now()
        producto.codigo = codigo
        await productoDAO.save(producto)
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
})

productos.put("/:id", async (req, res)=>{
    try{
        let id = Number(req.params.id)
        await productoDAO.update(id, req.body)
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
})

productos.delete("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    try{
        await productoDAO.deleteById(id)
        res.send("Producto Eliminado!")
    }catch(error){
        res.json({
            mensaje: "Error al eliminar el producto",
            error
        })
    }
})

//PRODUCTOS


//CARRITOS


carritos.post("/", async (req, res)=> {
    try {
        await carritoDao.save()
        res.send("Carrito Creado!")
    } catch (error) {
        res.json({
            mensaje: "Error al ingresar el carrito",
            error: error.message
        })
    }
})



carritos.delete("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    try{
        await carritoDao.deleteById(id)
            res.send("Eliminado!")
    }catch(error){
        res.json({
            mensaje: "Error al eliminar el carrito",
            error
        })
    }
})


productos.post("/:id/productos" , async (req, res) => {
    let idCarrito = Number(req.params.id)
    let idProducto = Number(req.body.id)
    try{
        let producto = await productoDAO.getById(idProducto)
        await carritoDao.añadirProducto(idCarrito, producto)
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
})

carritos.get("/:id/productos", async (req, res) =>{
    try {
        let id = Number(req.params.id)
        let productos = await carritoDao.getProductos(id)
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

})


carritos.delete("/:id/productos/:id_prod", async (req, res)=>{
    let idCarrito = Number(req.params.id) 
    let idProducto = Number(req.params.id_prod)

    try{
        await carritoDao.eliminarProducto(idCarrito, idProducto)
        res.send("Producto Eliminado!")
    }catch(error){
        res.json({
            mensaje: "Error al eliminar el producto",
            error
        })
    }
})

//CARRITOS

//USUARIOS

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
  }

//USUARIOS

module.exports = {productos, carritos,}

