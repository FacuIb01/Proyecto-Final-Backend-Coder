require(`dotenv`).config()
const nodemailer = require('nodemailer');
const email = process.env.EMAIL

const { logError} = require("../logs/log4js");

const transporter = nodemailer.createTransport({
    tls:{
        rejectUnauthorized: false
    },
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: email,
        type: "OAuth2",
        clientId:"912496448996-bm6v3kosi39v6g4ip1p1vh7o89at99of.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken:"1//04PpD1fza9GumCgYIARAAGAQSNgF-L9IrZnswBQ40RkLdME5xzL8AUJDJtEipi2yTG8o4XtMkYTz4h7KlkqLkDrtJWajToVLpcA",
        accessToken:"ya29.a0Aa4xrXPRm9mjyEvWNuzFi_bYXvpGq19ujpyHtTsdFNO_5MCALe7AS0B7uLXv3EYYBPd9QdnfyORtGUFMOv8oXjpe7wPHsFkEkg5zSogyUffhK0-s4ErxYzDccPKeBDmMgsVJWSFcBvZpWumYfAm1jo6t1GRFaCgYKATASARASFQEjDvL9OgbAN_VIw3IbW3vRSz34aQ0163"
    } 
})


async function sendEmailCarrito(user, carrito){

    try{
        let productos = ""
        carrito.forEach((producto)=>{
            productos += `<li>${producto.nombre}</li>`
        })
    
        const mailoptions = {
            from: "Test",
            to: email,
            subject: `Nuevo pedido de productos de ${user.username}`,
            html: `<h1>Informacion del pedido</h1>
            <h2>email: ${user.email}</h2>
            <h2>nombre: ${user.username}</h2>
            <ul>
            ${productos}
            </ul>`
        }
    
        const info = await transporter.sendMail(mailoptions);

    }catch(err){
        logError.error(err);
    }

}



async function sendEmailRegister (user){
    try {
        const mailoptions = {
            from: "Test",
            to: email,
            subject: "Nuevo usuario ingresado",
            html: `<h1>Informacion del usuario</h1>
            <ul><li>email: ${user.email}</li>
            <li>username: ${user.username}</li>
            <li>password: ${user.password}</li>
            <li>direccion: ${user.direccion}</li>
            <li>edad: ${user.edad}</li>
            <li>numero: ${user.numero}</li>
            </ul>`
        }
        const info = await transporter.sendMail(mailoptions);
    } catch (err) {
        logError.error(err);
    }
}


module.exports = {sendEmailRegister, sendEmailCarrito,}