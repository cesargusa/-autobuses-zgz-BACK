const mysql = require('mysql')
let DB_NAME = 'Pro'
let dbNameText = ''
const PRO = {
    //Cadena de Conexión Producción(Remota)
    host: 'db4free.net',
    user: 'nettcesar',
    password: '32c178d7',
    database: 'nettautobuszgz'
}
const LOCAL = {
    //Cadena conexión local
    host: 'localhost',
    user: 'NettAdmin',
    password: 'NettAdmin',
    database: 'nett_bus'
}

function GetDataBase(DB_NAME){
    if(DB_NAME === 'Local'){
        dbNameText = 'Local'
        return LOCAL
    }
    if(DB_NAME === 'Pro'){
        dbNameText = 'Pro'
        return PRO
    }
    return null
}

const connection = mysql.createConnection(
    GetDataBase(DB_NAME)

)
connection.connect((error) => {
    if (error) {
        console.log("error en la base de datos", error)
    } else {
        console.log("Conexion a la base de datos exitosa")
        console.log(dbNameText)
    }
})

module.exports = connection