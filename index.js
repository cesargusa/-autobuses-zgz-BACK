const express = require('express');
const userRoute = require('.//routes/userRoutes')
const app = express()
const cors = require('cors');


app.use(express.json());
app.use(cors())
//Middelware, path inicial
app.use('/api/Users', userRoute);

app.listen(3000,() =>{
    console.log("Funciona en el puerto 3000")
})