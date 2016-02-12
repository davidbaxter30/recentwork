(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('Macro', ['$scope', 'dataservice', 'logger', '$sce', '$stateParams', macro]);

    function macro($scope, dataservice, logger, $sce, $stateParams) {
        $scope.loading = true;
        $scope.macroObject = [];
        $scope.macros = [];
        $scope.search = {};
        $scope.macro = {};
        $scope.constructMacros = constructMacros;


        $scope.constructMacros();

        $scope.$watch(function () {
            return dataservice.activeType
        }, function () {
            if (dataservice.activeType == 'macro' && $scope.macros.length > 0) {
                $scope.macros.forEach(function (element) {
                    if (element.id == $stateParams.ID) {
                        dataservice.data = element;
                    }
                })
            }
        }, true)

        /////////////////////////////////////

        function constructMacros() {
            console.log('Starting Constructor');

            dataservice.getMacros().then(function (data) {
                $scope.macroObject = data;
                $scope.loading = false;


                $scope.macroObject.forEach(setValues);
            })

            function setValues(element, index) {
                var macro = {};
                var contentObj = search("comment_value");
                macro.categories = search("custom_fields_23452737");
                macro.title = element.title;
                macro.url = element.url;
                macro.id = element.id;


                if (!contentObj || element.actions[0].field !== 'status' || search("assignee_id") === "773587783") {
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
                    macro.content = $sce.trustAsHtml(contentObj[1]);
                } else {
                    macro.content = $sce.trustAsHtml(contentObj);
                };

                $scope.macros.push(macro);
                if (dataservice.activeType == 'macro' && $stateParams.ID == macro.id) {
                    dataservice.data = macro;
                }

            };
        };
    };
})();
