var nodemailer = require('nodemailer');
var globals = require('../../globals');

var username = process.env.u || globals.u;
var password = process.env.p || globals.p;
var mailTo   = process.env.to || globals.to;

module.exports = function(msg, callback) {


    var smtpConfig = {
        host: 'smtp.migadu.com',
        port: 587,
        secure: false, // use SSL
        auth: {
            user: username,
            pass: password,
        }
    };
    
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(smtpConfig);
    
    var message = msg.message;
    var email   = msg.email;
    var name    = msg.name;

    var content = "Živjo, \n" + "Oseba " + name + " ti je poslala novo sporočilo preko spletne strani terapevtski-atelje.si.\n \n";
    content += "Ime: " + name + "\n";
    content += "Sporočilo: " + message + "\n";
    content += "Email: " + email + "\n";



    transporter.sendMail( {
        from: username,
        to: mailTo,
        subject: 'Terapevtski Atelje - Novo Sporočilo',
        text: content,
    }).then( data => {
        callback(true);
    }).catch ( err => {
        callback(false);
    });
}