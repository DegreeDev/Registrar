(function(exports, document){
	var config = { debug: false, performance: false },
		callbacks = {},
		callbacksRun = {},
		_error = function (message) {
			console.error(message);
		},
		_performanceStart = function (key) { 
			if (config.debug || config.performance) console.time(key);
		},
		_performanceEnd = function (key) {
			if (config.debug || config.performance) console.timeEnd(key);
		},

		_getCallback = function (key) {
			var callback = callbacks[key];
			if (!callback) {
				_error("The callback with associated with '" + key + "' was not found");
				return false;
			}
			return callback;
		},
		_runCallback = function (key) {
			_log("Actually running: " + key);
			var callback = _getCallback(key);
			if (callback) callback();
		},
		_setCallback = function (key, callback) {
			callbacks[key] = callback;
		},
		_log = function (message) {
			if (config.debug)console.log(message);
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
			if (!_registrationCheck(key, callback)) return;
			_setCallback(key, callback);
			return {
				OnReady: _onReady,
				Now: function () {
					_runCallback(key);
				},
				r: self.r
			};
			_log("registered: " + key);
		},
		_onReady = function (keys, debug, performance) {
			config.debug = debug;
			config.performance = performance;

			document.addEventListener('DOMContentLoaded', function () {
				_performanceStart("initialize");
				for (var i = 0, len = keys.length; i < len; i++) {
					var key = keys[i];
					_performanceStart(key);
					if (!callbacksRun[key]) {
						_runCallback(key);
						callbacksRun[key] = true;
					} else {
						_error("'" + key + "' was included more than once but has only been run once");
					}
					_performanceEnd(key);
				}
				_performanceEnd("initialize");
			});
		},
		registrar = {
			r: _register,
		};

	exports.r = _register;
	exports.registra = registrar;
})(window, document);