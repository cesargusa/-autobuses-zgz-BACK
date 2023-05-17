// const mail = require('nodemailer/lib/mailer')
const connection = require('../connection-db')
const mail = require('../mail/mail')
const sitioEnviroment = require('../enviroments/enviroments.js')


//GET ALL
exports.GetUsers = (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) {
            res.send('Ha fallado la consulta :(')
        } else {
            res.send(results)
        }
    })
}

//GET BY ID
exports.GetUserById = (req,res) =>{
    const idUser = req.params.idUser
    const sql = 'SELECT * FROM users WHERE IdUser = ?'
    connection.query(sql, [idUser],(err,results,fields) => {
        if(err) {
            console.error('Error al obtener usuario por ID: ' + err.stack);
            res.status(500).send('Error interno del servidor');
            return;
        }
       if(results.length === 0) {
        res.status(404).send('Usuario no encontrado');
        return
       }
       res.send(results[0])
    })
}

//CREATE
exports.CreateUser = (req, res) => {
    const { idUser, Email, UserName, Password, CreateDate, LastConnection, IsActive } = req.body;
    const sqlCheck = 'SELECT COUNT(*) as count FROM users WHERE UserName = ? OR Email = ?'
    sql = 'INSERT INTO users VALUES (?, ?, ?,?,?,?,?)'
    connection.query(sqlCheck, [req.body.UserName, req.body.Email], (err, result) => {
        if (err) throw err
        if (result[0].count > 0) {
            res.status(400).send('El UserName o el Email ya existe');
        } else {
            QueryInsert()
            var titulo = 'Autobuses Zaragoza Cuenta Creada'
            var mensaje = `
            <span>Enhorabuena, se ha registrado correctamente en la Web de Autobuses Zaragoza</span>
            <br>
            <span>Nombre de Usuario: <span><strong>${UserName}</strong></span></span><br>
            <span>Correo Electrónico: <span><strong>${Email}</strong></span></span><br>
            <span>Contraseña: <span><strong>${Password}</strong></span></span>
            <br>
            <br>
            <a href='${sitioEnviroment.DIRECCIONES.SITIO}'>Inicia sesión desde aquí</a>
            `
            var mailOptionsRegister = {
                from: sitioEnviroment.ENVIROMENTMAIL.USEREMAIL,
                to: Email,
                subject: titulo,
                html: mensaje,
              };
            mail(mailOptionsRegister)
            console.log(mailOptionsRegister)
        }
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

exports.UpdatePasswordUser = (req,res) => {
    const idUser = req.params.idUser
    const password = req.body.Password
    const sql = 'UPDATE users SET Password = ? WHERE IdUser = ?'
    connection.query(sql, [password, idUser], (err, result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontro al usuario')
        else res.json({message:`Contraseña de Usuario ${idUser} actualizada correctamente`})
    })
}

//DELETE

exports.DeleteUser = (req,res) =>{
    const {idUser} = req.params
    const sqlDelete = 'DELETE FROM users WHERE IdUser = ?'
    
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
    const sql = 'UPDATE users SET LastConnection = ? WHERE IdUser = ?'
    connection.query(sql, [lastConnection, idUser], (err, result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontro al usuario')
        else res.json({message:`Usuario ${idUser} actualziado correctamente`})
    })
}

//DELETE USER IsActive

exports.DeleteUserIsActive = (req,res) =>{
    const idUser = req.params.idUser
    const isActive = req.body.IsActive
    const sql = 'UPDATE users SET IsActive = ? WHERE IdUser = ?'
    connection.query(sql, [isActive, idUser], (err, result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontro al usuario')
        else res.json({message:`Usuario ${idUser} ha sido eliminado correctamente`})
    })
}

//Iniciar Sesion
exports.Login = (req,res) =>{

    const {email,password} = req.body
    const sql = 'SELECT * FROM users WHERE (Email = ? OR UserName = ?) AND Password = ? AND isActive = true'
    connection.query(sql,[email,email,password], (error,results,fields) =>{
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