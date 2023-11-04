var Home = require('../models/Home.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { authenticate } = require('./auth.service');

_this = this
 

 

exports.createHome = async function (home) {
    //var hashedPassword = bcrypt.hashSync(home.homeId, 8);
    
    var newHome = new Home({
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


exports.getHomes = async function (options) {
    try {
        var homes = await Home.paginate({}, options);
        return homes;
    } catch (e) {
        console.error("Error while getting Homes", e);
        throw Error('Error while getting Homes');
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

