const { logError } = require("../logs/log4js");
const {chatDAO} = require("../daos/export")



async function chatPropio(email){
    try {
        let mensajes = await chatDAO.getByUser(email)
        if(mensajes.length === 0){
            return false
        }else{
            return mensajes
        }
    } catch (error) {
        logError.error(error)
    }
}

module.exports = {
    chatPropio
}