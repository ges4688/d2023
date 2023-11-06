var express = require('express')
var router = express.Router()
var RealStateController = require('../../controllers/realstate.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');

router.get('/myProfile/:token', RealStateController.getRealState);
router.post('/updateRealState/', RealStateController.updateRealState);
router.post('/registration', RealStateController.createRealState);
router.post('/RealstatePorId', RealStateController.getRealStateById);
router.delete('/:id', Authorization, RealStateController.removeRealState);
router.post('/login', RealStateController.loginRealState);
router.post('/guardarImgRealState', RealStateController.guardarImagenRealState);
router.post('/sendMail', MailController.sendEmail);
router.post('/updateAtributesRealState/', RealStateController.updateRealState); // esto es para cambiar más atributos aparte de la password

module.exports = router;