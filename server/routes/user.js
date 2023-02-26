const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/add', userController.addUser);
router.post('/get', userController.getUsers);
router.put('/update', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);


module.exports = router;