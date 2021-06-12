const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/', userController.getHomePage);

router.get('/home', userController.getHomePage);

router.post('/user/add-playlist', userController.postPlaylist);

router.put('/user/edit-playlist/:playlistId', userController.putPlaylist);

router.delete('/user/delete-playlist/:playlistId', userController.deletePlaylist);

router.delete('/user/delete-song/:playlistId', userController.deleteSong);

module.exports = router;