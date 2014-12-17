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
    claim.find( { $and: [ {claimType : {$ne:null}}, {requestStatus : {$ne:null}} ] } , function foundClaims(err, items) {
      res.render('claims.ejs',{tabletitle: 'My Claim List ', tasks: items, user: req.user})
    });
  },

  addClaim: function(req,res) {
    var claiminfo = req.body;
    newClaim = new claim();
    newClaim.itemID = claiminfo.itemID;
    newClaim.serialNo = claiminfo.serialNo;
    newClaim.claimType = claiminfo.claimType;
    newclaim.accountID = user.local.accountID;
    newClaim.save(function savedClaim(err){
      if(err) {
        throw err;
      }
    });

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