var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var RealStateSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    flag: {type: realState.flag, required: true},
    fantasyName: {type: String, required: true},
    email: {type: String, required: true, unique : true, dropDups: true},
    emailContact: {type: String, required: true, unique : true, dropDups: true},
    password: {type: String, required: true},
    qualification: {type: Number, required: true},
    image: String,
    date: Date
});

RealStateSchema.plugin(mongoosePaginate);
const realState = mongoose.model('realState', RealStateSchema);

module.exports = realState;