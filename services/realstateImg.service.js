// Gettign the Newly created Mongoose Model we just created 
var RealStateImg = require('../models/RealStateImg.model');
var cloudinary = require('../cloudinary/cloudinary');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Contact List
exports.getImagenes = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Imagenes = await RealStateImg.paginate(query, options)
        // Return the Contact list that was retured by the mongoose promise
        return Imagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Contacts');
    }
}

// Async function to get the Contact List
exports.getImagenesByRealState = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    console.log("byId", query)
    try {
        var RealStateImagenes = await RealStateImg.paginate(query, options)
        // Return the Control list that was retured by the mongoose promise
        console.log("imagenes by id", RealStateImagenes)
        return RealStateImagenes;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Desafios');
    }
}

async function savedRealStateImg(newRealStateImg) {

    try {
        // Saving the Control 
        var savedRealStateImg = await newRealStateImg.save();

        return savedRealStateImg;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Imagen RealState")
    }
}
exports.createRealStateImg = async function (realstateImg) {

    //subir imagen a cloudinary
    console.log("realstateImg", realstateImg)
    let urlImg;
    let imagen = process.env.UPLOAD_DIR + realstateImg.nombreImagen;
    cloudinary.uploader.upload(imagen, function (result) {
        console.log("Resultado", result);
        //urlImg=result.url;
        // Creating a new Mongoose Object by using the new keyword
        var newRealStateImg = new RealStateImg({
            realstateId: realstateImg.realstateId,
            homeId: realstateImg.homeId,
            date: new Date(),
            nameImage : realstateImg.nameImage,
            image: result.url
        })

        savedRealStateImg(newRealStateImg);
    });
}
