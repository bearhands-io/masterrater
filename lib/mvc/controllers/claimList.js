var mongoose = require('mongoose'),
    passport = require('passport'),
    claim = require('../models/claim.js');

module.exports = ClaimList;

function ClaimList(connection) {
  //mongoose.connect(connection);
  //console.log(connection);
}

ClaimList.prototype = {
  showClaims: function(req, res) {
    claim.find( { $and: [ {requestStatus : "New"}, {requestStatus : {$ne:null}} ] } , function foundClaims(err, items) {
      res.render('claims.ejs',{tabletitle: 'My Claim List ', tasks: items, user: req.user})
    });
  },

  addClaim: function(req,res) {
    var claiminfo = req.body;
    newClaim = new claim();
    newClaim.itemID = claiminfo.itemID;
    newClaim.serialNo = claiminfo.serialNo;
    newClaim.claimType = claiminfo.claimType;
    newClaim.brand = claiminfo.Brand;

    newClaim.save(function savedClaim(err){
      if(err) {
        throw err;
      }
    });

    var nodemailer = require('nodemailer');
    var ejs = require('ejs')
      , fs = require('fs')
      , str = fs.readFileSync('lib/mvc/views/emailTemplate.ejs', 'utf8'); 

    var messageHtml = ejs.render(str,{
      serial:claiminfo.serialNo,
      itemID:claiminfo.itemID,
      message:"Your claim has been received and queued for processing. Please allow 48 hours for your claim to be updated. Thank you for your patience.",
      status:"created",
      claimtype:claiminfo.claimtype,
      brand:claiminfo.brand
    });

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
    function ClaimUpdateEmail(app){
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                    window.location('derp');
                }else{
                    console.log('Message sent: ' + info.response);
                    window.location('claims.html');
                }
                return;
            })
    }
    console.log(newClaim.itemID + ' claim updated.');
    res.redirect('/claims.html');
  },

  completeClaim: function(req,res) {
    var completedClaims = req.body;
    var i=0;
    for(requestID in completedClaims) {
      i++;
      if(completedClaims[requestID]=='true') {
        var conditions = { _id: requestID };
        var updates = { requestCompleted: completedClaims[requestID] };
        claim.update(conditions, updates, function updatedClaim(err) {
          if(err) {
            throw err;
          }
        });
      }
    }
    console.log(i + ' claim updated.');
    res.redirect('/claims.html');
  }
}