(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('Bugs', ['$scope', 'dataservice', '$stateParams', bugs]);

    function bugs($scope, dataservice, $stateParams) {
        var bugs = this;

        $scope.bugs = [];
        $scope.loading = true;
        $scope.constructBugs = constructBugs;

        $scope.$watch(function() { return dataservice.activeType }, function () {
            if (dataservice.activeType == 'bug' && $scope.bugs.length > 0) {
                $scope.bugs.forEach(function (element) {
                    if (element.id == $stateParams.ID) {
                        dataservice.data = element;
                    }
                })
            }
        }, true)

        $scope.constructBugs();
        //////////////////////////////


        function constructBugs() {
            var bugs = dataservice.getBugs().then(setValues);

            function setValues(bugsArray) {
                $scope.loading = false;
                bugsArray.forEach(renameBug);

                function renameBug(element, index) {
                    if (index < 1 || element.workflow === 'closed') {
                        return;
                    } else {
                        var bug = {};
                        bug.id = element.scoped_id;
                        bug.link = element.url;
                        bug.title = element.title;
                        bug.date = element.created_at;
                        bug.author = element.created_by;
                        bug.notes = element.description;
                        bug.status = element.workflow; 
                        $scope.bugs.push(bug);
                        if (dataservice.activeType == 'bug' && $stateParams.ID == bug.id) {
                            dataservice.data = bug;
                            console.log(element); 
                        }
                    }

                }


            }
        }

    };
})();