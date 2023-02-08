var express = require('express');
const { checkJwt } = require('../app');
var router = express.Router();

/* GET summary. */
router.get('/', checkJwt, function (req, res, next) {
  res.json({ message: 'respond with some summary' });
});


module.exports = router;
