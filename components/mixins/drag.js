/**
 *  table resizing
 **/
'use strict';

module.exports = {
    onDrag: function (e) {
        if (this._dragObj && e.pageX) {
            var $parent = this._dragObj.target.parentNode,
                offsetX = e.pageX - this._dragObj.clientX;
            $parent.style.width = (this._dragObj.parentOriginWidth + offsetX) + 'px';
        }
    },
    onDragStart: function (e) {
        var tar = e.currentTarget;
        this._dragObj = {
            target: e.currentTarget,
            clientX: e.pageX,
            parentOriginWidth: $(tar.parentNode).width()
        }
    },
    onDragEnd: function (e) {
        if (this._dragObj && e.pageX) {
            var $parent = this._dragObj.target.parentNode,
                offsetX = e.pageX - this._dragObj.clientX;
            $parent.style.width = (this._dragObj.parentOriginWidth + offsetX) + 'px';
        }
        this._dragObj = null;
    }
}