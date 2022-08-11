const {sendEmailCarrito} = require('../utils/sendEmail.js');
const {sendSms, sendWsp} = require('../utils/sendMessage.js');

async function inicio (req, res) {
    if(req.isAuthenticated()){
        res.redirect("/home")
    }else{
        res.render("login")
    }
}

async function loginPost (req, res) {
    if(req.isAuthenticated()){
        res.redirect("/home")
    }else{
        res.redirect("/")
    }
}

async function failLogin (req, res) {
    res.render("failLogin")
}

async function home (req, res) {
    if(req.isAuthenticated()){
        res.render("home", {user: req.user})
    }else{
        res.redirect("/")
    }
}

async function carrito (req, res) {
    if(req.isAuthenticated()){
        res.render("carrito")
    }else{
        res.redirect("/")
    }
}

async function logout (req, res) {
    req.logout((err) => {
        if(!err){
            res.redirect("/")
        }
    })
    
}

async function register (req, res)  {
    res.render("register")
}

async function registerPost (req, res) {
    res.redirect("/home")
}

async function failRegister (req, res) {
    res.render("failRegister")
}

async function productos (req, res) {
    if(req.isAuthenticated()){
        res.render("productos")
    }else{
        res.redirect("/")
    }
}


async function finalizarCompra (req, res) {
    try {
        const carrito = req.body
        const usuario = req.user
        sendEmailCarrito(usuario, carrito.carrito)
        sendWsp(usuario, carrito.carrito)
        sendSms(usuario)
        res.send("Compra Finalizada!")
    }catch(err){
        logError.error(err);
    }
}

async function compraFinalizada (req, res) {
    res.render("compraFinalizada")
}

module.exports = {
    inicio,
    loginPost,
    failLogin,
    home,
    carrito,
    logout,
    register,
    registerPost,
    failRegister,
    productos,
    finalizarCompra,
    compraFinalizada,
}