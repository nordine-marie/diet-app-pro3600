myApp.controller('SettingsController', ["$scope","$cookies","favoriteFactory",

  function($scope,$cookies,favoriteFactory) {
    console.log("Hello user :") ;
    var user = $cookies.getObject("userCookie") ;
    console.log(user) ;
    $scope.surname = user.surname ;
    $scope.age = user.age ;
    $scope.gender = user.gender ;
    $scope.profile = user.profile ;
    $scope.update = function() {
      var updated_user = {profile: $scope.profile, gender: parseInt($scope.gender), age: parseInt($scope.age), surname: $scope.surname} ;
      if ($scope.age == null || typeof(updated_user.surname) == "undefined") {
        console.log("Misssing information, user profile not updated") ;
      }
      else {
        $cookies.putObject("userCookie",updated_user) ;
        console.log("User profile sucessfully updated :") ;
        console.log($cookies.getObject("userCookie")) ;
      }
    };
    console.log(favoriteFactory.get().products) ;
    $scope.favinit = function() {
      $scope.favproducts = favoriteFactory.get().products ;
      if ($scope.favproducts.length == 0){
        var notfav = document.getElementById('notfavyet') ;
        notfav.innerHTML = "Tu n'as pas encore de favoris !"
      }
    };
    $scope.favinit() ;
    $scope.delfav = function(code) {favoriteFactory.delProduct(code);} ;

  }
]) ;
