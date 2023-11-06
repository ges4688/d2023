var RealState = require('../models/RealState.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//const { authenticate } = require('./auth.service');

var {v4:uuidv4}=require('uuid')

_this = this

// exports.getRealState = async function (token) {
//     var decode = await authenticate(token);
//     try {
//         var realstate = await RealState.findById(decode.id);
//         return realstate;
//     } catch (e) {
//         console.log("error services",e)
//         throw Error('Error while getting RealState');
//     }
// }

exports.getRealStatebyId = async function(userId){
    console.log("El id de la inmobiliaria por el que quiere buscar es: " , userId)
    try{
        var realstate = await RealState.findById(userId);
        return realstate;
    }catch(e){
        console.log("error services",e)
        throw Error('Error while getting RealState');
    }

}

exports.getRealState = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var RealState = await RealState.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return RealState;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error al traer todas las inmobiliarias registradas en la base!');
    }
}



// exports.createRealState = async function (realstate) {
//     var hashedPassword = bcrypt.hashSync(realstate.password, 8);
    
//     var newRealState = new RealState({
//         name: realstate.name,
//         email: realstate.email,
//         cellphone: realstate.cellphone,
//         date: new Date(),
//         password: hashedPassword
//     })
//     try {
//         var savedRealState = await newRealState.save();
//         var token = jwt.sign({
//             id: savedRealState._id
//         }, process.env.SECRET, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         return token;
//     } catch (e) {
//         console.log(e)    
//         throw Error("Error while Creating RealState")
//     }
// }


exports.createRealState = async function (realstate) {
    // Creating a new Mongoose Object by using the new keyword
    var codigo=uuidv4();
    var hashedPassword = bcrypt.hashSync(realstate.password, 8);
    var newRealState = new RealState({
        userId:codigo,
        flag:realstate.flag,
        fantasyName: realstate.fantasyName,
        password:hashedPassword,
        email: realstate.email,
        emailContact: realstate.emailContact,
        qualification: realstate.qualification,
        qualification: realstate.qualification,
        timestamp:new Date()
    })

    //Controller --> Service --> DAO (Le pega a la BDD) --> Schema de Mongo
    try {
        var savedRealState = await newRealState.save();
        var token = jwt.sign({
            id: savedRealState._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating RealState")
    }

}



// exports.updateRealState = async function (oldRealState, newRealState) {
//     var hashedPassword = bcrypt.hashSync(newRealState.password, 8);
//     oldRealState.name = newRealState.name
//     oldRealState.password = hashedPassword
//     try {
//         var savedRealState = await oldRealState.save()
//         return savedRealState;
//     } catch (e) {
//         throw Error("And Error occured while updating the RealState");
//     }
// }

exports.updateRealState = async function(req, res,next){
    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var userId= req.body._id;
    var RealState = {
        userId,
        fantasyName: req.body.fantasyName ? req.body.name : null,
        email: req.body.email ? req.body.email : null,
        emailContact: req.body.emailContact ? req.body.emailContact : null,

    }
    try {
        var updatedRealState = await RealStateService.updateRealState(RealState)
        return res.status(200).json({status: 200, data: updatedEmpresa, message: "Inmobiliaria actualizada correctamente"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}

exports.deleteRealState = async function (id) {
    try {
        var deleted = await RealState.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("RealState Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the RealState")
    }
}

exports.loginRealState = async function (realstate) {
    try {
        console.log("login:", realstate)
        var _details = await RealState.findOne({
            email: realstate.email
        });
        var passwordIsValid = bcrypt.compareSync(realstate.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid realstatename/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, realstate:_details};
    } catch (e) {   
        throw Error("Error while Login RealState")
    }
}