var express = require('express');
var router  = express.Router();

router.get('/', function (req, res, next) {
  res.render('tests', { layout: 'test_layout' });
});

module.exports = router;