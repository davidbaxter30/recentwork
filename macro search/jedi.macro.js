(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('Macro', Macro);

    function Macro() {
        var vm = this;

        function category(macro, category) {
            if (category == macro.title.substr(0, addy.indexOf(':'))) {
                return false
            } else {
                return true
            }
        };
    }

})();
