myApp.controller('AdviceController', ["$scope", "cartFactory", "adviceFactory","$cookies","advicer","$http", "favoriteFactory",

  function($scope, cartFactory, adviceFactory,$cookies,advicer,$http,favoriteFactory) {
    $scope.showJournee = false ;
    $scope.showPanier = false ;
    $scope.displayJournee = function() {
      $scope.showPanier = false ;
      $scope.showJournee = true ;
    };
    $scope.displayPanier = function() {
      $scope.showPanier = true ;
      $scope.showJournee = false ;
    };
    /*
      $scope.showRepas = false ;
      $scope.showJournee = false ;
      $scope.eqRepas = function() {
        $scope.showJournee = false ;
        $scope.showRepas = true ;
        console.log($scope.showJournee) ;
        console.log($scope.showRepas) ;
        // Reste à finir
      };
      $scope.eqJournee = function() {
        $scope.showRepas = false ;
        $scope.showJournee = true ;
        // Reste à finir
      };
    */

    // ------ Modal control ------ //
    $scope.displayModal = function(code) {
       if (document.getElementById('id_'+ code).style.display == 'block') {
          document.getElementById('id_'+ code).style.display = 'none' ;
      } else {
          document.getElementById('id_'+ code).style.display = 'block' ;
      }
    };
    // ------ END Modal control ------ //


    $scope.surname = "";
    $scope.age = "";
    $scope.gender = 0;
    $scope.profile = "healthy";
    $scope.update = function() {
        var updated_user = {profile: $scope.profile, gender: parseInt($scope.gender), age: parseInt($scope.age), surname: $scope.surname} ;
        if ($scope.age == "" || $scope.age == null || typeof(updated_user.surname) == "undefined") {
          console.log("Missing information, user profile not updated") ;
        }
        else {
          $cookies.putObject("userCookie",updated_user) ;
          $scope.displayModal('newuser')
          console.log("User profile sucessfully updated :") ;
          console.log($cookies.getObject("userCookie")) ;
        }
      };
    $scope.init = function() {
      cartFactory.init() ; // initialise le cart
      favoriteFactory.init() ;
      var isnew = adviceFactory.init() ; // isnew est un booléen cf. advicefactory.js
      if (isnew) {
        console.log("Bienvenue nouvel utilisateur de DietApp") ;
        $scope.displayModal('newuser') ; // Affiche le formulaire de profil
      }
      else {
        console.log("Bienvenue sur DietApp") ;
      }
    };
    // Profil par défaut :
    $scope.init() ;

    $scope.cart = cartFactory.get().products;
    $scope.energyRatio = Math.round((adviceFactory.evalCartEnergy() / adviceFactory.getNeededEnergy()) * 100);
    $scope.initEnergyPBar = function() {
      var energyPBar = document.getElementById('energyPBar'); //green(default) pbar
      if ($scope.energyRatio > 110 && $scope.energyRatio <= 150) { //yellow pbar
        energyPBar.innerHTML = '<div class="w3-yellow w3-center w3-container ng-binding" style="height:24px;width:100%">' + $scope.energyRatio + '%</div>';
      } else if ($scope.energyRatio > 150) { //red pbar
        energyPBar.innerHTML = '<div class="w3-red w3-center w3-container ng-binding" style="height:24px;width:100%">' + $scope.energyRatio + '%</div>';
      }
      else if ($scope.energyRatio < 90) { //blue bar
        energyPBar.innerHTML = '<div class="w3-blue w3-center w3-container ng-binding" style="height:24px;width:' + $scope.energyRatio + '%">' + $scope.energyRatio + '%</div>';
      }
      else { // green bar
        energyPBar.innerHTML = '<div class="w3-green w3-center w3-container ng-binding" style="height:24px;width:' + $scope.energyRatio + '%">' + $scope.energyRatio + '%</div>';
      }
    };
    $scope.initEnergyPBar();
    console.log("test conseil :") ;
    $scope.initAdvicers = function() {
      var favcode = advicer.calc("favCookie") ;
      var freqcode = advicer.calc("freqCookie") ;
      if (favcode == freqcode) {
          var codes = [favcode] ;
      }
      else {
          var codes = [favcode,freqcode] ;
      }
      //codes = ["3017620422003","3017620422003"] ;
      $scope.advicedproducts = [] ;
      for (var code of codes) {
        if (code != null) {
          $http.get("https://world.openfoodfacts.org/api/v0/product/" + code + ".json")
               .then(function(response) {
                 $scope.advicedproducts.push(response.data.product);
                });
        }
      }
      console.log('adviced product(s) :') ;
      console.log($scope.advicedproducts) ;
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
    $scope.add = function(aproduct) {
      cartFactory.addProduct(aproduct);
      $scope.initAdvicers();
      $scope.energyRatio = Math.round((adviceFactory.evalCartEnergy() / adviceFactory.getNeededEnergy()) * 100);
      $scope.initEnergyPBar();
      $scope.data = [
        adviceFactory.getPropotion(adviceFactory.getUserProfile()),
        adviceFactory.evalCartProportion()
      ]
    };
    $scope.initAdvicers() ;
    // ChartController
    $scope.labels = ['Protéines', 'Lipides', 'Glucides'];
    $scope.series = ['Recommandé', 'Actuellement'];
    $scope.data = [
      adviceFactory.getPropotion(adviceFactory.getUserProfile()), // Recommandé
      adviceFactory.evalCartProportion() // Actuellement

    ];
  }
])
