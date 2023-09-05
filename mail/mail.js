var nodemailer = require('nodemailer')
var {ENVIROMENTMAIL} = require('../enviroments/enviroments')

 function EnviarCorreo(mailOptions){

  try {
    //Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
  host: ENVIROMENTMAIL.SERVER,
  port: 587,
  secure: false, // TLS
  requireTLS: true,
  auth: {
    user: ENVIROMENTMAIL.USEREMAIL,
    pass: ENVIROMENTMAIL.PASSWORDEMAIL,
  },
  tls: {
    ciphers: "SSLv3",
  },
});
  transporter.sendMail(mailOptions, function(error, info){
    if (error)  console.log(error); 
    else console.log('Email enviado: ' + info.response);
  });
  } catch (error) {
    res.status(500).send(`Ocurrió un error interno en el servidor - ${error}`);
  }
}
module.exports = EnviarCorreo;
