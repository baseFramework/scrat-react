'use strict';
var util = {
    getCookie: function (name) {
        var start = document.cookie.indexOf(name + "=");
        var len = start + name.length + 1;
        if (( !start ) && ( name != document.cookie.substring(0, name.length) )) {
            return null;
        }
        if (start == -1) return null;
        var end = document.cookie.indexOf(';', len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len, end));

    },
    deleteCookie: function (name, path, domain) {
        if (this.getCookie(name)) {
            var result = name + "=123" + ((path) ? ";path=" + path : "") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu,01-Jan-1970 00:00:01 GMT";
            console.log(result);
            document.cookie = result;
        }
    },
    formatDate: function (fmt, date) { //author: meizz
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}
module.exports = util;