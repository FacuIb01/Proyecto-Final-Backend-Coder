const logjs = require('log4js');

logjs.configure({
    appenders:{
        loggerConsole: {type: 'console'}, //Estos son los logs en la consola
        logError:{type: "file", filename: "error.log"}, //Estos son los logs en un archivo, los creara y guardara los logs en el archivo
    },
    categories:{
        default: {appenders: ['loggerConsole'], level: 'trace'}, //Estos son los logs en la consola y en un archivo
        consola:{appenders: ["loggerConsole"], level: "debug"},
        error:{appenders: ["logError"], level: "error"},
}})




module.exports = {
    logError: logjs.getLogger("error"),
    logConsola: logjs.getLogger("consola"),
};