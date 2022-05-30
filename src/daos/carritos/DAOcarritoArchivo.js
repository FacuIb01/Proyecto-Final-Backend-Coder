const fs = require('fs');
const Carrito = require(`../../Contenedores/contenedorArchivos.js`)
///No pude hacer que me lo requiera bien xd cambiar el path al usar.


class DAOcarritoArchivo extends Carrito{
    constructor(){
        super("db/carrito.json") //cambiar el path
    }

    save(){
        let carrito = {
            id:this.id,
            timestamp: Date.now(),
            productos: []
        }
        try{
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
        }catch(error){
            console.log(error)
        }
        }

    borrarPorId(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        try{
            let carritos = JSON.parse(data)
            if(carritos === []){
                return undefined
            }else{
                let carrito = carritos.find(obj => obj.id === id)
                if(carrito === undefined){
                    console.log("Producto inexistente")
                }else{
                    let index = carritos.indexOf(carrito)
                    carritos.splice(index,1)
                    fs.writeFileSync(this.ruta, JSON.stringify(carritos,null,2))
                }
            }
        }catch(error){
            console.log(error)
        }
    }

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
            console.log(err)
        }
    }

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
            console.log(err)
        }
    }

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
            console.log(err)
        }
    }
    
}

let dao = new DAOcarritoArchivo()




module.exports = DAOcarritoArchivo