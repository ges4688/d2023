// Gettign the Newly created Mongoose Model we just created 
var UserImg = require('../models/img.model'); 
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.saveImages = async function (userId, homeId, files) {
    const img = new Img({
        userId: userId,
        homeId: homeId,
        dateCreated: new Date(),
        images: files.map(file => ({ data: fs.readFileSync(file.path), contentType: file.mimetype, nameImage: file.originalname }))
    });

    try {
        const savedImages = await img.save();
        return savedImages;
    } catch (e) {
        console.error("Error while saving images", e);
        throw Error("Error while saving images");
    }
}

exports.getImages = async function (userId, homeId) {
    try {
        const images = await Img.find({ userId: userId, homeId: homeId });
        return images.map(img => ({ nameImage: img.nameImage, contentType: img.images.contentType }));
    } catch (e) {
        console.error("Error while getting images", e);
        throw Error("Error while getting images");
    }
}

exports.deleteImage = async function (userId, homeId, nameImage) {
    try {
        const deletedImage = await Img.updateOne(
            { userId: userId, homeId: homeId },
            { $pull: { images: { nameImage: nameImage } } },
            { multi: true }
        );
        if (deletedImage.nModified === 0 && deletedImage.ok === 1) {
            throw Error("Image could not be deleted");
        }
        return deletedImage;
    } catch (e) {
        console.error("Error while deleting image", e);
        throw Error("Error while deleting image");
    }
}