myApp.controller('SearchController', ["$scope", "$http", "cartFactory","searchFactory","favoriteFactory",

  function($scope, $http, cartFactory, searchFactory,favoriteFactory) {
    favoriteFactory.init();
    $scope.addtofav = function(product) {favoriteFactory.addProduct(product) ;} ;
    $scope.gotoTop = function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };
    $scope.showMe = false;
    $scope.showLoading = false;
    $scope.search = function() {
      $scope.showMe = false;
      $scope.showLoading = true;
      $http.get("https://fr.openfoodfacts.org/cgi/search.pl?search_terms=" + $scope.query + "&search_simple=1&action=process&json=1")
        .then(function(response) {
          $scope.products = response.data.products;
        });

      if ($scope.products == null) {
        $scope.showMe = false;
        $scope.showLoading = false;
      } else {
        setTimeout(
          function() {
            $scope.showLoading = false;
            $scope.showMe = true;
          }, 5)

      }
    };
    $scope.query = "";
    $scope.search(); // correction empirique de bug : necessité d'initialiser la recherche pour éviter un bug d'affichage
    console.log('this is the searchcontroller, hi!');
    $scope.add = function(aproduct) {
      cartFactory.addProduct(aproduct);
      console.log("Product added");
    };
    $scope.src_nutri = function(tag) {
      if (tag == "a" || tag == "A") {
        return "assets/Nutri-score-A.svg";
      } else if (tag == "b" || tag == "B") {
        return "assets/Nutri-score-B.svg";
      } else if (tag == "c" || tag == "C") {
        return "assets/Nutri-score-C.svg";
      } else if (tag == "d" || tag == "D") {
        return "assets/Nutri-score-D.svg";
      } else if (tag == "e" || tag == "E") {
        return "assets/Nutri-score-E.svg";
      }
    };
    $scope.altloading = true ;
    $scope.find_alts = function(cat) {
        $scope.altloading = true ;
        [$scope.altproducts,$scope.altloading] = searchFactory.find_alts(cat) ;
    } ;
    /* ------ Modal control ------ */
    $scope.displayModal = function(code) {
      if (document.getElementById('id_' + code).style.display == 'block') {
        document.getElementById('id_' + code).style.display = 'none';
      } else {
        document.getElementById('id_' + code).style.display = 'block';
      }
    };
    /* ------ END Modal control ------ */
    $scope.alt = function(name){
    $http.get("https://fr.openfoodfacts.org/cgi/search.pl?search_terms="+name+"&search_simple=1&action=process&json=1")
         .then(function(response) {
           $scope.altproducts = response.data.products ;
          }  );
        };
    $scope.displayProduct = function(product) {
      $scope.altproducts = [] ;
      $scope.find_alts(product.compared_to_category) ;
      $scope.displayModal(product.code) ;
    };
    $scope.displayAlt = function(altcode) {
      $http.get("https://world.openfoodfacts.org/api/v0/product/" + altcode + ".json")
           .then(function(response) {
             $scope.altproduct = response.data.product;
            });
      setTimeout(function() {$scope.displayModal('alt' + altcode) ;},250);
    }

  }


]);
