const express = require('express');
const userRoute = require('.//routes/userRoutes')
const app = express()
const cors = require('cors');

app.use(express.json());
app.use(cors())
//Middelware, path inicial
app.use('/api/Users', userRoute);

const port = process.env.PORT || 3000; // Selecciona el puerto disponible o el 3000 por defecto

app.listen(port, () => {
  console.log(`La aplicación está corriendo en el puerto ${port}`);
});
