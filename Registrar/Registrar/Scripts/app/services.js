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