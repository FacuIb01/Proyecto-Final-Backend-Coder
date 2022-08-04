require('dotenv').config();
const numeroWsp = process.env.WSP 
const twilio = require('twilio');
const authToken = "d9c09cfb8b0e9d19f2cfc5d197cb5e42";
const accountSid = "AC87c21f570fdd185038bb64a2e8ce70d0"
const {logConsola, logError} = require("../logs/log4js");

const client = twilio(accountSid, authToken);




async function sendSms(usuario){
    try {

        const message = await client.messages.create({
            body: `Su pedido ha sido recibido y esta en proceso.`,
            from: "+13203968507",
            to: `+${usuario.numero}`
        })
        logConsola.info("Enviado" + message)
    } catch (error) {
        logError.error(err);
    }
}

async function sendWsp(usuario,pedido){
    try {
        let listado = ""
        pedido.forEach((producto)=>{
            listado += `${producto.nombre} \n`
        })
        const message = await client.messages.create({
            body: `nuevo pedido de ${usuario.username}. Productos pedidos: \n ${listado}`,
            from: "whatsapp:+14155238886",
            to: `whatsapp:${numeroWsp}`
        })
        logConsola.info("Enviado" + message)
    } catch (error) {
        logError.error(err);
    }
}

module.exports = {
    sendSms,
    sendWsp,
}