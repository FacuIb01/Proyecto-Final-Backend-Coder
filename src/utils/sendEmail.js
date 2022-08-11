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
        refreshToken:"1//04aOYEDuhJMKxCgYIARAAGAQSNgF-L9IramQU0rE6JLNnjZ5YS7vPMpg_PnhP-E2nAA_ogjIkjwg1r8Bsp9SW4b3uT22Veq2PlQ",
        accessToken:"ya29.A0AVA9y1uSR8ckcFyWj6EQkH47zl607KQEq3Q4nVPCaQYb1VsinlHmPqkmY0MyeH_2I7UPkJWxpdfqVvy4EK8gWi9g5RKXvOAjUBBPhFpq-hwLyALWSV6EDGE202BxSeAvTttZPr3c8LBCVrxldvrj0fGm9AWAYUNnWUtBVEFTQVRBU0ZRRTY1ZHI4TllOWFJuQnZ0M1NJWFBQQVBuSnVfUQ0163"
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