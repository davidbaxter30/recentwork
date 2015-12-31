(function () {
    'use strict';

    angular
        .module('jedi', ['ngAnimate'])
        .controller('Macro', ['$http', '$scope', macro]);

    function macro($http, $scope) {
        $scope.macros = [];
        $scope.macroCount = 0;
        $scope.macroObject = [];

        $http({
                method: 'GET',
                url: 'macros.json'
            })
            .then(function (response) {
                var status = response.status;
                var macroObject = response.data;
                var macroCount = response.data.macros.length;
                console.log('status: ' + status);
                console.log('count: ' + macroCount);
                $scope.macroCount = macroCount;
                $scope.macroObject = macroObject;
                $scope.constructMacros();
            }, function (response) {
                var status = response.status;
                var macroObject = response.data || "request failed";
                console.log('status: ' + status);
                console.log('data: ' + macroObject);
            });

        $scope.constructMacros = function () {
            console.log('Starting Constructor');
            $scope.macros = [];
            $scope.macros.failed = [];
            $scope.macroCategories = [];

            $scope.macroObject.macros.forEach(setValues);

            function setValues(element, index) {
                macro = {};
                var contentObj = search("comment_value");
                macro.catagories = search("custom_fields_23452737");
                macro.title = element.title;
                macro.url = element.url;
                macro.id = element.id;

                if (!contentObj) {
                    return;
                };


                function search(field) {
                    for (var i = 0; i < element.actions.length; i++) {
                        if (element.actions[i].field == field) {
                            return element.actions[i].value;
                        }
                    }
                };



                if (angular.isArray(contentObj)) {
                    macro.content = contentObj[1];
                } else {
                    macro.content = contentObj;
                };


                $scope.macros.push(macro);

            };

            //            function isInArray(value, array) {
            //                return array.indexOf(value) > -1;
            //            };

            //            for (var i = 0; i < $scope.macros.length; i++) {
            //                if (isInArray($scope.macros[i].catagories, $scope.macroCategories)) {
            //                    $scope.macroCategories.push($scope.macros[i].catagories);
            //                    console.log($scope.macros[i].catagories);
            //                }
            //
            //            };
            //            console.log($scope.macroCategories);
        };
    };
})();
