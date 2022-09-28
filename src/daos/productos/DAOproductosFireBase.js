const ContenedorFB = require('../../contenedores/contenedorFireBase');
const { logError } = require('../../logs/log4js');


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
        } catch (err) {
            logError.error(err);
        }
    }

    async getByCategory(category){
        try {
            const productosRef = this.collection;
            const snapshot = await productosRef.where('categoria', '==', category).get();
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }
            const productos = []
            
            snapshot.forEach(doc => {
            productos.push(doc.data())
            });
            return productos
        } catch (err) {
            logError.error(err);
        }

    }
}






module.exports = DAOfireBase;