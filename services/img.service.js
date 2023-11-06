// Gettign the Newly created Mongoose Model we just created 
var UserImg = require('../models/img.model'); 
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var cloudinary = require('../cloudinary/cloudinary');

// Saving the context of this module inside the _the variable
_this = this


exports.saveImages = async function (userId, homeId, files) {
    const img = new Img({
        userId: userId,
        homeId: homeId,
        dateCreated: new Date(),
        images: []
    });

    try {
        for (const file of files) {
            const result = await cloudinary.uploader.upload(file.path);
            img.images.push({ url: result.secure_url, nameImage: file.originalname });
        }

        const savedImages = await img.save();
        return savedImages;
    } catch (e) {
        console.error("Error while saving images", e);
        throw Error("Error while saving images");
    }
};

exports.getImages = async function (userId, homeId) {
    try {
        const images = await Img.findOne({ userId: userId, homeId: homeId });
        return images ? images.images.map(img => ({ nameImage: img.nameImage, url: img.url })) : [];
    } catch (e) {
        console.error("Error while getting images", e);
        throw Error("Error while getting images");
    }
};

exports.deleteImage = async function (userId, homeId, nameImage) {
    try {
        const updatedImage = await Img.updateOne(
            { userId: userId, homeId: homeId },
            { $pull: { images: { nameImage: nameImage } } }
        );

        if (updatedImage.nModified === 0 && updatedImage.ok === 1) {
            throw Error("Image could not be deleted");
        }
        return updatedImage;
    } catch (e) {
        console.error("Error while deleting image", e);
        throw Error("Error while deleting image");
    }
};