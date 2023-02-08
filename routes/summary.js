var express = require('express');
// const { checkJwt } = require('../app');
var router = express.Router();

/* GET summary. */
router.get('/', function (req, res, next) {
  setTimeout(() => {
    res.json({ message: 'respond with some summary' })
  }, 60000 * 5)
});


module.exports = router;
