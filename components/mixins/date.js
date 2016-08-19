module.exports = {
    date: function (date, template) {
        var dat;
        if (!date) return '';

        if (/^\d+$/.exec(date)) {
            dat = new Date(date);
        } else {
            var a = date.split(/[^0-9]/),
                dat = new Date;
                dateMethods = ['setFullYear', 'setMonth', 'setDate', 'setHours', 'setMinutes', 'setSeconds'];
            // 月份减一
            a = a.slice(0, 6);
            a[1] = a[1] -1;
            a.forEach(function (item, index) {
                dat[dateMethods[index]](item);
            });
        }
        var hours = dat.getHours(),
            minute = dat.getMinutes(),
            second = dat.getSeconds(),
            month = dat.getMonth() + 1,
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


        if (!template) {
            template = 'YY年MM月DD日 hh:mm:ss';
        }

        hours <= 9 && template.match('hh') && (hours = '0' + hours);
        minute <= 9 && (minute = '0' + minute);
        second <= 9 && (second = '0' + second);


        return template
                    .replace(/["']/g, '')
                    .replace('YY', dat.getFullYear())
                    .replace('MM', month)
                    .replace('month', months[month - 1])
                    .replace('DD',  dat.getDate())
                    .replace(/hh|h/,  hours)
                    .replace('mm',  minute)
                    .replace('ss',  second);
    }
}