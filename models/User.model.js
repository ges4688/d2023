var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique : true, dropDups: true},
    cellphone: {type: String, required: true},
    password: {type: String, required: true},
    image: String,
    date: Date
});

UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User', UserSchema);

module.exports = User;