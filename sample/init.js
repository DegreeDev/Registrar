r("init.app", function () {
    (function ($, ko, exports) {
        //set up object for the rest of the app to use; 
        exports.app = {
            services: {}
        };
    })(window.jQuery, window.ko, window);
}).OnReady(["missing", "init.app", "services.app", "viewmodel.app", "bindings.app", "runlater", "test", "boo", "not there"]);

registra.Configuration({ debug: true });

registra.r("test", function () {
    console.log("ran test");
}).r("boo", function () {
    console.log("ran boo");
});