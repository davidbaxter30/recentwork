(function () {
    'use strict';

    angular
        .module('jedi', ['ngAnimate'])
        .controller('Macro', ['$http', '$scope', macro]);

    function macro($http, $scope) {
        $scope.macros = [];
        $scope.macroCount = 0;
        $scope.macroObject = [];

        console.log('starting http');
        $http({
                method: 'GET',
                url: 'macros.json'
            })
            .then(function (response) {
                var status = response.status;
                var macroObject = response.data;
                var macroCount = response.data.macros.length;
                console.log('status: ' + status);
                console.log('data: ' + macroObject);
                console.log('count: ' + macroCount);
                $scope.macroCount = macroCount;
                $scope.macroObject = macroObject;
                $scope.constructMacros();
                console.log($scope.macros);
            }, function (response) {
                var status = response.status;
                var macroObject = response.data || "request failed";
                console.log('status: ' + status);
                console.log('data: ' + macroObject);
            });

        $scope.constructMacros = function () {
            console.log('Starting Constructor');
            var macros = [];

            $scope.macroObject.macros.forEach(setValues);

            function setValues(element, index) {
                var macro = {};
                
                
                
                if (!element.actions[4]) {
                    return;
                }

                if (Array.isArray(element.actions[4].value)) {
                    macro.content = element.actions[4].value[1];
                } else {
                    macro.content = element.actions[4].value;
                };
                
                macro.title = element.title;
                macro.url = element.url;
                macro.id = element.id;
                $scope.macros.push(macro);

            };
        };
    };
})();
