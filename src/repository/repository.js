const  {productoDAO} = require("../daos/export.js")
const productoDTO = require("../dto/DTOProductos")

class RepositoryProductos{
    constructor(){
        this.dao = productoDAO
    }

    async getAll(){
        let productos = await this.dao.getAll()
        let productosDTO = productos.map(producto => productoDTO(producto))
        return productosDTO
    }

    async getById(id){
        let producto = await this.dao.getById(id)
        let productosDTO = productoDTO(producto)
        return productosDTO
    }

    async save(producto){
        let id = this.dao.id
        this.dao.save(productoDTO(producto, id))
        return true
    }

    async update(id, objeto){
        this.dao.update(id, objeto)
        return true
    }

    async deleteById(id){
        this.dao.deleteById(id)
        return true
    }

    async getByCategoria(categoria){
        let productos = await this.dao.getByCategory(categoria)
        return productos
    }
}


module.exports =  new RepositoryProductos;