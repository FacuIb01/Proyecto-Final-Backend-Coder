const schemaCarrito = require('../../Models/SchemaCarrito');
const ContenedorMongo = require("../../Contenedores/ContenedorMongoDB");
const {logError} = require("../../Logs/Log4js");
const DTOProductos = require("../../DTO/DTOProductos");


class DAOcarrito extends ContenedorMongo{

    static instancia
    constructor(){
        super(schemaCarrito);
        this.id = 1
        this.checkId()
        if(!!DAOcarrito.instancia){
            return DAOcarrito.instancia
        }else{
            DAOcarrito.instancia = this
            return this
        }
    }


    async checkId(){
        let carritos = await this.getAll()
        if(carritos.length > 1) {
            this.id = parseInt(carritos[carritos.length - 1].id) + 1
        }
    }
    async save(){
        try {
            let carrito ={
                id: this.id,
                productos: [],
            }
            await this.model.create(carrito)
            this.id++
        } catch (error) {
            logError.error(err);
        }
    }
    async añadirProducto(id, producto){
            try{
                let carrito = await this.model.find({id: id})
                let productos = carrito[0].productos
                productos.push(producto)
                await this.model.updateOne({id: id}, {productos: productos})
            }catch(err){
                logError.error(err);
            }
    }

    async getProductos(id){
        try {
            let carrito = await this.model.find({id:id})
            let productos = carrito[0].productos
            return productos
        } catch (error) {
            logError.error(err);
        }
    }

    async eliminarProducto(idCarrito, idProducto){
        try {
            let carrito = await this.model.find({id:idCarrito})
            let index = carrito[0].productos.findIndex(e => e.id === idProducto)
            carrito[0].productos.splice(index, 1)
            await this.model.updateOne({id:idCarrito}, {productos: carrito[0].productos})
            return "borrado"
        } catch (error) {
            logError.error(err);
        }
    }


}


module.exports = DAOcarrito;