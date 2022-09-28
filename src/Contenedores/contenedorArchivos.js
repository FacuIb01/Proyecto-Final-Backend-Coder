const fs = require('fs');
const {logError} = require("../logs/log4js")

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
            logError.error(err);
        }
    }

    
    getAll(){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            let array = JSON.parse(data);
            return array
        }catch(err){
            logError.error(err);
        }
    }
    
    deleteById(id){
        try {
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
        } catch (err) {
            logError.error(err);
        }
    }

    deleteAll(){
        try {
            fs.writeFileSync(this.ruta, '');
        } catch (err) {
            logError.error(err);
        }
    }
}

module.exports = ContenedorArchivo

