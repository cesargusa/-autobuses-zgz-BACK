const connection = require('../connection-db')


exports.GetTypeIncidents = (req, res) => {
const sql = 'SELECT * from typeincidents'

connection.query(sql,(err,results,fields)=>{
    if(err) throw err
    res.send(results)
})
}

exports.CreateIncident = (req,res) =>{
    const { IdIncident,IdTypeIncident, IdUser, DescriptionIncident } = req.body;

    const sqlQuery = 'INSERT INTO incidents VALUES (?,?, ?, ?)';
    
    connection.query(sqlQuery, [IdIncident,IdTypeIncident, IdUser, DescriptionIncident], (err, result) => {
      if (err) throw err;
      console.log(`Nueva incidencia insertada en la tabla: ${result.IdIncident}`);
      res.json({ message: 'Incidencia creada correctamente' });
    });
}


