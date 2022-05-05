const express = require('express');
const router = express.Router();
const router2 = express.Router();
const app = express();
const Carritos = require("./carrito")
const Productos = require("./productos")

let carrito = new Carritos ("./carrito.json")
let productos = new Productos ("./productos.json")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api/productos", router);
app.use("/api/carrito", router2)

app.listen(8080, ()=>{
    console.log("Servidor corriendo en el puerto 8080")
})


//PRODUCTOS

router.get("/:id?", (req, res) => {
    let id = req.params.id;
    if(id == undefined){
        res.send(productos.getAll())
    }else{
        res.send(productos.getById(id))
    }
})

router.post("/", (req, res)=>{
    var codigo = Math.floor((Math.random() * (22-1))+1);
    try{
        let producto = req.body
        producto.timestamp = Date.now()
        productos.save(producto, codigo)
        res.json({
            mensaje: "Producto Añadido",
            producto,
        })
    }catch(err){
        console.log(error)

    }
})

router.put("/:id", (req, res)=>{
    try{
        let id = Number(req.params.id)
        productos.update(id, req.body)
        res.json({
            mensaje: "producto editado!",
            producto: req.body
        })
    }catch(error){
        console.log(error)
    }
})

router.delete("/:id", (req, res)=>{
    let id = Number(req.params.id)
    try{
        productos.deleteById(id)
        res.send("Producto Eliminado!")
    }catch(error){
        console.log(error)
    }
})

//PRODUCTOS


//CARRITOS

router2.post("/", (req, res)=> {
    let id = carrito.crear()
    res.send(`${id}`)
})

router2.delete("/:id", (req, res)=>{
    let id = Number(req.params.id)
    try{
        if(carrito.borrarPorId(id) === undefined){
            res.send("No se han creado carritos aun")
        }else{
            carrito.borrarPorId(id)
            res.send("Carrito Eliminado!")
        }
    }catch(error){
        console.log(error)
    }
})

router.post("/:id/productos", (req, res) => {
    let idCarrito = Number(req.params.id)
    let idProducto = Number(req.body.id)
    try{
        let producto = productos.getById(idProducto)
        carrito.añadirProducto(idCarrito, producto)
        res.json({
            mensaje: "producto añadido!",
            producto: producto,
        })
    }catch(err){
        console.log(err)
    }
})

router2.get("/:id/productos", (req, res) =>{
    let id = Number(req.params.id)
    res.json({
        mensaje: "aca estan los productos",
        productos: carrito.getProductos(id)
    })
})


router2.delete("/:id/productos/:id_prod", (req, res)=>{
    let idCarrito = Number(req.params.id) 
    let idProducto = Number(req.params.id_prod)

    try{
        if(carrito.eliminarProducto(idCarrito, idProducto) === undefined){
            res.send("El carrito o el producto son indexistentes.")
        }else{
            res.send("Producto Eliminado!")
        }
    }catch(error){
        console.log(error)
    }
})

//CARRITOS

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({
        mensaje: "Error interno del servidor",
        error:  err.message

    })
})

app.get("*", (req, res)=>{
    res.json({
        mensaje: "Pagina no encontrada",
        error: "404",
        url: req.url,
        metodo: req.method
    })
})