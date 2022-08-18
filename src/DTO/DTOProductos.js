function productoDTO (productos, id){
    return {
        ...productos,
        id,
    }
}

module.exports = productoDTO;