const express = require('express');
const UserController = require('../controllers/UserController');
const { userRepository } = require('../../infrastructure/repositories/repositoryInstance');

const router = express.Router();

// Pakai singleton repository
const userController = new UserController(userRepository);

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/', (req, res) => userController.getAll(req, res));
router.get('/:id', (req, res) => userController.getById(req, res));

module.exports = router;