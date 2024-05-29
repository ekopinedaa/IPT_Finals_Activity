const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const CheckUsername = require('../middleware/createuser')

router.post('/createuser', CheckUsername, UserController.CreateUser)
router.get('/getstudent/:username', UserController.FetchStudent);
router.get('/getadmins', UserController.FetchAdmins);
router.get('/getstudents', UserController.FetchStudents);
router.put('/editadmin/:userId', UserController.EditAdmin);
router.put('/editstudent/:userId', UserController.EditStudent);
router.post('/login', UserController.Login);

module.exports = router