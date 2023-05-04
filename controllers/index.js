const router = require('express').Router();
const apiRoutes2 = require('./api2');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes2);



module.exports = router;