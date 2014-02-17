Registrar
=========

A simple way to register your js objects. All you do is set up your object with the r(on, callback). 

Then when you're ready ( and jquery is ) just mark the object you want to start with ( or any object really ) and pass in the object names in the order you want to run them in. And the Registrar takes care of the rest.  

Registrar.js
============
    window.registrar = {
	    config: {
	        DEBUG: true,
	        
	    },
	    log: function(message, level){
	        if (registrar.config.DEBUG)
	            console[level](message);
	    },
	    app: {},
	    register: function (on, callback) {
	        registrar.log("registered: " + on, "log");
	        registrar.app[on] = callback;
	        return {
	            OnReady: function (ons) {
	                $(function () {
	                    for (var i = 0; i < ons.length; i++) {
	                        registrar.log("acutlaly running: " + ons[i], "log");
	                        registrar.app[ons[i]]();
	                        if (ons[i + 1])
	                            $(document).trigger(ons[i + 1]);
	                    }
	                });
	            }
	        }
	    }
    };
    window.r = window.registrar.register;

init.js
============
	r("init.app", function () {
        //set up object for the rest of the app to use; 
		(function($, ko, exports){
			exports.app = {
			    services: {}
			};
    	})(window.jQuery, window.ko, window);
    }).OnReady(["init.app", "services.app", "viewmodel.app", "bindings.app"]);

services.js
============
	r("services.app", function () {
	    (function ($, ko, exports) {
	        var
	            services = {
	                elements: {
	                    bindings: $(".binding-context").get(0)
	                }
	            },
	            mock = {
	
	            };
	
	        ko.utils.extend(window.app.services, mock);
	
	        exports.services = services;

    	})(window.jQuery, window.ko, window.app);
    });

bindings.js
============
   	r("bindings.app", function () {
    	(function ($, ko, ViewModel, services) {
        	var model = new ViewModel();
        	ko.applyBindings(model, services.elements.bindings);
    	})(window.jQuery, window.ko, app.ViewModel, app.services);
   	});

viewmodel.js
============
   	r("viewmodel.app", function () {
	    (function ($, ko, exports, services) {
	        function ViewModel() {
	            var self = this;
	
	            self.id = ko.observable();
	            self.name = ko.observable("testing");
	            self.description = ko.observable();
	        }
	        exports.ViewModel = ViewModel;
	    })(window.jQuery, window.ko, window.app, window.services);
   	});
