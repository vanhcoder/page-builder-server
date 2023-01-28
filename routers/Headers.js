const HeaderController = require('../controllers/HeaderController');

const router = require('express').Router();


router.get('/',HeaderController.get);
router.post('/',HeaderController.create);
router.get('/:name',HeaderController.getByName);
router.post('/:name',HeaderController.updateHeader);



module.exports = router;