// Requerimiento de modulos
const express = require("express");
const path = require("path"); //con este modulo se unifican las rutas para identificarlas mejor
const methodOverride = require('method-override');
let session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors')


// Determinacion de variable global para ejecucion de express
const app = express();

// Determinacion de puerto asignable
const port = process.env.PORT || 3001;

// Determinacion de folder 'public' como archivos estaticos
app.use(express.static("./public")); 


app.use(express.urlencoded({ extended: false }));


// Determinacion del queryString para metodos HTTP
app.use(methodOverride('_method'));
app.use(express.json());


app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
    }));

//Requerimiento para cookies
app.use(cookies());

// uso cors para posibles problemas de llamados a un fetch
app.use(cors())

// Requerimiento index de ruteo
app.use("/", require("./routes/index.routes"));

// Ruta 404 
app.use((req, res, next)=>{
    res.status(404).render('not-found')
});

// Determinacion de puerto
app.listen(port, ()=>{
    console.log('Servidor funcionando en el puerto ' + port);
});

// Determinacion de ejs como view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

