const fs = require('fs');
const ContenedorArchivo = require('../../contenedores/contenedorArchivos');

class DAOproductosArchivo extends ContenedorArchivo{
    static instance
    constructor(){
        super("db/productos.json")
        if(!!DAOproductosArchivo.instance){
            return DAOproductosArchivo.instance
        }else{
            DAOproductosArchivo.instance = this
            return this
        }
    }
    save(objeto){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            let array = JSON.parse(data);
            array.push(objeto);
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
            this.id++
        }catch(error){
            logError.error(err);
        }
    }

    update(id, objetoNuevo){
        let data = fs.readFileSync(this.ruta, 'utf8');
        try{
            let array = JSON.parse(data);
            let objeto = array.find(obj => obj.id === id);
            if(objeto == undefined){
                throw "Ingrese un id valido"
            }else{
                let index = array.indexOf(objeto);
                let objetoViejo = array[index];
                objetoViejo.nombre = objetoNuevo.nombre;
                objetoViejo.precio = objetoNuevo.precio;
                objetoViejo.img = objetoNuevo.img;
                objetoViejo.descripcion = objetoNuevo.descripcion;
                fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
            }
        }catch(err){
            return logError.error(err);
        }
    }
}

let dao = new DAOproductosArchivo();

module.exports = DAOproductosArchivo;