'use strict';

export const archetypeoneApp = angular.module('archetypeoneApp', []).controller('archetypeoneController', ($filter, $scope) => {
  $scope.now = new Date();
});
