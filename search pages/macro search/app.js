(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('Macro', ['$http', '$scope', 'dataservice','logger', macro]);

    function macro($http, $scope, dataservice, logger) {
        $scope.macros = [];
        $scope.macroObject = [];
        $scope.macros.failed = [];
        $scope.macroCategories = [];
        $scope.categoryName = categoryName;
        $scope.changeCategory = changeCategories;
        $scope.search = {};
        
        

//        $http({
//                method: 'GET',
//                url: 'macros.json'
//            })
//            .then(function (response) 
//                var macroObject = response.data;
//                var macroCount = response.data.macros.length;
//                $scope.macroCount = macroCount;
//                $scope.macroObject = macroObject;
//                $scope.constructMacros();
//            }, function (response) {
//                var status = response.status;
//                var macroObject = response.data || "request failed";
//                console.log('status: ' + status);
//                console.log('data: ' + macroObject);
//            });

        $scope.constructMacros = function () {
            console.log('Starting Constructor');
            
            dataservice.getMacros().then( function (data) {
                $scope.macroObject = data; 
            
            
            $scope.macroObject.macros.forEach(setValues);
            setCategories();
                
            })

            function setValues(element, index) {
                macro = {};
                var contentObj = search("comment_value");
                macro.categories = search("custom_fields_23452737");
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

            function setCategories() {
                for (var i = 0; i < $scope.macros.length; i++) {
                    var category = $scope.macros[i].categories;
                    if ($scope.macroCategories.indexOf(category) < 0 && !(category === undefined || category === "")) {
                        $scope.macroCategories.push(category);
                    } else
                    if (category < 0 && (category === undefined || category === "")) {
                        category = "other";
                        $scope.macroCategories.push(category);
                    }
                };
            };
        };
        
        $scope.constructMacros(); 

        function categoryName(category) {
            var nameFixed = category.replace(/\_/g, ' ');
            return nameFixed;
        };

        function changeCategories(category) {
            console.log($scope.search.category);
            if (category === $scope.search.category) {
                $scope.search.category = '';
            } else {
                $scope.search.category = category;
            };


        };

        //        $http({
        //            method: 'GET',
        //            url: 'https://weebly.zendesk.com/api/v2/help_center/articles.json',
        //            headers: {
        //                'Authorization': 'Basic david.b@weebly.com:Screwchina1'
        //            }
        //        }).then(function (response) {
        //            var status = response.status;
        //            var data = response.data;
        //            var statusText = response.statusText;
        //            var headers = response.headers;
        //            console.log('status: ' + status);
        //            console.log('data: ' + data);
        //            console.log('statusText: ' + statusText);
        //            console.log('headers: ' + headers);
        //        }, function (response) {
        //            var status = response.status;
        //            var data = response.data || "request failed";
        //            var statusText = response.statusText;
        //            var headers = response.headers;
        //            var config = response.config;
        //            console.log('status: ' + status);
        //            console.log('data: ' + data);
        //            console.log('statusText: ' + statusText);
        //            console.log('headers: ' + headers);
        //            console.log(config);
        //        });
    };
})();
