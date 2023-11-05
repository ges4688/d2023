var express = require('express')
var router = express.Router()
var HomeController = require('../../controllers/homes.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');

router.get('/:homeId', HomeController.getHome);
router.get('/user/:userId', HomeController.getHomeByUserId);
router.get('/homes', HomeController.getHomes);
router.post('/updateHome/:homeId', HomeController.updateHome);
router.post('/registrationHome', HomeController.createHome);
router.delete('/:homeId', Authorization, HomeController.removeHome);
 

module.exports = router;