const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

router.get('/', sauceCtrl.getAllStuff);
router.post('/', sauceCtrl.createThing);
router.get('/:id', sauceCtrl.getOneThing);
router.put('/:id', sauceCtrl.modifyThing);
router.delete('/:id', sauceCtrl.deleteThing);

module.exports = router;
