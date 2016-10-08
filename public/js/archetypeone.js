'use strict';

const app = angular.module('archetypeoneApp', [
  'fullPage.js',
  'ui.router'
]);

app.controller('archetypeoneController', ['$scope', '$filter', ($scope, $filter) => {
  $scope.now = new Date();

  $scope.mainOptions = {
    continuousVertical: true,
    fadingEffect: true
  };
}]);
