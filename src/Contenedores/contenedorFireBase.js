let admin = require("firebase-admin");
const {Firebase} = require("../config/global")
const FIREBASE_PATH = require(Firebase)
const {logError, logConsola} = require("../logs/log4js")


admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_PATH),
});


const db = admin.firestore()

class ContenedorFB{
    constructor(coleccion){
        this.collection = db.collection(coleccion)
        this.coleccionNombre = coleccion
    }

    //obtiene todos los documentos dependiendo de la collection
    async getAll(){
        try {
            let collection = await this.collection.get() 
            let docs = collection.docs
            const docsArray = docs.map(doc => {
                if(this.coleccionNombre === "productos"){
                    return {
                        id: doc.id,
                        nombre: doc.data().nombre,
                        precio: doc.data().precio,
                        img: doc.data().img,
                        descripcion: doc.data().descripcion,
                        timestamp: doc.data().timestamp,
                        codigo: doc.data().codigo,
                        categoria: doc.data().categoria,
                    }
                }else if(this.coleccionNombre === "carritos"){
                    return {
                        id: doc.id,
                        timestamp: doc.data().timestamp,
                        productos: doc.data().productos
                    }
                }
            })
            return docsArray

        } catch (err) {
            logError.error(err);
        }
    }

    //obtiene un documento por su ID
    async getById(id){
        try {
            let docById = this.collection.doc(`${id}`)
            let doc = await docById.get()
            return doc.data()
        } catch (err) {
            logError.error(err);
        }
    }

    //actualiza un documento, "actualizacion" debe ser un objeto con las actualizaciones
    async update(id, actualizacion){
        try {
            let docUpdate = this.collection.doc(`${id}`)
            let actualizar = await docUpdate.update(actualizacion) 
        } catch (err) {
            logError.error(err);
        }
    }

    async deleteById(id){
        try {
            let docDelete = this.collection.doc(`${id}`)
            let borrado = await docDelete.delete()
            return true
        } catch (err) {
            logError.error(err);
            return false
        }
    }
}




module.exports = ContenedorFB

