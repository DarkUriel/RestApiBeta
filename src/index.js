const { urlencoded } = require('express');
const express = require('express');
const fs = require('fs')
const path = require('path');
const app = express();
const config = require('../config.json')
const cors = require('cors')

//configuraciones
const puerto = config.puerto;
app.use(cors());
app.set('port', process.env.PORT || puerto);
app.use(urlencoded({extended: false}));
app.use(express.json())

//iniciando servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado', app.get('port'));
})

//Rutas
app.use('/login', require('./routes/Login'))