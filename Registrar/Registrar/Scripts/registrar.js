(function ($, ko) {

    window.registrar = {
        keys: {},
        register: function (key, app, obj, requirements) {
            var self = this;
            if (registrar.keys[app][key]) console.error(key + " has already be registered");


            

            return {
                Start: function (obj) {
                    window[app][key](obj);
                }
            }
        }
    };
    window.r = window.registrar.register;

    window.r = function (key, app, obj, requirements) {
        var self = this;
        console.log("attempting to register: " + key);

        if (!window[app]) {
            window[app] = {};
        }

        self.isValidToRegister = ko.computed(function () {
            return ko.utils.arrayFilter(requirements, function (requirement) {
                window[app][requirement] !== undefined;
            }).length === 0;
        });
        self.isValidToRegister.subscribe(function (newValue) {
            if (newValue) {
                if (window[app][key]) {
                    console.error(key + "has already been registered");
                    return;
                }
                window[app][key] = obj;

                ko.utils.arrayForEach(self.callbacks, function (callback) {
                    callback();
                    self.callbacks.remove(callback);
                });
            }
        });
        self.callbacks = ko.observableArray();
        return {
            Start: function (data) {
                if (self.isValidToRegister()) {
                    window[app][key](data);
                } else {
                    self.callbacks.push(this);
                }
            }
        };

    };

})(window.jQuery, window.ko);

r("bindings", "app", function () {
    ko.applyBindings(new app.viewmodel());
}, ["viewmodel", "services", "resource"]).Start();

r("viewmodel", "app", function (data) {
    var self = this;

    self.id = ko.observable();
    self.name = ko.observable();

    self.resources = ko.observableArray();

    self.AddResource = function () {
        self.resources.push(new app.resource());
    };

    self.mainr = new app.resource();

});

r("resource", "app", function (data) {
    var self = this;

    self.name = ko.observable();

    console.log("called a new resource");
});

r("services", "app", function () {

});


