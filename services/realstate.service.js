var RealState = require('../models/RealState.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { authenticate } = require('./auth.service');

_this = this

exports.getRealState = async function (token) {
    var decode = await authenticate(token);
    try {
        var realstate = await RealState.findById(decode.id);
        return realstate;
    } catch (e) {
        console.log("error services",e)
        throw Error('Error while getting RealState');
    }
}

exports.createRealState = async function (realstate) {
    var hashedPassword = bcrypt.hashSync(realstate.password, 8);
    
    var newRealState = new RealState({
        name: realstate.name,
        email: realstate.email,
        cellphone: realstate.cellphone,
        date: new Date(),
        password: hashedPassword
    })

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

exports.updateRealState = async function (oldRealState, newRealState) {
    var hashedPassword = bcrypt.hashSync(newRealState.password, 8);
    oldRealState.name = newRealState.name
    oldRealState.password = hashedPassword
    try {
        var savedRealState = await oldRealState.save()
        return savedRealState;
    } catch (e) {
        throw Error("And Error occured while updating the RealState");
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