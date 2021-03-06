const fs = require('fs');
const ContenedorArchivo = require('../../Contenedores/contenedorArchivos');

class DAOproductosArchivo extends ContenedorArchivo{
    constructor(){
        super("db/productos.json")
    }
    save(objeto){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            objeto.id = this.id;
            let array = JSON.parse(data);
            array.push(objeto);
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
            this.id++
        }catch(error){
            console.log(error)
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
            return console.log("algo fallo!, solucionalo crack, te dejo el error: \n" + err);
        }
    }
}

let dao = new DAOproductosArchivo();

module.exports = DAOproductosArchivo;