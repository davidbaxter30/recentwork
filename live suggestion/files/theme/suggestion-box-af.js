(function () {
    //    Module suggestionApp
    var app = angular.module("SuggestionApp", ['firebase', 'ngAnimate']);

    //    Setting up a Controller for our App 
    app.controller('suggestionController', ['$scope', '$firebaseArray', '$http', '$animate', function ($scope, $firebaseArray, $http, $animate) {
        //        var url = "https://suggestions.firebaseio.com/";
        //        var fireArray = new Firebase(url);
        //
        //        $scope.suggestions = $firebaseArray(fireArray);


        //        $scope.$watch('suggestions', function () {
        //            var total = 0;
        //            var accepted = 0;
        //            var declined = 0;
        //            $scope.suggestions.forEach(function (suggestion) {
        //                // Skip invalid entries so they don't break the entire app.
        //                if (!suggestion || !suggestion.Title) {
        //                    return;
        //                }
        //
        //                total++;
        //                if (suggestion.Accepted === true) {
        //                    accepted++;
        //                } else if (suggestion.Declined === true) {
        //                    declined++;
        //                }
        //            });
        //
        //            $scope.totalCount = total;
        //            $scope.acceptedCount = accepted;
        //            $scope.declinedCount = declined;
        //            $scope.newCount = total - accepted - declined;
        //        }, true);

        //        $scope.addSuggestion = function (suggestion) {
        //            if (!suggestion.Title.length) {
        //                return;
        //            }
        //            $scope.suggestions.$add({
        //                Title: suggestion.Title,
        //                Type: suggestion.Type,
        //                Body: suggestion.Body,
        //                Cat: suggestion.Cat,
        //                Email: suggestion.Email,
        //                Votes: 0,
        //                Accepted: false,
        //                Declined: false,
        //                mailBody: "",
        //
        //            });
        //            this.suggestion = {};
        //            $scope.suggestionForm.$setUntouched();
        //            $scope.suggestionForm.$setPristine();
        //            swal("BOOYAKASHA!", "Suggestion Submitted", "success");
        //        };
        //
        //        $scope.removeSuggestion = function (suggestion) {
        //            $scope.suggestions.$remove(suggestion);
        //        };

        //        $scope.upvote = function (suggestion) {
        //            if (this.downvoted) {
        //                suggestion.Votes += 2;
        //                $scope.suggestions.$save(suggestion);
        //                this.upvoted = true;
        //                this.downvoted = false;
        //            } else if (this.upvoted) {
        //                this.upvoted = true;
        //            } else {
        //                suggestion.Votes += 1;
        //                $scope.suggestions.$save(suggestion);
        //                this.upvoted = true;
        //            };
        //        };

        //        $scope.downvote = function (suggestion) {
        //
        //            if (this.upvoted) {
        //                suggestion.Votes -= 2;
        //                $scope.suggestions.$save(suggestion);
        //                this.upvoted = false;
        //                this.downvoted = true;
        //            } else if (this.downvoted) {
        //                this.downvoted = true;
        //            } else {
        //                suggestion.Votes -= 1;
        //                $scope.suggestions.$save(suggestion);
        //                this.downvoted = true;
        //            };
        //        };

        //        $scope.decide = function (decision, suggestion) {
        //            if (decision) {
        //                suggestion.Accepted = true;
        //                suggestion.Declined = false;
        //                $scope.suggestions.$save(suggestion);
        //                swal("Yeah!", "Suggestion Accepted", "success");
        //            } else {
        //                $scope.sendMail(suggestion);
        //            }
        //        };

        //        Mail script for the decline function

        //        $scope.sendMail = function (suggestion) {
        //            swal({
        //                title: "Feedback",
        //                text: "Why was this declined?",
        //                type: "input",
        //                showCancelButton: true,
        //                closeOnConfirm: true,
        //                animation: "slide-from-top",
        //                inputPlaceholder: "Write something"
        //            }, function (inputValue) {
        //                if (inputValue === false) {
        //                    return false
        //                };
        //                if (inputValue === "") {
        //                    swal.showInputError("You need to write something!");
        //                    return false
        //                }
        //
        //                suggestion.mailBody = inputValue;
        //                console.log(suggestion.Email);
        //                console.log(suggestion.mailBody);
        //                var mailJSON = {
        //                    "key": "MxJpewxzJK1K8tdPs7jMRA",
        //                    "message": {
        //                        "html": "" + suggestion.mailBody,
        //                        "text": "Your suggestion has been declined for the time being. Sorry about that! Don't be discouraged! Here is some feedback: " + suggestion.mailBody,
        //                        "subject": "" + suggestion.Title,
        //                        "from_email": "no-reply@weebly.com",
        //                        "from_name": "Customer Success Advocate.. Advocate",
        //                        "to": [
        //                            {
        //                                "email": "" + suggestion.Email,
        //                                "name": "Awesome Person",
        //                                "type": "to"
        //            }
        //          ],
        //                        "important": false,
        //                        "track_opens": null,
        //                        "track_clicks": null,
        //                        "auto_text": null,
        //                        "auto_html": null,
        //                        "inline_css": null,
        //                        "url_strip_qs": null,
        //                        "preserve_recipients": null,
        //                        "view_content_link": null,
        //                        "tracking_domain": null,
        //                        "signing_domain": null,
        //                        "return_path_domain": null
        //                    },
        //                    "async": false,
        //                    "ip_pool": "Main Pool"
        //                };
        //                var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";
        //                $http.post(apiURL, mailJSON).
        //                success(function (data, status, headers, config) {
        //                    swal("Good job!", "Email send to Author", "success");
        //                    return true;
        //                }).error(function (data, status, headers, config) {
        //                    swal("Oh noo! Error", 'status: ' + status, "error");
        //                    console.log('error sending email.');
        //                    console.log('status: ' + status);
        //                    return false;
        //                });
        //                $scope.saveDecision(inputValue, suggestion);
        //            });
        //
        //        };
        //
        //        $scope.saveDecision = function (inputValue, suggestion) {
        //            suggestion.mailBody = inputValue;
        //            console.log(suggestion.mailBody);
        //            suggestion.Accepted = false;
        //            suggestion.Declined = true;
        //            $scope.suggestions.$save(suggestion);
        //
        //        };


        //        $scope.showCurrent = {
        //            Accepted: false,
        //            Declined: false
        //        };
        //
        //        $scope.chooseCurrent = function (choice) {
        //            if (choice === 'accepted') {
        //                $scope.showCurrent = {
        //                    Accepted: true
        //                };
        //            } else if (choice === 'declined') {
        //                $scope.showCurrent = {
        //                    Declined: true
        //                };
        //            } else {
        //                $scope.showCurrent = {
        //                    Accepted: false,
        //                    Declined: false
        //                };
        //            };
        //
        //        };

        //        $scope.resetAll = function () {
        //
        //            $scope.suggestions.forEach(function (suggestion) {
        //                suggestion.Accepted = false;
        //                suggestion.Declined = false;
        //                suggestion.mailBody = "";
        //                $scope.suggestions.$save(suggestion);
        //            });
        //        };

    }]);
})();