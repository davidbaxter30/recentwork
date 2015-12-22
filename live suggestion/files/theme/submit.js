'use strict';

angular.module("suggestion.submit", ['firebase'])

//    Setting up a Controller for our App 
.controller('suggestionSubmit', ['$scope', '$firebaseArray', '$http', function ($scope, $firebaseArray, $http) {

    var url = "https://suggestions.firebaseio.com/";
    var fireArray = new Firebase(url);

    $scope.suggestions = $firebaseArray(fireArray);

    //    Pushing new suggestions to the database 

    $scope.addSuggestion = function (suggestion) {
        if (!suggestion.Title.length) {
            return;
        }

        //        setting up the json structure for submissions and $add-ing it 
        $scope.suggestions.$add({
            Title: suggestion.Title,
            Type: suggestion.Type,
            Body: suggestion.Body,
            Cat: suggestion.Cat,
            Email: suggestion.Email,
            Votes: 0,
            Accepted: false,
            Declined: false,
            mailBody: ""
        });

        //        clearing form and reseting ng-classes
        this.suggestion = {};
        $scope.suggestionForm.$setUntouched();
        $scope.suggestionForm.$setPristine();

        //        notification that submission was submitted 
        swal("BOOYAKASHA!", "Suggestion Submitted", "success");
    };
}]);