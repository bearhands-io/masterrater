var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClaimDataSchema = new Schema({
	requestID : String,
	AccountID : String,
    ShipID : String,
    AccountName : String,
    ShipName : String,
    Address : String,
    Phone : String,
    Fax : String,
    OrderNo : String,
    InvoiceNo : String,
    InvDate : String,
    SalesLoc : String,
    ShipLoc : String,
    ClimPO : String,
    DealerCost : String,
    ClimCost : String,
    ClimReceiveDate : { type: Date},
    ClimInvoiceDate : { type: Date}
}); 

module.exports = mongoose.model('ClaimDataModel', ClaimDataSchema);