(function () {
    'use strict';

    angular
        .module('jedi')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', '$http', 'logger', 'exception', '$resource'];

    function dataservice($q, $http, logger, exception, $resource) {
        var service = {
            getMacros: getMacros,
            //            getMacro: getMacro,
            getArticles: getArticles,
            getArticle: getArticle,
            getBugs: getBugs,
            getBug: getBug,
            activeType: 'none',
            viewActive: false,
            //temp fix
            data: {}
        };

        return service;
        /////////////////////

        function getMacros() {
            return $http.get("https://wbzendesk-api.herokuapp.com/api/macros")
                .then(getMacrosComplete)
                .catch(function (message) {
                    exception.catcher('Failed to getMacros')(message);
                });

            function getMacrosComplete(response) {
                logger.success('Done', '', 'Macros Search');
                var data = response.data;
                return data;
            }
        };

        function getArticles() {


            var page1 = $http.get("https://weebly.zendesk.com/api/v2/help_center/articles.json?page=1&per_page=100"),
                page2 = $http.get("https://weebly.zendesk.com/api/v2/help_center/articles.json?page=2&per_page=100")


            return $q.all([page1, page2])
                .then(getArticlesComplete)
                .catch(function (message) {
                    exception.catcher('Failed to getArticles')(message);
                });

            function getArticlesComplete(response) {
                logger.success('Done', '', 'Article Search');
                var status = response[1].status;
                response[0].data.articles.push.apply(response[0].data.articles, response[1].data.articles);
                var articlesArray = response[0].data.articles;
                return articlesArray;
            }


        };

        function getArticle(articleID) {
            service.viewActive = true;
            logger.info('Retrieving Article', '', '');

            return $http.get("https://weebly.zendesk.com/api/v2/help_center/articles/" + articleID + ".json")
                .then(getArticleComplete)
                .catch(function (message) {
                    exception.catcher('Failed to get Article ' + articleID)(message);
                });

            function getArticleComplete(response) {
                return response.data.article;
            }

        };

        function getBugs() {

            return $http.get('https://wbzendesk-api.herokuapp.com/api/bugs/all')
                .then(getBugsComplete)
                .catch(function (message) {
                    exception.catcher('Failed to getBugs')(message);
                });

            function getBugsComplete(response) {
                logger.success('Done', '', 'Bugs Search');
                var data = response.data;
                return data;

            }
        };

        function getBug(bugID) {
            service.viewActive = true;
            logger.info('Retrieving Bug', '', '');
            
            return $http({
                    method: 'POST',
                    url: 'https://wbzendesk-api.herokuapp.com/api/bug',
                    data: {
                        bugId: bugID
                    }
                })
                .then(getBugsComplete)
                .catch(function (message) {
                    exception.catcher('Failed to getBug')(message);
                });

            function getBugsComplete(response) {
                var data = response.data;
                return data;

            }
        }
    }
})();