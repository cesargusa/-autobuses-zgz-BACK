const express = require('express');
const connection = require('./connection-db')
const app = express()


app.get('/', (req,res) =>{
    connection.query('SELECT * FROM users', (error,results,fields) =>{
        if(error){
            res.send('Ha fallado la consulta :(')
        }else{
            res.send(results)
        }
    })
})

app.listen(3000,() =>{
    console.log("Funciona en el puerto 3000")
})