const express = require('express')
const cors = require('cors');
const app = express();
const path = require('path'); // saber en que s.o nos encontramos y poner las barras direccionales correctas => / O \.



// rutas
const personalRoutes = require('./routes/personal');
const indicadoresRoutes = require('./routes/indicadores');
const routesCrearBoleta = require('./routes/boleta');
const routesRegistros = require('./routes/registros');
const routesConfiguracion = require('./routes/configuracion');

//middlewares
app.use(express.json());  // => Esto hace que si le envian al servidor un datoe formato Json, este sea capaz de entenderlo y convertirlo en un objecto de javascript.
app.use(express.urlencoded({extended: false})) // => entender datos que vienen de un formulario.
app.use(cors())

//routes 
app.get('/image', (req, res) => { // logo del colegio
    res.sendFile(path.join(__dirname, 'boletas/colegioLogo.png'))
});
app.use('/api', routesConfiguracion);
app.use('/api', personalRoutes); 
app.use('/api', indicadoresRoutes);
app.use('/api', routesCrearBoleta);
app.use('/api', routesRegistros);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'boletas/boleta.html'))
})




app.listen(4000, () => console.log('Servidor corriendo en el puerto 4000'));