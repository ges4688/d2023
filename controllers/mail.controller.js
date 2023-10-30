let nodemailer = require('nodemailer');


exports.sendEmail = async function (req, res, next){
    
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        port:25,
        service: 'Outlook',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,  //contraseña cuenta  con acceso a apps poco seguras como en google
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'uadedist2023@outlook.com',
        to: req.body.destinatario,
        subject: req.body.asunto,
        html: '<h1> aca se muestra el texto  </h1><h3>' +req.body.texto+'</h3>',
        
    };
    console.log("mail",mailOptions)
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};