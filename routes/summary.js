var express = require('express');
var router = express.Router();

/* GET summary. */
router.get('/', function (req, res, next) {
  res.json({ message: 'respond with some summary' });
});

module.exports = router;
