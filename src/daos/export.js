const args = require("../utils/yargs.js")

const DAOCarritoArchivo = require("./Carritos/DAOcarritoArchivo")
const DAOCarritoFB = require("./Carritos/DAOcarritoFB")
const DAOCarritoMongoDB = require("./Carritos/DAOcarritoMongoDB")

const DAOProductosArchivo = require("./Productos/DAOProductosArchivo")
const DAOProductosFB = require("./Productos/DAOProductosFireBase")
const DAOProductosMongoDB = require("./Productos/DAOProductosMongoDB")

// if(process.env.DB === "firebase"){
//     module.exports= {
//         carritoDao: new DAOCarritoFB(),
//         productoDAO: new DAOProductosFB()
//     }
// }else if(process.env.DB === "Archivo"){
//     module.exports= {
//         carritoDao: new DAOCarritoArchivo(),
//         productoDAO: new DAOProductosArchivo()
//     }
// }else if(process.env.DB === "MongoDB"){
//     module.exports= {
//         carritoDao: new DAOCarritoMongoDB(),
//         productoDAO: new DAOProductosMongoDB()
//     }
// }

///////////////////////////////////////////////////////////////////////////////////////////////

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
                productoDAO: new DAOProductosMongoDB()
            }
        }
    }
}

let dao = new dbFactory()

module.exports = dao.createDAOS()