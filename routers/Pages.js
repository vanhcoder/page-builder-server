const PageController = require('../controllers/PageController');

const router = require('express').Router();



router.get('/',PageController.get);
router.post('/',PageController.create);
router.get('/:slug',PageController.getBySlug);
router.delete('/:slug',PageController.delete);
router.post('/:slug',PageController.updatePage);




module.exports = router;