(function($, exports, document){
	var config = {
		defaultTrigger : "create.app",
		debug : false
	},
		keys = {};
		
	$(document).on("DOMNodeInserted", function () {
		$(document).trigger(config.defaultTrigger);
	}).trigger("DOMNodeInserted").trigger(config.defaultTrigger);
		
	function _log(message, override) {
		if (config.DEBUG || override)
			console.log(message);
	}
	function _error(message) {
		console.error(message);
	}
	function _setConfig(c){
		$.extend(config, c);
	}
	function _isDebug(){
		return config.debug;
	}
	function _check(key, selector, callback){
		if(!key){
			_error("key is required");
			return false;
		}
		if(keys[key]){
			_error("The key '" + key + "' is already registred");
			return false;
		}
		if(!selector){
			_error("Selector is required");
			return false; 
		}
		if(!_checkCallback(callback))
			return false;
					
		return true;
	}
	function _checkCallback(callback){
		if(!callback){
			_error("A callback must be supplied");
			return false;
		}
		if(typeof(callback) !== 'function'){
			_error("Callback must be a function");
			return false;
		}
		return true; 
	}
		
	function _setup(key, selector, callback, precallback) {
		if(!_check(key, selector, callback))return; 
		if(precallback && _checkCallback(precallback))precallback();

		keys[key] = {
			key : key, 
			selector : selector, 
			callback: callback, 
			precallback: precallback
		};
		_run(key);
			
	}
	function _run(key){
		$(document).on(config.defaultTrigger, function(){
			var app = keys[key];
			$(app.selector).each(function(index, element){
				var $self = $(element);
				if ($self.data(key + "-setup")) { return; }
				else { $self.data(key +"-setup", true); }
				app.callback(index, element);
			});
		}).trigger(config.defaultTrigger);
	}
	exports.unobtrusive = {
		setup: _setup,
		Configuration: _setConfig,
		IsDebug: _isDebug,
	};
})(window.jQuery, window, document);