let admin = require("firebase-admin");
const {Firebase} = require("..//config//global")
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


    async getAll(){
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
                    codigo: doc.data().codigo
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
    }

    async getById(id){
        try {
            let docById = this.collection.doc(`${id}`)
            let doc = await docById.get()
            return doc.data()
        } catch (error) {
            logError.error(err);
        }
    }

    async update(id, actualizacion){
        try {
            let docUpdate = this.collection.doc(`${id}`)
            let actualizar = await docUpdate.update(actualizacion) 
            logConsola.info("Estudiante actualizado: ", actualizar);
        } catch (error) {
            logError.error(err);
        }
    }

    async deleteById(id){
        try {
            let docDelete = this.collection.doc(`${id}`)
            let borrado = await docDelete.delete()
            return true
        } catch (error) {
            logError.error(err);
            return false
        }
    }
}

let dao = new ContenedorFB("productos")



module.exports = ContenedorFB

