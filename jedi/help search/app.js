(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('Article', ['$scope', 'dataservice', '$sce', '$stateParams', article]);

    function article($scope, dataservice, $sce, $stateParams) {
        $scope.articleArray;
        $scope.loading = true;
        $scope.articleCategories = [];
        $scope.categoryName = categoryName;
        $scope.changeCategory = changeCategories;
        $scope.constructArticles = constructArticles;
        $scope.search = {};
        $scope.article = {};
        $scope.articles = [];
        $scope.constructArticles();

        
        ////////////////////////////////////////


        function constructArticles() {
            $scope.articlesArray = dataservice.getArticles()
                .then(function (articlesArray) {
                    $scope.loading = false;
                    articlesArray.forEach(setValues);
                    setCategories(articlesArray);
                });

            function setCategories(articlesArray) {
                for (var i = 0; i < articlesArray.length; i++) {
                    if (articlesArray[i].label_names == undefined) {
                        return;
                    }
                    var categories = articlesArray[i].label_names;

                    categories.forEach(function (element, index, array) {
                        if ($scope.articleCategories.indexOf(element) < 0 && !(element === undefined || element === "")) {
                            $scope.articleCategories.push(element);
                        } else
                        if ($scope.articleCategories.indexOf(element) < 0 && (element === undefined || element === "")) {
                            element = "other";
                            console.log(element);
                            $scope.articleCategories.push(element);
                        }

                    });
                };

            };
        };

        function setValues(element, index) {
            element.body = element.body.replace(/\/\/hc\/en-us\//g, '//hc.weebly.com/hc/en-us/');

            var article = {};
            article.categories = element.label_names;
            article.title = element.title;
            article.url = element.html_url;
            article.id = element.id;
            article.body = $sce.trustAsHtml(element.body);

            $scope.articles.push(article);

        };

        function categoryName(category) {
            var nameFixed = category.replace(/\_/g, ' ');
            return nameFixed;
        };


        function changeCategories(category) {
            if (category === $scope.search.category) {
                $scope.search.category = '';
            } else {
                $scope.search.category = category;
                window.scrollTo(0, 0);
            };
        };
    };
})();
