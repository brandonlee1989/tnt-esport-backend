const router = require('express').Router();
const controller = require('../controllers/championships.controller');

router.get('/', controller.getAll);

module.exports = router;
