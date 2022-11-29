const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

//create,find,update,delete
router.get('/', userController.view);
router.post('/', userController.find);


router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get('/edituser/:numberplate', userController.edit);
router.post('/edituser/:numberplate', userController.update);
router.get('/:numberplate', userController.delete);
router.get('/viewuser/:numberplate', userController.viewall);
router.post('/viewuser/:numberplate', userController.find2);
module.exports = router ;