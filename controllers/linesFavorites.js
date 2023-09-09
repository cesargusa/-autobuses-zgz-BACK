const connection = require('../connection-db')


exports.GetLinesFavorites = (req, res) => {
  try {
     const idUser = req.params.idUser;
  const sql =
    "SELECT favoritelines.* FROM favoritelines " +
    "INNER JOIN userslines ON favoritelines.IdFavoriteLine = userslines.IdFavoriteLine " +
    "INNER JOIN users ON users.IdUser = userslines.IdUser " +
    "WHERE userslines.IdUser = ? ";

  connection.query(sql, [idUser], (err, results, fields) => {
    if (err) {
      console.error('Error en la consulta a la base de datos:', err);
      res.status(500).send(`Ocurrió un error interno en el servidor - ${err.message}`);
    }
     else res.send(results);
  });
  } catch (error) {
    res.status(500).send(`Ocurrió un error interno en el servidor - ${error}`);
  }
 
};


exports.CreateLineFavorite = (req, res) => {

  try {
    const sqlFavoriteLines =
      'INSERT INTO favoritelines(NumberLine, UrlLine) VALUES (?, ?)';
    const sqlUsersLines =
      'INSERT IGNORE INTO userslines(IdUser, IdFavoriteLine) VALUES (?, ?)';
    const { NumberLine, UrlLine, IdUser } = req.body;
  
    const sqlSelectFavoriteLine =
      'SELECT * FROM favoritelines WHERE NumberLine = ?';
  
    connection.query(sqlSelectFavoriteLine, [NumberLine], (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        const idFavoriteLine = result[0].IdFavoriteLine;
  
        connection.query(
          sqlUsersLines,
          [IdUser, idFavoriteLine],
          (err, result) => {
            if (err) throw err;
  
            if (result.affectedRows === 0) {
              // El valor ya existe en userslines para el usuario dado
              res.json({
                message: `El usuario ${IdUser} ya tiene la línea ${idFavoriteLine} en sus favoritos`,
              });
            } else {
              res.json({
                message: `Línea ${idFavoriteLine} agregada al usuario ${IdUser}`,
              });
            }
          }
        );
      } else {
        connection.query(
          sqlFavoriteLines,
          [NumberLine, UrlLine],
          (err, result) => {
            if (err) throw err;
  
            const idFavoriteLine = result.insertId;
  
            if (!idFavoriteLine) {
              throw new Error('No se pudo obtener el id de la línea favorita');
            }
  
            connection.query(
              sqlUsersLines,
              [IdUser, idFavoriteLine],
              (err, result) => {
                if (err) throw err;
  
                if (result.affectedRows === 0) {
                  // El valor ya existe en userslines para el usuario dado
                  res.json({
                    message: `El usuario ${IdUser} ya tiene la línea ${idFavoriteLine} en sus favoritos`,
                  });
                } else {
                  res.json({
                    message: `Línea ${idFavoriteLine} agregada al usuario ${IdUser}`,
                  });
                }
              }
            );
          }
        );
      }
    });
  } catch (error) {
    res.status(500).send(`Ocurrió un error interno en el servidor - ${error}`);
  }
  };
  
exports.DeleteLineFavorite = (req,res) =>{
  try {
       const idFavoriteLine = req.params.idFavoriteLine
    // const isActive = req.body.IsActive
    const sql = 'DELETE FROM userslines WHERE  IdFavoriteLine= ?'
    connection.query(sql, [ idFavoriteLine], (err, result) =>{
        if(err) throw err
        if(result.affectedRows === 0) res.status(404).send('No se encontro al usuario')
        else res.json({message:`Eliminado`})
    })
  } catch (error) {
    res.status(500).send(`Ocurrió un error interno en el servidor - ${error}`);
  }
}
