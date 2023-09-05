const mysql = require('mysql')
let DB_NAME = 'Local'
let dbNameText = ''
const PRO = {
    //Cadena de Conexión Producción(Remota)
    host: 'db4free.net',
    user: 'nettcesar',
    password: '32c178d7',
    database: 'nettautobuszgz'

    //Cadena de Conexiòn freeSqldatabase
    // host: 'sql8.freesqldatabase.com',
    // user: 'sql8627667',
    // password: 'SzjCHWFWGa',
    // database: 'sql8627667'
}
const LOCAL = {
    //Cadena conexión local
    host: '127.0.0.1',
    user: 'nettbusproyecto',
    password: 'PruebaBot22',
    database: 'buses'
}

function GetDataBase(DB_NAME){

    try {
         if(DB_NAME === 'Local'){
        dbNameText = 'Local'
        return LOCAL
    }
    if (DB_NAME === "Pro") {
      dbNameText = "Pro";
      return PRO;
    }
    return null
    } catch (error) {
        res.status(500).send(`Ocurrió un error interno en el servidor - ${error}`);
    }
}
const connection = mysql.createConnection(
    GetDataBase(DB_NAME)

)
connection.connect((error) => {
    if (error) console.log("error en la base de datos", error)
    else {
        console.log("Conexion a la base de datos exitosa")
        console.log(dbNameText)
    }
})

module.exports = connection