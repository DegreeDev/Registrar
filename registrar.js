(function(){
	window.registra = (function ($, exports, document) {
		var config = { DEBUG: true },
			app = {};
		function log(message, level) {
			if (config.DEBUG)
				console[level](message);
		}
		function Register(on, callback) {
			log("registered: " + on, "log");
			if(app[on])
			{
				log(on + " has already been registered. You can only register a key once", error);
				return;
			}
			app[on] = callback;
			return {
				OnReady: OnReady,
				IsDebug: IsDebug, 
				Now : function(){
					app[on]();
				}
			};
		}
		function IsDebug() {
			return config.DEBUG;
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
		return { r: Register };
	})(window.jQuery, window, document);
})();