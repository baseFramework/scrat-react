
var config = require('../config'),
    path = require('path'),
    async = require('async'),
    fs = require('fs'),
    express = require('express'),
    router = express.Router(),
    rootPath = path.join(__dirname, '../public', 'c', config.name, config.version);

console.log('[In Memory Cache] Load files of ' + rootPath);


// 递归获取指定目录下所有文件内容
function inMemoryFiles (dir, filesObj) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
        var filePath = path.join(dir, file),
            ext = path.extname(file),
            stat = fs.statSync(filePath);
        if (stat.isFile() && (ext == '.js' || ext == '.css') ) {
            filesObj[filePath] = fs.readFileSync(filePath, 'utf-8');
        } else if (stat.isDirectory()) {
            inMemoryFiles(filePath, filesObj);
        }
    });
}
var filesObj = {};
try {
    inMemoryFiles(rootPath, filesObj);
} catch (e) {
    console.log('[In Memory Cache] in memory file loading error :' + e);    
}


// 封装获取文件的接口，判断使用缓存还是进行文件IO
function getFile (path, encoding, callback) {
    var inMemoryFile = filesObj[path];
    if (inMemoryFile) {
        callback(null, inMemoryFile);
    } else {
        fs.readFile(path, encoding, function (err, content) {
            if (!err && content) {
                filesObj[path] = content;
            }
            callback(err, content);            
        });
    }
}


// Combo 服务
function comb (files, success, fail) {
    var root = path.join(__dirname, '../public');

    async.map(files, function (file, callback) {
        var filePath = path.join(root, 'c', file);
        if (file.match(/\.\./)) {
            // 防止读静态资源目录以外的文件
            callback.call(null, null, '');
            console.log('[Comb] Access "@file" forbidden'.replace('@file', file));
        } else {
            getFile(filePath, 'utf-8', function (err, content) {
                if (err && !err.mod) err.mod = 'combo.readFile';
                callback.call(err || null, err, content);
            });
        }
    }, function (err, files) {
        if (err && !err.mod) {
            err.mod = 'combo.async';
            fail(err);
        } else {
            success(files);
        }
    });
}

router.get('/co', function (req, res, next) {
    var i = req.originalUrl.indexOf('??'),
        j = req.originalUrl.indexOf('&');

    var files = ~j ? req.originalUrl.slice(i + 2, j).split(',') :
            req.originalUrl.slice(i + 2).split(',');

    var ext;
    comb(files, function (resources) {
        if (files && files.length) {
            ext = path.extname(files[0]);
            if (ext) {
                res.type(ext.slice(1));
            }
        }
        res.send(resources.join('\n'));
    }, function (err) {
        err = err || {};
        logger.error('[Comb] Comb service error in "/co??"' + err.message, err.stack);
        res.send(500, 'Comb service error')
    });
})

module.exports = router;