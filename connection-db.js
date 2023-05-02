const mysql = require('mysql')


const connection = mysql.createConnection({
    //Cadena conexión local
    // host: 'localhost',
    // user: 'NettAdmin',
    // password : 'NettAdmin',
    // database: 'nett_bus'

    //Cadena de Conexión Producción(Remota)
    host: 'db4free.net',
    user: 'nettcesar',
    password : '32c178d7',
    database: 'nettautobuszgz'
})

connection.connect((error) => {
    if(error){
        console.log("error en la base de datos", error)
    }else{
        console.log("Conexion a la base de datos exitosa")
    }
})

module.exports = connection