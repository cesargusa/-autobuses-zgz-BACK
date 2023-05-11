const express = require('express');
const userRoute = require('.//routes/userRoutes')
const linesFavoritesRoute = require('.//routes/linesFavoritesRoutes')

const app = express()
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: ['https://cesar.proyectosdwa.es', 'http://localhost:4200'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }));
  
//Middelware, path inicial
app.use('/api/Users', userRoute);
app.use('/api/LinesFavorites', linesFavoritesRoute);


const port = process.env.PORT || 3000; // Selecciona el puerto disponible o el 3000 por defecto

app.listen(port, () => {
  console.log(`La aplicación está corriendo en el puerto ${port}`);
});

