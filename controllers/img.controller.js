var fs = require('fs');
var path = require('path');
var ImgService = require('../services/img.service');


exports.saveImages = async function (req, res, next) {
    const userId = req.body.userId;
    const homeId = req.body.homeId;

    try {
        const savedImages = await ImgService.saveImages(userId, homeId, req.files);
        return res.status(201).json({ status: 201, data: savedImages, message: "Successfully Saved Images" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getImages = async function (req, res, next) {
    const userId = req.body.userId;
    const homeId = req.body.homeId;

    try {
        const images = await ImgService.getImages(userId, homeId);
        return res.status(200).json({ status: 200, data: images, message: "Successfully Retrieved Images" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteImage = async function (req, res, next) {
    const userId = req.body.userId;
    const homeId = req.body.homeId;
    const nameImage = req.body.nameImage;

    try {
        const deletedImage = await ImgService.deleteImage(userId, homeId, nameImage);
        return res.status(200).json({ status: 200, data: deletedImage, message: "Successfully Deleted Image" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}