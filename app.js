'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngSanitize'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', { templateUrl: 'template.html', controller: 'HomeCtrl' });
}])
.factory('Meats', function() {
  return new AlgoliaSearch('3DR22XEJ2D', '5f11b8c360f86a45edfaa4122a46684c').initIndex('meat_products_licious');
})
.controller('HomeCtrl', function ($scope, Meats) {
    $scope.hits = [];
    $scope.query = '';
    $scope.initRun = true;
    $scope.search = function() {
      Meats.search($scope.query, function(success, content) {
        if (!success || $scope.query != content.query) {
          return;
        }
        $scope.hits = content.hits;
        if ($scope.initRun){
          $scope.$apply();
          $scope.initRun = false;
        }
      });
    };
    $scope.search();
});
