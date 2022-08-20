const fs = require('fs');
const {logError} = require("../Logs/Log4js")

class ContenedorArchivo {
    constructor(ruta) {
        this.id = 1,
        this.ruta = ruta;
    }



    getById(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        try{
            let array = JSON.parse(data);
            let objeto = array.find(obj => obj.id == id);
            if(objeto === undefined){
                return undefined
            }
            return objeto
        }catch(err){
            return logError.error(err);
        }
    }

    
    getAll(){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            let array = JSON.parse(data);
            return array
        }catch(err){
            return logError.error(err);
        }
    }
    
    deleteById(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        let array = JSON.parse(data);
        let objeto = array.find(obj => obj.id === id);
        if(objeto == undefined){
            return undefined
        }else{
            let index = array.indexOf(objeto);
            array.splice(index, 1);
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
        }
    }

    deleteAll(){
        fs.writeFileSync(this.ruta, '');
    }
}

module.exports = ContenedorArchivo

