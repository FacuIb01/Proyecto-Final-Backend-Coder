const schemaCarrito = require('../../models/schemaCarrito');
const ContenedorMongo = require("../../Contenedores/contenedorMongoDB");


class DAOcarrito extends ContenedorMongo{
    constructor(){
        super(schemaCarrito);
        this.id = 1
        this.checkId()
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
            console.log(error)
        }
    }
    async añadirProducto(id, producto){
            try{
                let carrito = await this.model.find({id: id})
                let productos = carrito[0].productos
                productos.push(producto)
                await this.model.updateOne({id: id}, {productos: productos})
            }catch(err){
                console.log(err)
            }
    }

    async getProductos(id){
        try {
            let carrito = await this.model.find({id:id})
            let productos = carrito[0].productos
            return productos
        } catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }


}


module.exports = DAOcarrito;