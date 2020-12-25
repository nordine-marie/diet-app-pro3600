myApp.controller('FidelityController', ["$scope","fidelityFactory",

  function($scope,fidelityFactory) {
    console.log("Fidelity ctrl") ;
    fidelityFactory.init() ;
    //fidelityFactory.addFcard("G20","9201015919382");
    //fidelityFactory.addFcard("Micromania","56660916");
    console.log(fidelityFactory.getFcards()) ;
    $scope.Fcards = fidelityFactory.getFcards() ;
    $scope.remFcard = function(code) {fidelityFactory.remFcard(code)};
    $scope.newname = "" ;
    $scope.newcode = "" ;


    $scope.addnewcard = function() {
      console.log($scope.newname) ;
      console.log($scope.newcode) ;
      if ($scope.newname == "" || $scope.newcode == "") {
        console.log("Card not added : missing information")
      }
      else {
        fidelityFactory.addFcard($scope.newname,$scope.newcode) ;
        $scope.Fcards = fidelityFactory.getFcards() ;
        $scope.displayModal('addfcard') ;
        console.log("Card sucessfully added") ;
      }

    };

    /* ------ Modal control ------ */
    $scope.displayModal = function(code) {
       if (document.getElementById('id_'+ code).style.display == 'block') {
          document.getElementById('id_'+ code).style.display = 'none' ;
      } else {
          document.getElementById('id_'+ code).style.display = 'block' ;
      }
    };
    /* ------ END Modal control ------ */
  }
]) ;
