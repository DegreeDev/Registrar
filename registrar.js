(function (exports) {
    if (exports.jQuery === undefined) {
        console.error("jQuery is requird for registrar");
        return;
    }
    exports.registra = (function ($, exports, document) {
        var config = { DEBUG: true },
			callbacks = {},
            self = {
                _log: function (message, override) {
                    if (config.DEBUG || override)
                        console.log(message);
                },
                _error: function (message) {
                    console.error(message);
                },
                _registrationCheck: function (key, callback) {
                    if (!callback) {
                        self._error("You must supply a callback function.");
                        return false;
                    }
                    if (!key) {
                        self._error("You must supply a key.");
                        return false;
                    }
                    if (callbacks[key]) {
                        self._error(key + " has already been registered. You can only register a key once.");
                        return false;
                    }
                    if (typeof (callback) !== 'function') {
                        self._error(key + "'s callback is not a function.");
                        return false;
                    }
                    return true;
                },
                _register: function (key, callback) {
                    self._log("registered: " + key);
                    if (!self._registrationCheck(key, callback)) return;
                    callbacks[key] = callback;
                    return {
                        OnReady: self._onReady,
                        Now: function () {
                            callbacks[key]();
                        },
                        r: self.r
                    };
                },
                _isDebug:function () {
                    return config.DEBUG;
                },
                _onReady: function (keys) {
                    $(function () {
                        for (var i = 0; i < keys.length; i++) {
                            var key = keys[i],
                                callback = callbacks[key],
                                nextKey = keys[i + 1] || null;
                            self._log("Actually running: " + key);

                            if (!callback) {
                                self._error("The callback with associated with '" + key + "' was not found");
                                return;
                            }
                            callback();

                            if (nextKey)
                                $(document).trigger(nextKey);
                        }
                    });
                },
                _setConfig: function (c) {
                    config.DEBUG = c.debug;
                }
            };
        $.extend(self, { r: self._register });
        return {
            r: self._register,
            Configuration: self._setConfig,
            IsDebug: self._isDebug,
        };
    })(exports.jQuery, exports, document);
})(window);