var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('Trollolol/TrollViewAll', {title1: 'I spent time on this joke...'})
});

module.exports = router;
