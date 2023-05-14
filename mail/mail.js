var nodemailer = require('nodemailer')


 function EnviarCorreo(mailOptions){
//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // TLS
    requireTLS: true,
    auth: {
        user: 'autobuseszaragoza@hotmail.com',
        pass: 'PruebaBot'
      },
      tls: {
        ciphers: 'SSLv3'
      }
  });

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}
module.exports = EnviarCorreo;
