const connection = require('../connection-db')


//GET
exports.GetUsers = (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            res.send('Ha fallado la consulta :(')
        } else {
            res.send(results)
        }
    })
}


//CREATE
exports.CreateUser = (req, res) => {
    const { idUser, Email, UserName, Password, CreateDate, LastConnection, IsActive } = req.body;
    const sqlCheck = 'SELECT COUNT(*) as count FROM Users WHERE UserName = ? OR Email = ?'
    sql = 'INSERT INTO Users VALUES (?, ?, ?,?,?,?,?)'
    connection.query(sqlCheck, [req.body.UserName, req.body.Email], (err, result) => {
        if (result[0].count > 0) {
            res.status(400).send('El UserName o el Email ya existe');

        } else QueryInsert()
    }
    )
    function QueryInsert() {
        connection.query(sql, [idUser, Email, UserName, Password, CreateDate, LastConnection, IsActive], (err, result) => {
            if (err) throw err
            console.log(`Nuevo registro insertado en la tabla: ${result.insertId}`)
            res.json({ message: 'Registro insertado correctamente' });

        })
    }
}

//DELETE

exports.DeleteUser = (req,res) =>{
    const {idUser} = req.params
    const sqlDelete = 'DELETE FROM Users WHERE IdUser = ?'
    
    connection.query(sqlDelete, [idUser], (err,result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontró el usuario especificado');
        else res.send(`Usuario con id: ${idUser} eliminado correctamente`)
    })
}
