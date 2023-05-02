const connection = require('../connection-db')


//GET
exports.GetUsers = (req, res) => {
    connection.query('SELECT * FROM Users', (error, results, fields) => {
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

//UPDATE CONNECTION

exports.UpdateUser = (req, res) => {
    const idUser = req.params.idUser
    const lastConnection = req.body.LastConnection
    const sql = 'UPDATE Users SET LastConnection = ? WHERE IdUser = ?'
    connection.query(sql, [lastConnection, idUser], (err, result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontro al usuario')
        else res.json({message:`Usuario ${idUser} actualziado correctamente`})
    })
}



//Iniciar Sesion

exports.Login = (req,res) =>{
    const {email,password} = req.body
    const sql = 'SELECT * from Users WHERE Email = ? AND Password = ?'
    connection.query(sql,[email,password], (error,results,fields) =>{
        if(error) throw error
        if(results.length > 0){
            console.log(results)
            const userName = results[0].UserName
            const idUser = results[0].IdUser
            res.json({succes:true, userName, idUser})
        }else{
            res.json({succes:false})
        }
    })
}