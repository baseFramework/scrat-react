'use strict';

var message = require('message')

module.exports = {
    isFullscreen: function () {
        return localStorage.getItem('fullscreen:enable') == 'enable' ? true:false;
    },
    enable: function () {
        localStorage.setItem('fullscreen:enable', 'enable');
        message.emit('fullscreen', 'enable')
    },
    disable: function () {
        localStorage.setItem('fullscreen:enable', 'disable');
        message.emit('fullscreen', 'disable')
    },
    toggle: function () {
        if (this.isFullscreen()) {
            this.disable();
        } else {
            this.enable();
        }
    }
}