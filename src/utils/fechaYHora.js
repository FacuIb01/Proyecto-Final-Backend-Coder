let date = new Date()

function fechaYHora (){
    let horas = date.getHours()
    let minutos = date.getMinutes()
    let dia = date.getDay()
    let mes = date.getMonth()

    return `${dia}/${mes}  ${horas}:${minutos}`
}

module.exports = fechaYHora