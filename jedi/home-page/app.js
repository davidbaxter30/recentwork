(function () {
    'use strict';

    angular
        .module('jedi')
        .controller('Home', ['$scope', 'logger', '$stateParams', 'dataservice', home]);

    function home($scope, logger, $stateParams, dataservice) {
        var home = this;
        home.selectItem = selectItem;
        home.back = back;
        home.search = {
            limitMacro: 8,
            limitHelp: 8,
            limitBugs: 8,
            input: ''
        };
        home.searchField;
        home.backButton;
        home.viewMore = viewMore;

        $scope.$watch(
            function () {
                return dataservice.viewActive;
            },
            function () {
                if (dataservice.viewActive) {
                    selectItem();
                } else {
                    back();
                }
            }, true)

        ///////////////////////////

        function selectItem() {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            $('.view-selection').addClass('active');
            $('.home-results').addClass('inactive');
            home.backButton = true;
            home.searchField = false;
        }


        function back() {
            home.backButton = false;
            home.searchField = true;
            $('.view-selection').removeClass('active');
            $('.home-results').removeClass('inactive');

        }

        function viewMore(type) {
            switch (type) {
            case "macro":
                home.search.limitMacro += 10;
                break;
            case "help":
                home.search.limitHelp += 10;
                break;
            case "bug":

                home.search.limitBugs += 10;
                break;
            default:
                logger.error('Case Not selected', '', 'Error');
            }
        }


    };
})();