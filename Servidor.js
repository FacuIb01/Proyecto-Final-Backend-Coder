const express = require('express');
const session = require('express-session');
const carritos  = require('./src/routes/carritoRouter.js');
const productos = require('./src/routes/productosRouter.js');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./src/models/usuariosModel');
const cluster = require('cluster');
const {mongoUri, modo, PORT} = require('./src/config/global.js')
const handlebars = require('express-handlebars');
const path = require('path');
const createHash = require('./src/utils/hashGenerator');
const {passValidator} = require('./src/utils/passValidator');
const {sendEmailRegister} = require('./src/utils/sendEmail');

const DAOChatMongoDB = require("./src/daos/chat/DAOChatMongoDB")
const chat = new DAOChatMongoDB()
const {logError, logConsola} = require('./src/logs/log4js');
const usuariosRouter = require('./src/routes/usuariosRouter');
const gzip = require('compression');

const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const app = express();
const {Server: IOServer } = require('socket.io');
const {Server: HTTPServer} = require('http')
const https = new HTTPServer(app)
const io = new IOServer(https)


if(cluster.isMaster && modo === 'cluster'){
    const cpus = require('os').cpus().length;
    for(let i = 0; i < cpus; i++){
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork()
    }
)}else{
    // app.listen(PORT, () => {
    //     logConsola.info(`Servidor corriendo en el puerto ${PORT}`)
    // })
    https.listen(PORT, () => {
        logConsola.info(`Servidor corriendo en el puerto ${PORT}`)
    })
}



//************** */
//**** HANDLEBARS*****/
//************** */

app.engine("hbs", handlebars.engine({
    extname: ".hbs", ///extension of the file
    defaultLayout: "index.hbs", ///layout por defecto
    layoutsDir: __dirname + "/src/views/layouts",  ///ruta de los layouts
    partialDir: __dirname + "/src/views/partials", ///ruta de los partials
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))

app.set('view engine', 'hbs');
app.set('views', __dirname + "/src/views");

//************** */
//**** HANDLEBARS*****/
//************** */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoUri,
        mongoOptions: advancedOptions,
        ttl: 6000,
    }),
    secret: "coder",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(gzip());
app.use("/api/productos", productos);
app.use("/api/carrito", carritos)
app.use("/", usuariosRouter)

//******************** */
//*******PASSPORT***** */
//******************** */





passport.use('login', new LocalStrategy ({usernameField: "email"},(email, password, callback) => {
    try{
        UserModel.findOne({ email: email }, (err, user) => {
            if (err) {
                return callback(err);
            }
            if (!user) {
                return callback(null, false);
            }
            if (!passValidator(user,password )) {
                return callback(null, false);
            }
            return callback(null, user);
        }
        )
    }catch(err){
        logError.error(err);
    }
}))

passport.use("signup", new LocalStrategy({passReqToCallback: true},(req, username, password, callback)=>{
    try {
        UserModel.findOne({username:username}, (err, user)=>{
            
            if(err){
                return callback(err)
            }
            if(user){
                logError.error("El usuario ya existe");
                return callback(null, false)
            }
    
    
            const newUser = {
                email: req.body.email,
                password: createHash(password),
                username: username,
                direccion: req.body.direccion,
                edad: req.body.edad,
                numero: req.body.numero,
                avatar: req.file.originalname,
            }
    
            UserModel.create(newUser, (err, usuarioConId)=>{
                if (err) {
                    logError.error("Hay un error al crear el usuario");
                    return callback(err)
                }
    
                logConsola.info("Usuario registrado con éxito");
                return callback(null, usuarioConId)
            })

            sendEmailRegister(newUser)
        })
        
    } catch (error) {
        logError.error(err);
    }
}))


passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    UserModel.findById(id, callback)
})


//******************** */
//*******PASSPORT***** */
//******************** */



//******************** */
//*******SOCKET***** */
//******************** */

io.on("connection", async (socket) => {
    const mensajes = await chat.getAll()

    socket.emit("mensajes", mensajes)

    socket.on("enviarMensajes",async (data) => {
        await chat.save(data)
        
        socket.emit("mensajes", await chat.getAll())
    })
})



//******************** */
//*******SOCKET***** */
//******************** */



app.use(function (err, req, res, next) {
    res.status(500).json({
        mensaje: "Error interno del servidor",
        error:  err.message
        
    })
})



app.get("*", (req, res)=>{
    res.json({
        mensaje: "Pagina no encontrada",
        error: "404",
        url: req.url,
        metodo: req.method
    })
})
