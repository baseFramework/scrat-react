var express = require('express');
var router = express.Router();
var request = require('request');
var napiProxy = require('./napi-proxy');

router.post('/login/token', function(req, res){
    //url=http://napi.uc.cn/3/open/oauth2/token
    var url = napiProxy.getBaseAPI(req) + napiProxy.uriPrefix + '/oauth2/token';
    request.post(url, {form: req.body}, function(error, response, body){
        if(error) {
            res.send(404);
        }
        var authInfo = JSON.parse(body);
        var authToken = authInfo.token_type + ' ' + authInfo.access_token;
        res.cookie(req.cookies.nation + '-token', authToken, {expires: new Date(Date.now() + (parseInt(authInfo.expires_in) * 1000))});
        res.send(200, 'success');
    });
});

module.exports = router;
