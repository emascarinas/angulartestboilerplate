'use strict';

/**
 * @ngdoc service
 * @name completeBoilerplateApp.LoginService
 * @description
 * # LoginService
 * Factory in the completeBoilerplateApp.
 */
angular.module('completeBoilerplateApp')
        .factory('LoginService', function ($resource) {
            return $resource('https://www.someapi.com/api', {}, {
                authenticate: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'}
                }
            });
        });
