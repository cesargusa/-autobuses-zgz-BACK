const connection = require('../connection-db')


exports.GetLinesFavorites = (req, res) => {
const sql = 'SELECT favoritelines.* FROM favoritelines INNER JOIN userslines ON favoritelines.IdFavoriteLine = userslines.IdFavoriteLine WHERE userslines.IdUser = ?'
const idUser = req.params

connection.query(sql,[idUser],(err,results,fields)=>{
    if(err) throw err
    res.send(results)
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
