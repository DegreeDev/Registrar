(function (exports) {
    if (exports.jQuery === undefined) {
        console.error("jQuery is required for registrar");
        return;
    }
    exports.registra = (function ($, exports, document) {
        var config = { 
				debug: true,
				app: null
			},
			callbacks = {},
			_getApp = function(key){
				var callback = config.app ? callbacks[config.app][key] : callbacks[key];
				if (!callback) {
					_error("The callback with associated with '" + key + "' was not found");
					return false;
				}
				return callback;
			},
			_runApp = function(key){
				_log("Actually running: " + key);
				var app = _getApp(key)
				if(app)app();
			},
			_setApp = function(key, callback){
				if(config.app)
					callbacks[config.app][key] = callback;
				else	
					callbacks[key] = callback;
			},
			_log = function (message) {
				if (config.debug)
					console.log(message);
			},
			_error = function (message) {
				console.error(message);
			},
			_registrationCheck = function (key, callback) {
				if (!callback) {
					_error("You must supply a callback function.");
					return false;
				}
				if (!key) {
					_error("You must supply a key.");
					return false;
				}
				if (callbacks[key]) {
				    _error("A callback with this key has already been registered");
				    return false;
				}
				if (callbacks[key]) {
					_error(key + " has already been registered. You can only register a key once.");
					return false;
				}
				if (typeof (callback) !== 'function') {
					_error(key + "'s callback is not a function.");
					return false;
				}
				return true;
			},
			_register = function (key, callback) {
				_log("registered: " + key);
				if (!_registrationCheck(key, callback)) return;
				_setApp(key, callback);
				return {
					OnReady: _onReady,
					Now: function () {
						_runApp(key);
					},
					r: self.r
				};
			},
			_isDebug = function () {
				return config.debug;
			},
			_onReady = function (keys) {
				$(function () {
					for (var i = 0; i < keys.length; i++) {
						var key = keys[i],
							nextKey = keys[i + 1] || null;
						_runApp(key);
						if (nextKey)
							$(document).trigger(nextKey);
					}
				});
			},
			_setConfig = function (c) {
				$.extend(config, c);
			};
            
        $.extend(self, { r: _register });
        return {
            r: _register,
            Configuration: _setConfig,
            IsDebug: _isDebug,
        };
    })(exports.jQuery, exports, document);
})(window);