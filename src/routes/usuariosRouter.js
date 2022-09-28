const {Router } = require("express")
const passport = require('passport');
const usuariosRouter = Router()
const upload = require('../utils/multer')
const usuariosController = require('../controllers/usuariosController.js')




usuariosRouter.get("/", usuariosController.inicio)

usuariosRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failLogin"}), usuariosController.loginPost)

usuariosRouter.get("/failLogin", usuariosController.failLogin)

usuariosRouter.get("/home", usuariosController.home)

usuariosRouter.get("/carrito", usuariosController.carrito)

usuariosRouter.get("/logout", usuariosController.logout)

usuariosRouter.get("/register", usuariosController.register)

usuariosRouter.post("/register",upload.single("avatar"), passport.authenticate("signup", {failureRedirect: "/failRegister", successRedirect: "/home"}),)

usuariosRouter.get("/failRegister", usuariosController.failRegister)


usuariosRouter.get("/productos", usuariosController.productos)

usuariosRouter.post("/finalizarCompra", usuariosController.finalizarCompra)


usuariosRouter.get("/compraFinalizada", usuariosController.compraFinalizada)

usuariosRouter.get("/chat", usuariosController.chat)

usuariosRouter.get("/chat/:email", usuariosController.chatPropio)



module.exports = usuariosRouter;