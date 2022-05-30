const express = require('express');
const { productos, carritos } = require('../routes/routes.js');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api/productos", productos);
app.use("/api/carrito", carritos)

app.listen(8080, ()=>{
    console.log("Servidor corriendo en el puerto 8080")
})



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