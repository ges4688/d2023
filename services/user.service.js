var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { authenticate } = require('./auth.service');

_this = this

exports.getUser = async function (token) {
    var decode = await authenticate(token);
    try {
        var user = await User.findById(decode.id);
        return user;
    } catch (e) {
        console.log("error services",e)
        throw Error('Error while getting User');
    }
}

exports.createUser = async function (user) {
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new User({
        name: user.name,
        email: user.email,
        cellphone: user.cellphone,
        date: new Date(),
        password: hashedPassword
    })

    try {
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        console.log(e)    
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (oldUser, newUser) {
    var hashedPassword = bcrypt.hashSync(newUser.password, 8);
    oldUser.name = newUser.name
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}

exports.loginUser = async function (user) {
    try {
        console.log("login:", user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {   
        throw Error("Error while Login User")
    }
}