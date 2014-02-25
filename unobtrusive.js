(function (exports) {
    if (exports.jQuery === undefined) {
        console.error("jQuery is requird for registrar");
        return;
    }
    exports.unobtrusive = (function ($, exports, document) {
		var config = {
			defaultTrigger : "create.app",
			debug : false
		},
		keys = {};
		
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
		
		function _setup(key, selector, callback, trigger, precallback){
			if(!_check(key, selector, callback))return; 
			trigger = trigger || config.defaultTrigger;
			if(_checkCallback(precallback)){
				precallback();
			}
			keys[key] = {
				key : key, selector : selector, callback: callback, trigger: trigger, precallback: precallback
			};
			_run(key, selector, callback, trigger);
			
		}
		function _run(key, selector, callback, trigger){
			$(function(){
				$(document).on(trigger, function(){
					$(selector).each(function(index, element){
						var $self = $(element);
						if ($self.data(key + "-setup")) { return; }
						else { $self.data(key +"-setup", true); }
						callback(index, element);
					});
				}).trigger(trigger);
			});
		}
		
		console.log("ran unobtrusive");
		return {
            setup: _setup,
            Configuration: _setConfig,
            IsDebug: _isDebug,
        };
    })(exports.jQuery, exports, document);
})(window);