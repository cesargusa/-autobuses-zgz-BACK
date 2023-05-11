const express = require('express');
const userRoute = require('.//routes/userRoutes')
const linesFavoritesRoute = require('.//routes/linesFavoritesRoutes')

const app = express()
const cors = require('cors');


app.use(express.json());
app.use(cors({
    origin: 'https://cesar.proyectosdwa.es'
  }));
//Middelware, path inicial
app.use('/api/Users', userRoute);
app.use('/api/LinesFavorites', linesFavoritesRoute);
app.listen(3000,() =>{
    console.log("Funciona en el puerto 3000")
})