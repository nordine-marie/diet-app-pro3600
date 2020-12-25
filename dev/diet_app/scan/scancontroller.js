

myApp.controller('ScanController', ["$scope", "$http", "cartFactory",

  function($scope, $http, cartFactory) {
    $scope.add = function(aproduct) {
      cartFactory.addProduct(aproduct);
    } ;
    $scope.barcode = "";
    $scope.showMe = true;
    $scope.code_to_product = function() {
      $http.get("https://world.openfoodfacts.org/api/v0/product/" + $scope.barcode + ".json")
           .then(function(response) {
             $scope.product = response.data.product;
            });
      if ($scope.product == null) {
        $scope.showMe = false;
      } else {
        setTimeout(
          function() {$scope.showMe = true;}
          ,5)
      }
    };
    $scope.code_to_product() ;
    $scope.code_to_product() ; // init
    $scope.initQuagga = function() {
      Quagga.init({
        inputStream: {
          frequency: 0.5,
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#camera') // Or '#yourElement' (optional)
        },
        decoder: {
          readers: ["ean_reader"]
        }
      }, function(err) {
        if (err) {
          console.log(err);
          var errordisplay = document.getElementById('camera') ;
          errordisplay.innerHTML = "<div style='width: 200%;text-align: center;'><span style='font-size:40px'>Oups !</span><br>DietApp ne peut accéder à la camera<br><strong>Donnez lui l'autorisation</strong> dans les paramètres système</div>"
          return
        }
        console.log("Quagga initialization finished. Ready to start");
        Quagga.start();
      });

      Quagga.onDetected(function(data) {
        console.log(data);
        $scope.barcode = data.codeResult.code ;
        beep = new Audio("assets/scan.wav") ;
        beep.play() ;
        $scope.code_to_product() ;
      });
    };
    $scope.showCam = false ;
    $scope.initQuagga();
    $scope.displayCam = function() {
      $scope.showCam = !($scope.showCam) ;
    }


  }
]);
