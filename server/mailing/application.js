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

    var email   = msg.email;
    var name    = msg.name;
    var title   = msg.title;

    var content = "Živjo, \n" + "Oseba " + name + " se prijavlja na delavnico preko terapevtski-atelje.si.\n \n";
    content += "Delavnica: " + title + "\n";
    content += "Ime: " + name + "\n";
    content += "Email: " + email + "\n";



    transporter.sendMail( {
        from: username,
        to: mailTo,
        subject: 'Terapevtski Atelje - Prijava na delavnico: ' + title,
        text: content,
    }).then( data => {
        console.log("Sent mail!");
        callback(true);
    }).catch ( err => {
      console.log(err);
      console.log("Sent failed!");
        callback(false);
    });
}
