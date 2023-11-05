var HomeService = require('../services/home.service');
var UserImgService =require('../services/userImg.service');

_this = this;
 
 
// Crear una nueva propiedad
exports.createHome = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var Home = {
        userId: req.body.home.userId,
        homeId: req.body.home.homeId,
        moneda: req.body.home.moneda,
        precio: req.body.home.precio,
        direccion: {
            calle: req.body.home.direccion.calle,
            numero: req.body.home.direccion.numero,
            piso: req.body.home.direccion.piso,
            dto: req.body.home.direccion.dto,
            barrio: req.body.home.direccion.barrio,
            localidad: req.body.home.direccion.localidad,
            provincia: req.body.home.direccion.provincia,
            pais: req.body.home.direccion.pais,
        }, 
        geolocalizacion: {
            latitud: req.body.home.geolocalizacion.latitud,
            longitud: req.body.home.geolocalizacion.longitud,
        },
        tipoPropiedad: req.body.home.tipoPropiedad,
        operacion: req.body.home.operacion,
        antiguedad: req.body.home.antiguedad,
        cochera: req.body.home.cochera,
        ambientes: req.body.home.ambientes,
        dormitorios: req.body.home.dormitorios,
        banos: req.body.home.banos,
        amenities: req.body.home.amenities, 
        metrosCuadrados: {                                           
            cubiertos: req.body.home.metrosCuadrados.cubiertos,
            semidescubiertos: req.body.home.metrosCuadrados.semidescubiertos,
            descubiertos: req.body.home.metrosCuadrados.descubiertos,
        }
    };

    try {
        var createdHome = await HomeService.createHome(Home);
        return res.status(201).json({ status: 201, data: createdHome, message: "Successfully Created Home" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Home Creation was Unsuccessful" });
    }
}



// Actualizar una propiedad existente
exports.updateHome = async function (req, res, next) {
    console.log("llegue al controller",req.body)
    var newHomeData = {
        userId: req.body.home.userId,
        homeId: req.body.home.homeId,
        moneda: req.body.home.moneda,
        precio: req.body.home.precio,
        direccion: {
            calle: req.body.home.direccion.calle,
            numero: req.body.home.direccion.numero,
            piso: req.body.home.direccion.piso,
            dto: req.body.home.direccion.dto,
            barrio: req.body.home.direccion.barrio,
            localidad: req.body.home.direccion.localidad,
            provincia: req.body.home.direccion.provincia,
            pais: req.body.home.direccion.pais,
        },
        geolocalizacion: {
            latitud: req.body.home.geolocalizacion.latitud,
            longitud: req.body.home.geolocalizacion.longitud,
        },
        tipoPropiedad: req.body.home.tipoPropiedad,
        operacion: req.body.home.operacion,
        antiguedad: req.body.home.antiguedad,
        cochera: req.body.home.cochera,
        ambientes: req.body.home.ambientes,
        dormitorios: req.body.home.dormitorios,
        banos: req.body.home.banos,
        amenities: req.body.home.amenities,
        metrosCuadrados: {
            cubiertos: req.body.home.metrosCuadrados.cubiertos,
            semidescubiertos: req.body.home.metrosCuadrados.semidescubiertos,
            descubiertos: req.body.home.metrosCuadrados.descubiertos,
        }
    };

    try {
        var oldHome = await HomeService.getHomeByHomeId(req.params.homeId);
        //console.log(oldHome);
        var updatedHome = await HomeService.updateHome(oldHome, newHomeData);
        return res.status(200).json({ status: 200, data: updatedHome, message: "Successfully Updated Home" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
 

exports.removeHome = async function (req, res, next) {
    var homeId = req.params.homeId;
    try {
        var deleted = await HomeService.deleteHomeByHomeId(homeId);
        res.status(200).json({ status: 200, data: deleted, message: "Successfully Deleted Home" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
 
exports.getHomes = async function (req, res, next) {
    try {
        var homes = await HomeService.getHomes(req.query);
        return res.status(200).json({ status: 200, data: homes, message: "Succesfully Homes Received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

// Obtener una propiedad por HomeId
exports.getHome = async function (req, res, next) {
    try {
        var home = await HomeService.getHomeByHomeId(req.params.homeId);
        return res.status(200).json({ status: 200, data: home, message: "Successfully Home Received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getHomeByUserId = async function (req, res, next) {
    try {
        var home = await HomeService.getHomeByUserId(req.params.userId);
        return res.status(200).json({ status: 200, data: home, message: "Successfully Home Received" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.filterHomes = async function (req, res, next) {
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let searchQuery = {
        description: req.query.description ? req.query.description : "",
        category: req.query.category ? req.query.category : "",
        difficulty: req.query.difficulty ? req.query.difficulty : "",
        vegan: req.query.vegan,
        celiac: req.query.celiac,
    }

    try {
        var recipes = await HomeService.filterHomes({}, page, limit, searchQuery);
        return res.status(200).json({status: 200, data: recipes, message: "Succesfully Recipes Filtered"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}




exports.geoLoc = async function (req, res, next) {
    var ubicacion = req.body.direccion;
    try {
        var aa = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}