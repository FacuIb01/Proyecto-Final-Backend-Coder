const {ordenesDAO} = require("../daos/export")
const { logError } = require("../logs/log4js")

async function generarOrden (productos, email){
    try {
        let orden = ordenesDAO.save(productos, email)
    } catch (error) {
        logError.error(error)
    }
}

module.exports = {
    generarOrden,
}