var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var RealStateSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique : true, dropDups: true},
    cellphone: {type: String, required: true},
    password: {type: String, required: true},
    image: String,
    date: Date
});

RealStateSchema.plugin(mongoosePaginate);
const realstate = mongoose.model('realstate', RealStateSchema);

module.exports = realstate;