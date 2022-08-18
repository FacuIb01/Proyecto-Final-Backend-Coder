function productoDTO (productos, id){

    if(!id){
        return productos
    }else{
        let producto = {
            ...productos,
            id: id
        }
        return producto
    }
}

module.exports = productoDTO;