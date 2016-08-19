/**
 *  Simple Pub/Sub module
 **/

'use strict';

var evtObjs = {};

module.exports = {
    on: function (evtType, handler) {
        if (!evtObjs[evtType]) {
            evtObjs[evtType] = [];
        }
        evtObjs[evtType].push({
            handler: handler
        })
    },
    off: function (evtType, handler) {
        var types;
        if (evtType) {
            types = [evtType];
        } else {
            types = Object.keys(evtObjs);
        }
        types.forEach(function (evtType) {
            var handlers = evtObjs[evtType],
                newHandlers = [];

            handlers.forEach(function (evthandler) {
                if (evthandler !== handler) {
                    newHandlers.push(evthandler)
                }
            });
            evtObjs[evtType] = newHandlers;
        });

        return this;
    },
    emit: function (evtType, data) {
        var handlers = evtObjs[evtType];
        handlers.forEach(function (item) {
            item.handler && item.handler(data);
        });
    }
}