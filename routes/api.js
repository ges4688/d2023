/**ROUTE USER APIs. */
var express = require('express');

var router = express.Router();
var users = require('./api/user.route');
var homes = require('./api/home.route');
var realstate = require('./api/realstate.route');

router.use('/users', users);
router.use('/homes', homes);
router.use('/realstate', realstate);
module.exports = router;
