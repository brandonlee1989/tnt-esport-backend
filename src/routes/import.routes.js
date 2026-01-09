const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/import.controller');

router.post('/fc', auth, controller.importMatches);

module.exports = router;
