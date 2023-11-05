var Home = require('../models/Home.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { authenticate } = require('./auth.service');

_this = this
 
exports.createHome = async function (homeData) {
    var newHome = new Home(homeData);
    try {
        var createdHome = await newHome.save();
        return createdHome;
    } catch (e) {
        console.error("Error while creating Home", e);
        throw Error("Error while creating Home");
    }
}

// Actualizar una propiedad existente
exports.updateHome = async function (oldHome, newHomeData) {
    try {
        oldHome.userId = newHomeData.userId;
        oldHome.homeId = newHomeData.homeId;
        oldHome.moneda = newHomeData.moneda;
        oldHome.precio = newHomeData.precio;
        oldHome.direccion = {
            calle: newHomeData.direccion.calle,
            numero: newHomeData.direccion.numero,
            piso: newHomeData.direccion.piso,
            dto: newHomeData.direccion.dto,
            barrio: newHomeData.direccion.barrio,
            localidad: newHomeData.direccion.localidad,
            provincia: newHomeData.direccion.provincia,
            pais: newHomeData.direccion.pais,
        };
        oldHome.geolocalizacion = {
            latitud: newHomeData.geolocalizacion.latitud,
            longitud: newHomeData.geolocalizacion.longitud,
        };
        oldHome.tipoPropiedad = newHomeData.tipoPropiedad;
        oldHome.operacion = newHomeData.operacion;
        oldHome.antiguedad = newHomeData.antiguedad;
        oldHome.cochera = newHomeData.cochera;
        oldHome.ambientes = newHomeData.ambientes;
        oldHome.dormitorios = newHomeData.dormitorios;
        oldHome.banos = newHomeData.banos;
        oldHome.amenities = newHomeData.amenities;
        oldHome.metrosCuadrados = {
            cubiertos: newHomeData.metrosCuadrados.cubiertos,
            semidescubiertos: newHomeData.metrosCuadrados.semidescubiertos,
            descubiertos: newHomeData.metrosCuadrados.descubiertos,
        };

        var updatedHome = await oldHome.save();
        return updatedHome;
    } catch (e) {
        console.error("Error while updating Home", e);
        throw Error("Error while updating Home");
    }
}

 
exports.filterHomes = async function (query, page, limit, searchQuery) {
    var per_page = parseInt(limit) || 10
    var page_no = parseInt(page) || 1
    var pagination = {
        limit: per_page,
        skip: per_page * (page_no - 1)
    }
    try {
        var homes = await Home.find({
            $and: [
                searchQuery.description ? {
                    $or: [
                        { description: { $regex: searchQuery.description } },
                        { 'ingredients.ingredient': { $regex: searchQuery.description } },
                        { status: 'active' }                    ]
                } : {},
                searchQuery.category ? { category: searchQuery.category } : {},
                searchQuery.difficulty ? { difficulty: searchQuery.difficulty } : {},
                searchQuery.vegan ? { vegan: searchQuery.vegan } : {},
                searchQuery.celiac ? { celiac: searchQuery.celiac } : {}
            ]
        }).limit(pagination.limit).skip(pagination.skip).exec()
        return recipes;
    } catch (e) {
        console.log("error services", e);
        throw Error('Error while searching a recipe');
    }
}

/*
exports.getHomes = async function (options) {
    try {
        var homes = await Home.find({}, options);
        return homes;
    } catch (e) {
        console.error("Error while getting Homes", e);
        throw Error('Error while getting Homes');
    }
}
*/

exports.getHomes = async function (query, page, limit, searchQuery) {
    var per_page = parseInt(limit) || 10
    var page_no = parseInt(page) || 1
    var pagination = {
        limit: per_page,
        skip: per_page * (page_no - 1)
    }
    try {
        var homes = await Home.find({
        }).limit(pagination.limit).skip(pagination.skip).exec()
        return homes;
    } catch (e) {
        console.log("error services", e);
        throw Error('Error while searching a recipe');
    }
}

exports.getHomeByHomeId = async function (homeId) {
    try {
        var home = await Home.findOne({ homeId: homeId });
        return home;
    } catch (e) {
        console.log("error services", e);
        throw Error('Error while getting Home by homeId');
    }
}

exports.deleteHomeByHomeId = async function (homeId) {
    try {
        var deleted = await Home.deleteOne({ homeId: homeId });
        if (deleted.deletedCount === 0 && deleted.ok === 1) {
            throw Error("Home could not be deleted");
        }
        return deleted;
    } catch (e) {
        console.error("Error while Deleting the Home by homeId", e);
        throw Error("Error while Deleting the Home by homeId");
    }
}


exports.getHomeByUserId = async function (userId) {
    try {
        var home = await Home.find({ userId: userId });
        return home;
    } catch (e) {
        console.log("error services", e);
        throw Error('Error while getting Home by homeId');
    }
}

