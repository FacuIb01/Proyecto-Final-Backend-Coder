const ContenedorFB = require('../../Contenedores/ContenedorFireBase');
const { logError } = require('../../Logs/Log4js');


class DAOfireBase extends ContenedorFB{
    static instance
    constructor(){
        super("productos")
        this.id = 0
        this.checkId()
        if(!!DAOfireBase.instance){
            return DAOfireBase.instance
        }else{
            DAOfireBase.instance = this
            return this
        }
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
            logError.error(err);
        }
    }
}






module.exports = DAOfireBase;