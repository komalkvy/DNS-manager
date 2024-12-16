const mongoose = require('mongoose');
const schema = mongoose.Schema;

const dnsRecordSchema = new schema({
    aRecord:String,
    aaaaRecord:String,
    cnameRecord:String,
    dnssecRecord:String,
    mxRecord:String,
    nsRecord:String,
    ptrRecord:String,
    soaRecord:String,
    srvRecord:String,
    txtRecord:String
});


module.exports = mongoose.model('DNSRecord', dnsRecordSchema);
