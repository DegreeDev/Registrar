r("bindings.app", function () {
    (function ($, ko, ViewModel, services) {
        var model = new ViewModel();
        ko.applyBindings(model, services.elements.bindings);
    })(window.jQuery, window.ko, app.ViewModel, app.services);
});
