var express = require('express');
var router = express.Router();

var config = require('../config');

router.get('/*', function(req, res) {
    res.render('index', {
        config: JSON.stringify(JSON.stringify(config))
    });
});

module.exports = router;
