const {Router } = require("express")
const passport = require('passport');
const usuariosRouter = Router()
const upload = require('../Utils/Multer')
const usuariosController = require('../Controllers/UsuariosController.js')




usuariosRouter.get("/", usuariosController.inicio)

usuariosRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failLogin"}), usuariosController.loginPost)

usuariosRouter.get("/failLogin", usuariosController.failLogin)

usuariosRouter.get("/home", usuariosController.home)

usuariosRouter.get("/carrito", usuariosController.carrito)

usuariosRouter.get("/logout", usuariosController.logout)

usuariosRouter.get("/register", usuariosController.register)

usuariosRouter.post("/register",upload.single("avatar"), passport.authenticate("signup", {failureRedirect: "/failRegister"}),)

usuariosRouter.get("/failRegister", usuariosController.failRegister)


usuariosRouter.get("/productos", usuariosController.productos)

usuariosRouter.post("/finalizarCompra", usuariosController.finalizarCompra)


usuariosRouter.get("/compraFinalizada", usuariosController.compraFinalizada)



module.exports = usuariosRouter;