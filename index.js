const express = require('express');
const userRoute = require('.//routes/userRoutes')
const linesFavoritesRoute = require('.//routes/linesFavoritesRoutes')
const incidentsRoute = require('.//routes/incidentsRoutes')

const app = express()
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: ['https://cesar.proyectosdwa.es', 'http://localhost:4200','http://localhost:3001'],
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }));

  //Headers que se devuevlven en todas las solicitudes
  app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Credentials', true);
  // req.header('Access-Control-Allow-Origin', '*');
  // req.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // req.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // req.header('Access-Control-Allow-Credentials', true);
  next();
});
//Middelware, path inicial
app.use('/api/Users', userRoute);
app.use('/api/LinesFavorites', linesFavoritesRoute);
app.use('/api/Incidents', incidentsRoute);

const port = process.env.PORT || 3000; // Selecciona el puerto disponible o el 3000 por defecto

app.listen(port, () => {
  console.log(`La aplicación está corriendo en el puerto ${port}`);
});

