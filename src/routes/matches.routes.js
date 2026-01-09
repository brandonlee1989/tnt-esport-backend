const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/matches.controller');

router.get('/', controller.getPublished);
router.put('/:id', auth, controller.update);

module.exports = router;
