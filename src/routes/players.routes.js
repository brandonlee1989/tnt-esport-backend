const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/players.controller');

router.get('/', controller.getAll);
router.post('/', auth, controller.create);
router.get('/:id', controller.getOneWithStats);
module.exports = router;
