'use strict';

var config = require('config'),
    api = config.api,
    fns = require('functions'),
    international = require('m-international'),
    mock = require('mock');

/**
 *  @param keyPath {String} clazz
 *  @example request('table[0-100]', ...)
 **/
function request () {
    var ajaxOptions = parseParams.apply(this, arguments);
    if (!mocking(ajaxOptions)) {
        $.ajax(ajaxOptions);
    }
}
request.get = function () {
    var ajaxOptions = parseParams.apply(this, arguments);
    ajaxOptions.type = 'GET';
    if (!mocking(ajaxOptions)) {
        $.ajax(ajaxOptions);
    }
};
request.put = function () {
    var ajaxOptions = parseParams.apply(this, arguments);
    ajaxOptions.type = 'PUT';
    if (!mocking(ajaxOptions)) {
        $.ajax(ajaxOptions);
    }
};
request.post = function () {
    var ajaxOptions = parseParams.apply(this, arguments)
    ajaxOptions.type = 'POST';
    if (!mocking(ajaxOptions)) {
        $.ajax(ajaxOptions);
    }
};
request.delete = function () {
    var ajaxOptions = parseParams.apply(this, arguments)
    ajaxOptions.type = 'DELETE';
    if (!mocking(ajaxOptions)) {
        $.ajax(ajaxOptions);
    }
};
request.pathFixing = pathFixing;

request.getBaseAPI = getBaseAPI;


/**
 *  data mocking
 **/
function mocking (ajaxOptions) {
    var url = ajaxOptions.url,
        method = ajaxOptions.type.toUpperCase(),
        rules = Object.keys(mock),
        path = fns.getUriPath(ajaxOptions.url).trim(),
        destPath = '[@m] @p'.replace('@m', method).replace('@p', path),
        matchMockData

    // matching
    rules.some(function (rule) {
        if (fns.ruleMatch(rule, destPath)) {
            matchMockData =  mock[rule];
            return true;
        }
    })
    if (matchMockData) {
        fns.saveCall(ajaxOptions.success)(fns.copy(matchMockData))
        return true;
    }
    return false
}
/**
 *  ajax overwrite and add hook
 **/
function parseParams (/*url, [params], success, [error], [options]*/) {
    var args = Array.prototype.slice.call(arguments),
        // keyPath = args.shift(),
        api = args[0],
        ajaxOptions,
        params, success, error, options,
        errorArgIndex;

    // 此处实现参数重载
    if ( fns.type(api) == 'object') {

        ajaxOptions = args[0];
        api = ajaxOptions.url;
        //console.log(api)
        ajaxOptions.url = pathFixing(api);
    } else {
        //console.log(api)
        api  = pathFixing(api);
        if (fns.type(args[1]) == 'object' || fns.type(args[1]) == 'string') {
            params = args[1];
            success = args[2];
            errorArgIndex = 3; // 标识带判断error参数位置
        } else {
            params = {};
            success = args[1];
            errorArgIndex = 2; // 标识带判断error参数位置
        }
        // 获取error参数
        fns.type(args[errorArgIndex]) == 'function' && (error = args[errorArgIndex]);
        // 获取option参数
        fns.type(args[args.length - 1]) == 'object' && (options = args.pop());

        options || (options = {});

        ajaxOptions = {
            url: api,
            type: options.type || 'GET',
            data: params,
            success: success,
            error: error
        };

        // 添加可选参数
        ajaxOptions = fns.extend({}, options, ajaxOptions);
    }
    var originSuccess = ajaxOptions.success,
        originError = ajaxOptions.error;

    ajaxOptions.success = successHook(originSuccess, ajaxOptions)
    ajaxOptions.error = errorHook(originError, ajaxOptions)
    return ajaxOptions;
}

/**
 *  Fill the path width base path or nomalize path alise from config
 *  此处不作路径检验，由使用者保证路径的正确性
 **/
function pathFixing (api) {
    if ( !api.match('/') && config.api[api] ) {
        api = config.api[api];
    }
    return getBaseAPI() + api;
}
function successHook (success, options) {
    return function (data, xhr) {
        fns.saveCall(success).apply(this, arguments);
    }
}
function errorHook (error, options) {
    return function (err, xhr) {
        fns.saveCall(error).apply(this, arguments);
    }
}

function getBaseAPI(){

}

module.exports = request;