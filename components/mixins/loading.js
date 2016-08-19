'use strict';

module.exports = {
    bindLoading: function (selector) {
        this._loadingSelector = selector;
    },
    loading: function (status, selector) {
        if (status == 'hide') {
            $(selector || this._loadingSelector || '.ui.dimmer', this.getDOMNode()).dimmer('hide');
        } else {
            $(selector || this._loadingSelector || '.ui.dimmer', this.getDOMNode()).dimmer('setting', {
                duration: {
                    show : 250,
                    hide : 250
                }
            }).dimmer('show');
        }
    }
}