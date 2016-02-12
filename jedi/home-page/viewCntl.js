(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('View', ['$scope', 'dataservice', 'logger', '$sce', '$stateParams', view]);

    function view($scope, dataservice, logger, $sce, $stateParams) {
        $scope.article = {};
        $scope.macro = {};
        $scope.bug = {};
        $scope.getArticle = {};
//        $scope.getMacro = {};
//        $scope.getBug = getBug;
        $scope.getArticle = getArticle;

        //        if ($stateParams.ID && dataservice.activeType == 'macro') {
        //            $scope.getMacro($stateParams.ID);
        //        }
        if ($stateParams.ID && dataservice.activeType == 'help') {
            $scope.getArticle($stateParams.ID);
        } /*else if ($stateParams.ID && dataservice.activeType == 'bug') {
            $scope.getBug($stateParams.ID);
        };*/


        $scope.$watch(
            function () {
                return dataservice.data;
            },
            function () {
                if ($stateParams.ID && dataservice.activeType == 'macro' && dataservice.data != {}) {
                    $scope.macro = dataservice.data;
                } 
                else if ($stateParams.ID && dataservice.activeType == 'bug' && dataservice.data != {}) {
                    $scope.bug = dataservice.data;
                };
            },
            true
        )

        /////////////////////////////////

        function getArticle(articleID) {
            dataservice.getArticle(articleID)
                .then(function (article) {
                    article.body = article.body.replace(/\/\/hc\/en-us\//g, '//hc.weebly.com/hc/en-us/');

                    var newArticle = {};
                    newArticle.categories = article.label_names;
                    newArticle.title = article.title;
                    newArticle.url = article.html_url;
                    newArticle.id = article.id;
                    newArticle.body = $sce.trustAsHtml(article.body);

                    $scope.article = newArticle;
                });
        };

        //        function getMacro(macroID) {
        //            dataservice.getMacro(macroID)
        //            .then(function() {
        //                
        //            })
        //        }
        //        
//                function getBug(bugID) {
//                    dataservice.getBug(bugID)
//                    .then(function(element) {
//                        logger.log(element);
//                        var bug = {};
//                        bug.id = element.scoped_id;
//                        bug.link = element.project_url;
//                        bug.title = element.title;
//                        bug.date = element.created_at;
//                        bug.author = element.created_by;
//                        bug.notes = element.description;
//                        bug.status = element.workflow; 
//                        
//                        $scope.bug = bug; 
//                    })
//                }
    };

})();