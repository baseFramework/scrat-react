/**
 *  默认从大到小
 **/
'use strict';

module.exports = {
    sortBy: function (list, filed, reverse) {
        if (!list || list.length <= 1) return list;
        list = list.slice(0);
        list.sort(function (a, b) {
            if (a[filed] < b[filed]) {
                return -1;
            } else if (a[filed] > b[filed]) {
                return 1;
            } else {
                return 0;
            }
        });
        // 防止有些浏览器出现倒叙
        if (reverse && reverse !== 'true' && (list[0][filed] > list[list.length - 1][filed])) {
            list = list.reverse();
        } else if ((!reverse || reverse == 'false') && (list[0][filed] < list[list.length - 1][filed])) {
            list = list.reverse();
        }

        return list;
    }
}