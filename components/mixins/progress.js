'use strict';
module.exports = {
    progressing: function () {
        this.setState({
            progress: 0 
        });
        this._timer = setInterval( function() {
            if (this.state.progress < 100) {
                this.setState({
                    progress: this.state.progress + 5
                });
            }
        }.bind(this), 200);
    },
    progress: function () {
        var $tar = $(this.getDOMNode()).find('.progress-dimmer');
        clearTimeout(this._timer);
        if ($tar.length) {
            $tar.addClass('active');
            this.progressing();
        }
    },
    progressDone: function () {
        this.setState({
            progress: 100 
        });
        setTimeout(function() {
            $(this.getDOMNode()).find('.progress-dimmer').removeClass('active');
        }.bind(this), 250);
            
    }
}