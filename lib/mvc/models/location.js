var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LocationSchema = new Schema({
    ShiptoID : String,
    AccountName : String,
    ShipName : String,
    Address1 : String,
    Address2 : String,
    City : String,
    State : String,
    ZipCode : String,
    ContactName : String,
    Phone : String,
    Fax : String
});

module.exports = mongoose.model('LocationModel', LocationSchema);