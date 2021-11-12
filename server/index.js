const express = require('express')
const cors = require('cors');
const app = express();
const path = require('path'); // saber en que S.O nos encontramos y poner las barras direccionales correctas => / O \.


// rutas
const personalRoutes = require('./routes/personal');
const indicadoresRoutes = require('./routes/indicadores');
const routesCrearBoleta = require('./routes/boleta');
const routesRegistros = require('./routes/registros');
const routesConfiguracion = require('./routes/configuracion');


//middlewares
app.use(express.json());  // => Esto hace que si le envian al servidor un datoe formato Json, este sea capaz de entenderlo y convertirlo en un objecto de javascript.
app.use(express.urlencoded({ extended: false })) // => entender datos que vienen de un formulario.
app.use(cors())

app.set('view engine', 'pug');
app.set("static", __dirname + "/static");


//routes 
app.get('/image', (req, res) => { // logo del colegio
    res.sendFile(path.join(__dirname, 'static/colegioLogo.png'));
});
app.get('/insignia', (req, res) => { // insignia especialidades
    res.sendFile(path.join(__dirname, 'static/startStudent.jpeg'));
});
app.use('/api', routesConfiguracion);
app.use('/api', personalRoutes);
app.use('/api', indicadoresRoutes);
app.use('/api', routesCrearBoleta);
app.use('/api', routesRegistros);



app.listen(4000, () => console.log('Servidor corriendo en el puerto 4000'));