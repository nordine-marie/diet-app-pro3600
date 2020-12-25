myApp.controller('HomeController', ["$scope", "$state",

  function($scope, $state) {

    console.log('this is the homecontroller, hi!');

    $scope.userString = "default value";

    $scope.gotopage2 = function() {
      $state.go("page2");
    }

  }
]);
