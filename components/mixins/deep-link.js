/**
 *  State-Value LinkMinxins in deep-path
 **/

'use strict;'

function getIn(object, path) {
    var stack = path.split('.');
    while (stack.length > 1) {
        object = object[stack.shift()];
    }
    return object[stack.shift()];
}

function updateIn(object, path, value) {
    var current = object,
        stack = path.split('.');
    while (stack.length > 1) {
        current = current[stack.shift()];
    }
    current[stack.shift()] = value;
    return object;
}

function setPartialState(component, path, cb, value) {
    component.setState(
        updateIn(component.state, path, value));
    cb(value);
}
function NOOP () {
    // NOOP
}
module.exports =  {
    linkState: function(path, cb) {
        return {
            value: getIn(this.state, path),
            requestChange: setPartialState.bind(null, this, path, cb || NOOP)
        }
    }
}
