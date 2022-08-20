require('dotenv').config();
const numeroWsp = process.env.WSP 
const twilio = require('twilio');
const authToken = "2f90f538ff8f45bd23b4c188646267a1";
const accountSid = "AC87c21f570fdd185038bb64a2e8ce70d0"
const {logConsola, logError} = require("../Logs/Log4js");

const client = twilio(accountSid, authToken);



async function sendSms(usuario){
    try {

        const message = await client.messages.create({
            body: `Su pedido ha sido recibido y esta en proceso.`,
            from: "+13203968507",
            to: `+${usuario.numero}`
        })
        logConsola.info("Enviado" + message)
    } catch (err) {
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
            body: `nuevo pedido de ${usuario.username}, email: ${usuario.email}. Productos pedidos: \n ${listado}`,
            from: "whatsapp:+14155238886",
            to: `whatsapp:${numeroWsp}`
        })
        logConsola.info("Enviado" + message)
    } catch (err) {
        logError.error(err);
    }
}

module.exports = {
    sendSms,
    sendWsp,
}