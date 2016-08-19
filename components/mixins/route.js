'use strict';


var fns = require('functions')

function route (url) {

    if (url.match(/^http[s]*\:\/\//)) {
        window.location.href = url;
    } else {
        page.replace(url)
    }
}

function redirect (url) {
    if (url.match(/^http[s]*\:\/\//)) {
        window.location.href = url;
    } else {
        page(url)
    }
}
module.exports = {
    onRoute: function (e) {
        e.preventDefault();
        var url = e.currentTarget.dataset.url || e.currentTarget.getAttribute('href');
        if (url) {
            route(url)
        }
    },
    onRedirect: function (e) {
        e.preventDefault();
        var url = e.currentTarget.dataset.url || e.currentTarget.getAttribute('href');
        if (url) {
            redirect(url);
        }
    },
    /**
     *  保留页面查询参数
     **/
    onSaveRedirect: function (e) {
        e.preventDefault();
        var url = e.currentTarget.dataset.url || e.currentTarget.getAttribute('href'),
            originSearch = window.location.search;

        if (url) {
            redirect(url + originSearch);
        }
    },
    /**
     *  保留页面查询参数
     **/
    onSaveRoute: function (e) {
        e.preventDefault();
        var url = e.currentTarget.dataset.url || e.currentTarget.getAttribute('href'),
            originSearch = window.location.search;

        if (url) {
            route(url + originSearch);
        }
    },
    onQuery: function (e) {
        e.preventDefault();
        var url = e.currentTarget.dataset.url || e.currentTarget.getAttribute('href')
        if (url) {
            if (!url.match(/^\?/)) url = '?' + url;
            route(location.pathname + url);
        }
    },
    onSaveQuery: function (e) {
        e.preventDefault();
        var url = e.currentTarget.dataset.url || e.currentTarget.getAttribute('href')
        if (url) {
            var queries = fns.queryParse(url.replace(/^\?/, '')),
                originQueries = fns.queryParse(window.location.search.replace(/^\?/, ''))

            route(location.pathname + '?' + fns.queryStringify(fns.extend({}, originQueries, queries)));
        }
    },
    redirect:redirect
}