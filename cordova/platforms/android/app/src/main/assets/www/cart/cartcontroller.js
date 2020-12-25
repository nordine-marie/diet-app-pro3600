myApp.controller('CartController', ["$scope", "cartFactory",

  function($scope, cartFactory) {
    cartFactory.init(); // NE PAS SUPPRIMER : initilise la factory de cart
    console.log(cartFactory.get());
    $scope.cart = cartFactory.get().products ;
    $scope.src_nutri = function(tag) {
      if (tag == "a" || tag == "A") {
        return "assets/Nutri-score-A.svg";
      }
      else if (tag == "b" || tag == "B") {
        return "assets/Nutri-score-B.svg";
      }
      else if (tag == "c" || tag == "C") {
        return "assets/Nutri-score-C.svg";
      }
      else if (tag == "d" || tag == "D") {
        return "assets/Nutri-score-D.svg";
      }
      else if (tag == "e" || tag == "E") {
        return "assets/Nutri-score-E.svg";
      }
    };
    $scope.carbonFootprint = cartFactory.carbonFootprint() ;
    $scope.del = function(code) {
      cartFactory.delProduct(code);
      $scope.carbonFootprint = cartFactory.carbonFootprint() ;
      console.log("Produit supprimé");
    };
    $scope.incr = function(code) {
      cartFactory.incrProduct(code);
      $scope.carbonFootprint = cartFactory.carbonFootprint() ;
      console.log("Produit incrémenté")
      $scope.cart=cartFactory.get().products;
    };
    $scope.incr2= function(code) {
      cartFactory.incrProductMasse(code);
      console.log("Masse incrémentée")
      $scope.cart=cartFactory.get().products;
    }
    $scope.decr = function(code) {
      cartFactory.decrProduct(code);
      console.log("Produit décrémenté")
      $scope.carbonFootprint = cartFactory.carbonFootprint() ;
      $scope.cart=cartFactory.get().products;
    };
    $scope.decr2 = function(code) {
      cartFactory.decrProductMasse(code);
      console.log("Masse décrémentée")
      $scope.cart=cartFactory.get().products;
    };
  }
]);
