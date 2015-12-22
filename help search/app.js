(function () {
    'use strict';

    angular
        .module('jedi', ['ngSanitize'])
        .controller('Article', ['$http', '$scope', '$q', '$sce', article]);

    function article($http, $scope, $q, $sce) {
        $scope.articleCount = 0;
        $scope.articleArray = [];
        $scope.articles = [];
        $scope.articleCategories = [];
        $scope.categoryName = categoryName;
        $scope.changeCategory = changeCategories;
        $scope.search = {};
        //        $scope.displayBody = function(body) {$sce.trustAsHtml(body);return}

        var page1 = $http.get("https://weebly.zendesk.com/api/v2/help_center/articles.json?page=1&per_page=100"),
            page2 = $http.get("https://weebly.zendesk.com/api/v2/help_center/articles.json?page=2&per_page=100");

        $q.all([page1, page2]).then(function (response) {
                var status = response[1].status;
                response[0].data.articles.push.apply(response[0].data.articles, response[1].data.articles);
                var data = response[0].data.articles;
                var articleCount = data.length;
                $scope.articlesArray = data;
                $scope.articlesArray.forEach(function (element) {
                    element.body = element.body.replace(/hc\/en-us\//g, 'hc.weebly.com/hc/en-us/');
                })
                $scope.constructArticles();
            },
            function (response) {
                var status = response.status;
                var articleArray = response.data || "request failed";
                console.log('status: ' + status);
                console.log(articleArray);
            });

        $scope.constructArticles = function () {
            $scope.articlesArray.forEach(setValues);
            setCategories();

            function setValues(element, index) {
                var article = {};
                article.categories = element.label_names;
                article.title = element.title;
                article.url = element.html_url;
                article.id = element.id;
                article.body = element.body;

                $scope.articles.push(article);

            };

            function setCategories() {
                for (var i = 0; i < $scope.articlesArray.length; i++) {
                    if ($scope.articlesArray[i].label_names == undefined) {
                        return;
                    }
                    var categories = $scope.articlesArray[i].label_names;

                    categories.forEach(function (element, index, array) {
                        if ($scope.articleCategories.indexOf(element) < 0 && !(element === undefined || element === "")) {
                            $scope.articleCategories.push(element);
                        } else
                        if ($scope.articleCategories.indexOf(element) < 0 && (element === undefined || element === "")) {
                            element = "other";
                            $scope.articleCategories.push(element);
                        }

                    });
                };

            };
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
