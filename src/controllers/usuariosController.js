const {sendEmailCarrito} = require('../utils/sendEmail.js');
const {sendSms, sendWsp} = require('../utils/sendMessage.js');
const chatService = require("../services/chatService")
const ordenesService = require("../services/ordenesService")



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
        const email = req.user.email
        const carrito = req.body
        const usuario = req.user
        const ordenAGenerar = {
            items: carrito,
            email: email
        }
        const orden = await ordenesService.generarOrden(ordenAGenerar)
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

async function chat (req, res ){
    if(req.isAuthenticated()){
        res.render("chat", {user: req.user.email})
    }else{
        res.redirect("/")
    }
}

async function chatPropio(req, res){
    if(req.isAuthenticated()){
        let email = req.params.email
        let mensajes = await chatService.chatPropio(email)
        
        if(mensajes){
            res.render("chatPropio", {mensajes: mensajes})
        }else{
            res.render("chatPropio", {mensajes: false})
        }
    }else{
        res.redirect("/")
    }
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
    chat,
    chatPropio
}