const args = require("../utils/yargs.js")

const DAOCarritoArchivo = require("./carritos/DAOcarritoArchivo")
const DAOCarritoFB = require("./carritos/DAOcarritoFB")
const DAOCarritoMongoDB = require("./carritos/DAOcarritoMongoDB")


const DAOChatMongoDB = require("./chat/DAOChatMongoDB.js")
const DAOordenesMongoDB = require("./ordenes/DAOordenesMongoDB.js")

const DAOProductosArchivo = require("./productos/DAOProductosArchivo")
const DAOProductosFB = require("./productos/DAOProductosFireBase")
const DAOProductosMongoDB = require("./productos/DAOProductosMongoDB")



class dbFactory{
    createDAOS(database = args.db ? args.db : "MongoDB"){
        if(database === "firebase"){
            return {
                carritoDao: new DAOCarritoFB(),
                productoDAO: new DAOProductosFB()
            }
        }else if(database === "Archivo"){
            return {
                carritoDao: new DAOCarritoArchivo(),
                productoDAO: new DAOProductosArchivo()
            }
        }else if(database === "MongoDB"){
            return {
                carritoDao: new DAOCarritoMongoDB(),
                productoDAO: new DAOProductosMongoDB(),
                chatDAO: new DAOChatMongoDB(),
                ordenesDAO: new DAOordenesMongoDB()
                
            }
        }
    }
}

let dao = new dbFactory()


module.exports = dao.createDAOS()