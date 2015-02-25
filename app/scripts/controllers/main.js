'use strict';

/**
 * @ngdoc function
 * @name completeBoilerplateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the completeBoilerplateApp
 */
angular.module('completeBoilerplateApp')
        .controller('MainCtrl', function ($scope, LoginService) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.username = 'a@y.com';
            $scope.password = 'mysecurepass';

            $scope.login = function () {
                LoginService.authenticate({'username': $scope.username, 'password': $scope.password}).$promise.then(function (response) {
                    $scope.response = response; //success
                }, function (response) {
                    $scope.response = response; //error
                });
            };
        });
