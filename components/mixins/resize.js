/**
 *  Drag resizing in mouse implementation
 **/
'use strict';

module.exports = {
    onMouseDown: function (e) {
        var tar = e.target;
        if ($(tar).hasClass('resizer')) {
            e.preventDefault();
            this._mouseObj = {
                target: tar,
                clientX: e.pageX,
                parentOriginWidth: tar.parentNode.offsetWidth
            }
            $(this.getDOMNode()).css({
                cursor: 'col-resize'
            })
        }
    },
    onMouseMove: function (e) {
        var evtObj = this._mouseObj;
        if (evtObj && e.pageX) {
            var $parent = evtObj.target.parentNode,
                offsetX = e.pageX - evtObj.clientX;
            this.onResize && this.onResize(evtObj.target.parentNode, {
                originWidth: evtObj.parentOriginWidth,
                offsetX: offsetX,
                target: $parent
            })
        }
    },
    onMouseUp: function (e) {
        if (this._mouseObj) {
            this._mouseObj = null;
            $(this.getDOMNode()).css({
                cursor: 'default'
            })
        }
    },
    onMouseOut: function (e) {
        if (this._mouseObj) {
            this._mouseObj = null;
            $(this.getDOMNode()).css({
                cursor: 'default'
            })
        }
    }
}