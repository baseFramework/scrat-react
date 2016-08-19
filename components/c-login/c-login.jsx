/** @jsx React.DOM */
'use strict';

module.exports = React.createClass({
    componentDidMount: function() {
        $(window).on('keydown', this.onPressEnter);
    },
    componentWillUnmount: function () {
        $(window).off('keydown', this.onPressEnter);
    },
    render: function () {
        return (__inline('c-login.dom'));
    },
    onLogin: function () {
        $('.ui.message', this.getDOMNode()).fadeIn();
        page('/dash');
    },
    onInputFocus: function () {
        $('.ui.message', this.getDOMNode()).fadeOut();
    },
    onPressEnter: function (e) {
        if (e.keyCode == 13) {
            this.onLogin();
        }
    }
})