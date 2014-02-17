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