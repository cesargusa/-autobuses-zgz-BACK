const connection = require('../connection-db')


exports.GetLinesFavorites = (req, res) => {
    const idUser = req.params.idUser
const sql = 'SELECT favoritelines.* FROM favoritelines ' + 
'INNER JOIN userslines ON favoritelines.IdFavoriteLine = userslines.IdFavoriteLine ' + 
'INNER JOIN users ON users.IdUser = userslines.IdUser '+
'WHERE userslines.IdUser = ? '

connection.query(sql,[idUser],(err,results,fields)=>{
    if(err) throw err
    res.send(results)
    console.log(results)
})
}


exports.CreateLineFavorite = (req,res) =>{
    const sqlFavoriteLines = 'INSERT INTO favoritelines(NumberLine,UrlLine) VALUES (?,?)'
    const sqlUsersLines = 'INSERT INTO userslines(IdUser,IdFavoriteLine) VALUES (?,?)'
    const {NumberLine, UrlLine, IdUser} = req.body

    connection.query(sqlFavoriteLines,[NumberLine, UrlLine],(err,results,fields) => {
        if(err) throw err
        const idFavoriteLine = results.insertId
        connection.query(sqlUsersLines,[IdUser, idFavoriteLine],(err,results,fields) => {
            if(err) throw err
            res.json({message: `Linea ${idFavoriteLine} agregada al usuario ${IdUser}`})
        })
    })
}

exports.DeleteLineFavorite = (req,res) =>{
    const idFavoriteLine = req.params.idFavoriteLine
    // const isActive = req.body.IsActive
    const sql = 'DELETE FROM userslines WHERE  IdFavoriteLine= ?'
    connection.query(sql, [ idFavoriteLine], (err, result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontro al usuario')
        else res.json({message:`Eliminado`})
    })
}
