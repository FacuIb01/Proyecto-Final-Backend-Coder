const fs = require('fs');
const Carrito = require(`../../contenedores/contenedorArchivos.js`)
const {logError, logConsola} = require("../../logs/log4js")


class DAOcarritoArchivo extends Carrito{
    static instance
    constructor(){
        super("db/carrito.json") //cambiar el path
        if(!!DAOcarritoArchivo.instance){
            return DAOcarritoArchivo.instance
        }else{
            DAOcarritoArchivo.instance = this
            return this
        }
    }

    //crea un carrito
    save(){
        try{
            let carrito = {
                id:this.id,
                timestamp: Date.now(),
                productos: []
            }

            let data = fs.readFileSync(this.ruta, 'utf8');
            let carritos = JSON.parse(data)
            if(carritos === []){
                carritos = [carrito];
            fs.writeFileSync(this.ruta, JSON.stringify(carritos,null,2));
            }else{
                let carritos = JSON.parse(data)
                carritos.push(carrito)
            fs.writeFileSync(this.ruta, JSON.stringify(carritos,null,2));
            }
            this.id++
            return carrito.id
        }catch(err){
            logError.error(err);
        }
        }

    //borra un carrito utilizando el id del mismo.
    borrarPorId(id){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            let carritos = JSON.parse(data)
            if(carritos === []){
                return undefined
            }else{
                let carrito = carritos.find(obj => obj.id === id)
                if(carrito === undefined){
                    logError.error("producto inexistente");
                }else{
                    let index = carritos.indexOf(carrito)
                    carritos.splice(index,1)
                    fs.writeFileSync(this.ruta, JSON.stringify(carritos,null,2))
                }
            }
        }catch(err){
            logError.error(err);
        }
    }

    //obtiene los productos del carrito indicado por id
    getProductos(id){
        try{
            let data = fs.readFileSync(this.ruta, "utf-8")
            let carritos = JSON.parse(data)
            if(carritos === []){
                return undefined
            }else{
                let carrito = carritos.find(obj => obj.id === id)
                return carrito.productos
            }
        }catch(err){
            logError.error(err);
        }
    }

    //añade un producto (el cual debe ser un objeto), a un carrito en especifico utilizando su id
    añadirProducto(id, producto){
        try{
            let data = fs.readFileSync(this.ruta, "utf-8")
            let carritos = JSON.parse(data)
            if(carritos === []){
                return undefined
            }else{
                let carrito = carritos.find(obj => obj.id === id)
                carrito.productos.push(producto)
                fs.writeFileSync(this.ruta, JSON.stringify(carritos, null, 2))
            }
        }catch(err){
            logError.error(err);
        }
    }

    //elimina un producto de un determinado carrito utilizando "id" como el id del carrito y "productoId" como el id del producto que querramos eliminar del mismo
    eliminarProducto(id,productoId){
        try{
            let data = fs.readFileSync(this.ruta, "utf-8")
            let carritos = JSON.parse(data)
            if(carritos === []){
                return undefined
            }else{
                let carrito = carritos.find(obj => obj.id === id)
                if(carrito === undefined){
                    return undefined
                }else{
                    let index = carrito.productos.findIndex(obj => obj.id === productoId)
                    if(index === -1){
                        return undefined
                    }else{
                        carrito.productos.splice(index, 1)
                        fs.writeFileSync(this.ruta, JSON.stringify(carritos, null, 2))
                        return carrito
                    }
                }
            }
        }catch(err){
            logError.error(err);
        }
    }
    
}




module.exports = DAOcarritoArchivo