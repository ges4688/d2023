var express = require('express')
var router = express.Router()
var RealStateController = require('../../controllers/realstate.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');

router.get('/myProfile/:token', RealStateController.getUser);
router.post('/updateUser/', RealStateController.updateUser);
router.post('/registration', RealStateController.createUser);
router.delete('/:id', Authorization, RealStateController.removeUser);
router.post('/login', RealStateController.loginUser);
router.post('/guardarImgUser', RealStateController.guardarImagenUser);
router.post('/sendMail', MailController.sendEmail);
router.post('/updateAtributesUser/', RealStateController.updateUser); // esto es para cambiar más atributos aparte de la password

module.exports = router;