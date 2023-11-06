var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const ImgSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    homeId: { type: String, required: true },
    nameImage: { type: String, required: true },
    dateCreated: Date,
    image : { type: String, required: true } // cloudinary folder where upload the image
    //images: [{ data: Buffer, contentType: String }] // Almacena las imágenes en formato binario
});

const Img = mongoose.model('Img', ImgSchema);

module.exports = Img;