Registrar
=========

A simple way to register your js objects. All you do is set up your object with the r(on, callback). 

Then when you're ready ( and jquery is ) just mark the object you want to start with ( or any object really ) and pass in the object names in the order you want to run them in. And the Registrar takes care of the rest.  

Registrar.js
============
	var registra = (function ($, exports, document) {
    	var config = { DEBUG: true },
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

