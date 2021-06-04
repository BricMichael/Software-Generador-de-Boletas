const express = require('express')
const cors = require('cors');
const app = express();



// rutas
const personalRoutes = require('./routes/personal')
const IndicadoresRoutes = require('./routes/indicadores') 

//middlewares
app.use(express.json());  // => Esto hace que si le envian al servidor un datoe formato Json, este sea capaz de entenderlo y convertirlo en un objecto de javascript.
app.use(express.urlencoded({extended: false})) // => entender datos que vienen de un formulario.
app.use(cors())

//routes 
app.use('/api', personalRoutes); 
app.use('api', IndicadoresRoutes);





app.listen(4000, () => console.log('Servidor corriendo en el puerto 4000'));