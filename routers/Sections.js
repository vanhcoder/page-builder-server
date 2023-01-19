const SectionController = require('../controllers/SectionController');

const router = require('express').Router();


router.get('/',SectionController.get);
router.post('/',SectionController.create);
router.delete('/:slug',SectionController.delete);



module.exports = router;