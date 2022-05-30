require(`dotenv`).config()

const DAOCarritoArchivo = require("../daos//carritos//DAOcarritoArchivo")
const DAOCarritoFB = require("../daos//carritos//DAOcarritoFB")
const DAOCarritoMongoDB = require("../daos//carritos//DAOcarritoMongoDB")

const DAOProductosArchivo = require("../daos//productos//DAOProductosArchivo")
const DAOProductosFB = require("../daos//productos//DAOProductosFireBase")
const DAOProductosMongoDB = require("../daos//productos//DAOProductosMongoDB")

if(process.env.DB === "firebase"){
    module.exports= {
        carritoDao: new DAOCarritoFB(),
        productoDAO: new DAOProductosFB()
    }
}else if(process.env.DB === "Archivo"){
    module.exports= {
        carritoDao: new DAOCarritoArchivo(),
        productoDAO: new DAOProductosArchivo()
    }
}else if(process.env.DB === "MongoDB"){
    module.exports= {
        carritoDao: new DAOCarritoMongoDB(),
        productoDAO: new DAOProductosMongoDB()
    }
}

