var registra = (function ($, exports, document) {
    var config = { DEBUG: false },
        app = {};

    function log(message, level) {
        if (config.DEBUG)
            console[level](message);
    }

    function Register(on, callback) {
        log("registered: " + on, "log");
        app[on] = callback;

        return {
            OnReady: OnReady,
            IsDebug: IsDebug
        };
    }

    function IsDebug() {
        return config.DEBUG
    }

    function OnReady(ons, debug) {



        if (debug)
            config.DEBUG = debug;

        $(function () {
            for (var i = 0; i < ons.length; i++) {
                log("Actually running: " + ons[i], "log");
                app[ons[i]]();
                if (ons[i + 1])
                    $(document).trigger(ons[i + 1]);
            }

            
        });
    }

    return {
        r: Register
    };
})(window.jQuery, window, document);

