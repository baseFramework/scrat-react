'use strict';

var key = 'nation',
  DEFAULT_NATION = 'china',
  message = require('message'),
  cookies = require('cookies')

var International = {
  set: function (nextNation) {
    var preNation = this.get();
    localStorage.setItem(key, nextNation);
    cookies.set(key, nextNation);
    if (preNation !== nextNation) {
      message.emit('nation:change', nextNation);
    }
    return this;
  },
  get: function () {
    return localStorage.getItem(key) || DEFAULT_NATION;
  }
};
// sync to server
cookies.set(key, International.get());

module.exports = International;