/**ROUTE USER APIs. */
var express = require('express');

var router = express.Router();
var users = require('./api/user.route');
var recipes = require('./api/recipe.route');
var homes = require('./api/home.route');
var Tagg = require('../api/tag.route');

router.use('/users', users);
router.use('/recipes', recipes);
router.use('/homes', homes);
router.use('/tag', Tagg);
module.exports = router;
