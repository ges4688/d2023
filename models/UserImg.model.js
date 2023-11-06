var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var UserImgSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    homeId: { type: String, required: true },
    nameImage: { type: String, required: true },
    dateCreated: Date,
    image : { type: String, required: true }     
})

UserImgSchema.plugin(mongoosePaginate)
const UserImg = mongoose.model('UsuarioImagen', UserImgSchema)

module.exports = UserImg;