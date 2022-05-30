let admin = require("firebase-admin");

let serviceAccount = require("../coderhouse-backend-756db-firebase-adminsdk-n873t-3255792cbf.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log("Firebase Inicializado");

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
            console.log(error)
        }
    }

    async update(id, actualizacion){
        try {
            let docUpdate = this.collection.doc(`${id}`)
            let actualizar = await docUpdate.update(actualizacion) 
            console.log("Estudiante actualizado: ", actualizar);
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id){
        try {
            let docDelete = this.collection.doc(`${id}`)
            let borrado = await docDelete.delete()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

let dao = new ContenedorFB("productos")



module.exports = ContenedorFB

