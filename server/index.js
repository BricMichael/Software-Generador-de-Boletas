const express = require('express')
const app = express();

// rutas
const personalRoutes = require('./routes/personal')

//middlewares
app.use(express.json());  // => Esto hace que si le envian al servidor un datoe formato Json, este sea capaz de entenderlo y convertirlo en un objecto de javascript.
app.use(express.urlencoded({extended: false})) // => entender datos que vienen de un formulario.


//routes 
app.use('/api', personalRoutes); 





app.listen(4000, () => console.log('Servidor corriendo en el puerto 4000'));