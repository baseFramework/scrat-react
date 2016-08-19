'use strict';

var fns = require('functions'),
    config = require('config'),
    cookies = require('cookies'),
    international = require('m-international'),
    request = require('request');

var pages = {
    login:require('p-login'),
    dash:require('p-dash')
};

module.exports = function () {
    console.log('Running ...');

    $.ajaxSetup({
        headers: {
            'Content-Type': 'text/plain; charset=UTF-8'
        }
    });
    // 维护持路由表，用于获取path上的参数
    // 支持部分匹配
    var routes = {
        login:'/login',
        dash:'/dash'
    },

    currentComponent = {};

    //page('/login',function(ctx, next){
    //    var pageNameMathes = ctx.pathname.match(/^\/([^\/\?\#]+)/),
    //        pageName = pageNameMathes && pageNameMathes[1] ? pageNameMathes[1].replace(/^\//, '') : '';
    //    console.log(pageName + 'next');
    //    var Component = pages[pageName],
    //        path =   ctx.pathname,
    //        rule =   routes[pageName];
    //    var params = fns.paramParse(path, rule),
    //        instance;
    //    if (currentComponent.pageName != pageName) {
    //        instance = React.renderComponent(Component(), document.querySelector('#wrapper'));
    //        currentComponent = {
    //            pageName: pageName,
    //            instance: instance
    //        };
    //    }
    //    // 更新参数
    //    currentComponent.instance.setProps({
    //        ctx: ctx,
    //        params: params,
    //        queries: fns.queryParse(ctx.querystring)
    //    });
    //    //next();
    //})

    page('*', function (ctx, next) {
           // debugger;
            var pageNameMathes = ctx.pathname.match(/^\/([^\/\?\#]+)/),
              pageName = pageNameMathes && pageNameMathes[1] ? pageNameMathes[1].replace(/^\//, '') : '';
            if (pageName && pages[pageName]) {
                var Component = pages[pageName],
                    path =   ctx.pathname,
                    rule =   routes[pageName];
                  var params = fns.paramParse(path, rule),
                  instance;
                // 页面单例
                if (currentComponent.pageName != pageName) {
                    instance = React.renderComponent(Component(), document.querySelector('#wrapper'));
                    currentComponent = {
                        pageName: pageName,
                        instance: instance
                    };
                }
                // 更新参数
                currentComponent.instance.setProps({
                    ctx: ctx,
                    params: params,
                    queries: fns.queryParse(ctx.querystring)
                });
            } else {
               page('/login');
            }
    });
    // page.js settings
    page({
        popstate: true,
        dispatch: true,
        click: false
    });
};