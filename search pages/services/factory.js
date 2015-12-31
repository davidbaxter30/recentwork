(function () {
    'use strict';

    angular
        .module('jedi')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q', '$http', 'logger', 'exception'];

    function dataservice($q, $http, logger, exception) {
        var service = {
            getMacros: getMacros,
            getArticles: getArticles,
            getBugs: getBugs
        };

        return service;
        /////////////////////

        function getMacros() {
            logger.info('Loading...', '', 'Macros Search');

            return $http.get('macros.json')
                .then(getMacrosComplete)
                .catch(function (message) {
                    exception.catcher('Failed to getMacros')(message);
                });

            function getMacrosComplete(response) {
                logger.success('Done', response.data, 'Macros Search');
                var data = response.data;
                return data;
            }


        };

        function getArticles() {
            logger.info('Loading...', '', 'Article Search');

            var page1 = $http.get("https://weebly.zendesk.com/api/v2/help_center/articles.json?page=1&per_page=100"),
                page2 = $http.get("https://weebly.zendesk.com/api/v2/help_center/articles.json?page=2&per_page=100");

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

        function getBugs() {

        };
    }
})();
