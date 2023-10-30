var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var MailController = require('../../controllers/mail.controller');
var Authorization = require('../../auth/authorization');

router.get('/myProfile/:token', UserController.getUser);
router.post('/updateUser/', UserController.updateUser);
router.post('/registration', UserController.createUser);
router.delete('/:id', Authorization, UserController.removeUser);
router.post('/login', UserController.loginUser);
router.post('/guardarImgUser', UserController.guardarImagenUser);
router.post('/sendMail', MailController.sendEmail);

module.exports = router;