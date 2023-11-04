var express = require('express')
var router = express.Router()
var HomeController = require('../../controllers/homes.controller');
var MailController = require('../../controllers/mail.controller');
//var Authorization = require('../../auth/authorization');

router.get('/homes/:homeId', HomeController.getHome);
router.get('/homes', HomeController.getHomes);
router.post('/updateHome/', HomeController.updateHome);
router.post('/registrationHome', HomeController.createHome);
router.delete('/:homeId',  HomeController.removeHome);
 

module.exports = router;