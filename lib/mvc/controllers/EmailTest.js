function emailTest(app){
var nodemailer = require('nodemailer');
var ejs = require('ejs')
  , fs = require('fs')
  , str = fs.readFileSync('lib/mvc/views/emailTemplate.ejs', 'utf8'); 

var messageHtml = ejs.render(str);

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Mandrill',
    auth: {
        user: 'seanbowie1@gmail.com',
        pass: process.env.MANDRILL_APIKEY
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
        from: 'sean@bearhands.io', // sender address
        to: 'seanbowie1@gmail.com', // list of receivers
        subject: 'Bearhands Engage', // Subject line
        text: 'Bearhands Engaged', // plaintext body
        html: messageHtml
};

    // send mail with defined transport object
this.test = function(res,req){
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                window.location('claimsuccess.html');
            }else{
                console.log('Message sent: ' + info.response);
                window.location('claimfailure.html');
            }
            return;
        })
    }
}   
module.exports = emailTest;