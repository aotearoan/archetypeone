'use strict';

const app = angular.module('archetypeoneApp', [
  'fullPage.js',
  'ui.router'
]);

const backgroundImageCount = 6;

app.controller('archetypeoneController', ['$scope', '$filter', ($scope, $filter) => {

  $scope.now = new Date();

  $scope.imageClass = 'image-' + Math.floor((Math.random() * backgroundImageCount) + 1);

  $scope.mainOptions = {
    continuousVertical: true,
    fadingEffect: true
  };
}]);
