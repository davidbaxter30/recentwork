(function () {
    'use strict';

    angular.module('jedi', ['toastr', 'ngAnimate', 'ngResource', 'ui.router'])

    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                template: '',
                controller: 'View',
                controllerAs: 'vm',
                resolve: {
                    status: ['dataservice', function (dataservice) {
                        return dataservice.viewActive = false;
                    }],
                    type: ['dataservice', function (dataservice) {
                        return dataservice.activeType = 'none';
                    }]
                }

            })
            .state('macro', {
                url: '/macro/:ID',
                template: '<div ng-if="macro.id" class="selection"><h1>{{macro.title}}</h1><p>ID: {{macro.id}}</p><p>{{macro.content}}</p></div><div ng-if="!(macro.id)" class="item-loading"><img src="../resources/ring-alt.svg"/></div><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-71989821-1", "auto");ga("send", "pageview");<\/script>',
                controller: 'View',
                controllerAs: 'vm',
                resolve: {
                    status: ['dataservice', function (dataservice) {
                        return dataservice.viewActive = true;
                    }],
                    type: ['dataservice', function (dataservice) {
                        return dataservice.activeType = 'macro';
                    }]
                }

            })
            .state('article', {
                url: '/article/:ID',
                template: '<div class="selection"><h1>{{article.title}}</h1><p>Public Article: <a href="{{article.url}}" target="_blank">{{article.url}}</a></p><p>ID: {{article.id}}</p><p ng-bind-html="article.body"></p></div><div ng-if="!(article.id)" class="item-loading"><img src="../resources/ring-alt.svg"/></div><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-71989821-1", "auto");ga("send", "pageview");<\/script>',
                controller: 'View',
                controllerAs: 'vm',
                resolve: {
                    status: ['dataservice', function (dataservice) {
                        return dataservice.viewActive = true;
                    }],
                    type: ['dataservice', function (dataservice) {
                        return dataservice.activeType = 'help';
                    }]
                }
            })
            .state('bug', {
                url: '/bug/:ID',
                template: '<div class="selection"><h1>{{bug.title}}</h1><p>ID: {{bug.id}}<br> LINK: {{bug.link}}<br> DATE CREATED: {{bug.date}}<br> STATUS: {{bug.status}}</p><span ng-if="bug.notes.length > 0">NOTES: {{bug.notes}}</span></div><div ng-if="!(bug.id)" class="item-loading"><img src="../resources/ring-alt.svg"/></div><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","//www.google-analytics.com/analytics.js","ga");ga("create", "UA-71989821-1", "auto");ga("send", "pageview");<\/script>',
                controller: 'View',
                controllerAs: 'vm',
                resolve: {
                    status: ['dataservice', function (dataservice) {
                        return dataservice.viewActive = true;
                    }],
                    type: ['dataservice', function (dataservice) {
                        return dataservice.activeType = 'bug';
                    }]
                }

            })

    }])

})();
