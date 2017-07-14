(function (window) {
    'use strict';

    function parseConnectionString(cs) {

        if (typeof cs !== 'string') {
            throw new TypeError('Invalid connection string!');
        }

        // remove all trailing space symbols:
        cs = cs.replace(/^[\s]*|[\s]*$/g, '');

        var idx = cs.search(/[\s]/);
        if (idx >= 0) {
            // no space symbols allowed inside the URL:
            throw new Error('Invalid URL character at position ' + idx);
        }

        var result = {};

        var m = cs.match(/^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+)|$)/);
        if (m[5]) {
            var params = {};
            m[5].split('&').map(function (x) {
                var a = x.split('=');
                if (a[0] && a[1]) {
                    params[a[0]] = a[1];
                }
            });
            if (Object.keys(params).length) {
                result.params = params;
            }
        }

        if (m[1]) {
            result.protocol = m[1];
        }

        var login = m[2] && m[2].split(':');
        if (login) {
            if (login[0]) {
                result.user = login[0];
            }
            if (login[1]) {
                result.password = login[1];
            }
        }

        if (m[3]) {
            console.log('m[3]:', m[3]);
            result.host = '';
            var addr = m[3].split(':');
            if (addr[0]) {
                result.hostname = addr[0];
                result.host = result.hostname;
            }
            if (addr[1]) {
                result.port = addr[1];
                result.host += ':' + result.port;
            }
        }

        if (m[4]) {
            var segments = m[4].split('/');
            result.segments = segments;
        }

        return result;
    }

    /* istanbul ignore else */
    if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = parseConnectionString;
    }
    else {
        window.parseConnectionString = parseConnectionString;
    }
})(this);

var s = module.exports('://');

