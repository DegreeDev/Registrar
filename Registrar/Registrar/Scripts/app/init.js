registra.r("init.app", function () {
    (function ($, ko, exports) {
        //set up object for the rest of the app to use; 
        exports.app = {
            services: {}
        };
    })(window.jQuery, window.ko, window);
}).OnReady(["init.app", "services.app", "viewmodel.app", "bindings.app"]);
