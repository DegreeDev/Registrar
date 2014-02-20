registra.r("viewmodel.app", function () {
    (function ($, ko, exports, services) {
        function ViewModel() {
            var self = this;

            self.id = ko.observable();
            self.name = ko.observable("testing");
            self.description = ko.observable("description");
        }
        exports.ViewModel = ViewModel;
    })(window.jQuery, window.ko, window.app, window.services);
});

registra.r("runnow", function(){
	console.log("ran now!!");
}).Now();

registra.r("runlater", function(){
	console.log("ran later!!");
});