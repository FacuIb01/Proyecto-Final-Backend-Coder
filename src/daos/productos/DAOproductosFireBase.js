const ContenedorFB = require('../../Contenedores/contenedorFireBase');

class DAOfireBase extends ContenedorFB{
    constructor(){
        super("productos")
        this.id = 0
        this.checkId()
    }

    async checkId(){
        let productos = await this.getAll()
        if(productos.length > 0) {
            this.id = parseInt(productos[productos.length - 1].id) + 1
        }
    }

    async save(producto){
        try {
            let doc = this.collection.doc(`${this.id}`)
            await doc.create(producto)
            this.id++
        } catch (error) {
            console.log(error)
        }
    }
}






module.exports = DAOfireBase;