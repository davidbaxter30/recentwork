'use strict';

angular.module("suggestion.view", ['firebase', 'ngAnimate'])

//    Setting up a Controller for our App 
.controller('suggestionView', ['$scope', '$firebaseArray', '$http', '$animate', function ($scope, $firebaseArray, $http, $animate) {

    var url = "https://suggestions.firebaseio.com/";
    var fireArray = new Firebase(url);

    $scope.suggestions = $firebaseArray(fireArray);

    //    Keep an eye on some variables. 
    $scope.$watch('suggestions', function () {
        var total = 0;
        var accepted = 0;
        var declined = 0;
        $scope.suggestions.forEach(function (suggestion) {
            // Skip invalid entries so they don't break the entire app.
            if (!suggestion || !suggestion.Title) {
                return;
            }

            total++;
            if (suggestion.Accepted === true) {
                accepted++;
            } else if (suggestion.Declined === true) {
                declined++;
            }
        });

        $scope.totalCount = total;
        $scope.acceptedCount = accepted;
        $scope.declinedCount = declined;
        $scope.newCount = total - accepted - declined;
    }, true);

    //    voting on the suggestions already submitted
    $scope.upvote = function (suggestion) {
        if (this.downvoted) {
            suggestion.Votes += 2;
            $scope.suggestions.$save(suggestion);
            this.upvoted = true;
            this.downvoted = false;
        } else if (this.upvoted) {
            this.upvoted = true;
        } else {
            suggestion.Votes += 1;
            $scope.suggestions.$save(suggestion);
            this.upvoted = true;
        };
    };


    $scope.downvote = function (suggestion) {

        if (this.upvoted) {
            suggestion.Votes -= 2;
            $scope.suggestions.$save(suggestion);
            this.upvoted = false;
            this.downvoted = true;
        } else if (this.downvoted) {
            this.downvoted = true;
        } else {
            suggestion.Votes -= 1;
            $scope.suggestions.$save(suggestion);
            this.downvoted = true;
        };
    };

    $scope.showCurrent = {
        Accepted: false,
        Declined: false
    };

    $scope.chooseCurrent = function (choice) {
        if (choice === 'accepted') {
            $scope.showCurrent = {
                Accepted: true
            };
        } else if (choice === 'declined') {
            $scope.showCurrent = {
                Declined: true
            };
        } else {
            $scope.showCurrent = {
                Accepted: false,
                Declined: false
            };
        };

    };



}]);