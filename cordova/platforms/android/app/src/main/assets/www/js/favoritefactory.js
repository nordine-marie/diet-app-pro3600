myApp.factory('favoriteFactory', ["$cookies",

  function($cookies) {
    var factory = {
      init: function() {
        var cookie = $cookies.getObject("favCookie") ;
        if (typeof cookie == "undefined") {
          var fav = {products: []} ;
          $cookies.putObject("favCookie", fav) ;
          console.log("favoris initialisé") ;
        }
        else {
          console.log("favoris déja initialisé auparavant") ;
        }
      },
      get: function() {
        return $cookies.getObject("favCookie");
      },
      addProduct: function(aproduct) {
        var favproduct = {
          product_name: aproduct.product_name,
          code: aproduct.code,
          image_front_thumb_url: aproduct.image_front_thumb_url,
          plg_list: [
                      // Protides
                      (parseFloat(aproduct.nutriments.proteins)),
                      // Lipides
                      (parseFloat(aproduct.nutriments.fat) + parseFloat(aproduct.nutriments.fat)),
                      // Glucides
                      (parseFloat(aproduct.nutriments.sugars) + parseFloat(aproduct.nutriments.carbohydrates))
                    ],
          energy : 0
        } ;

        // gestion de l'énergie sous ses differentes unités connues (kcal,kj) :
        if (typeof(aproduct.nutriments["energy-kcal"])!="undefined") { // gestion de l'absence d'attributs calories
          favproduct["energy"]=aproduct.nutriments["energy-kcal"] ;
        }
        else if (typeof(aproduct.nutriments["energy-kj"])!="undefined") {
          favproduct["energy"]=aproduct.nutriments["energy-kj"]*0.24 ;
        }
        else {
          console.log("Energy of " + favproduct.product_name + " unknown, please report this error with the bar-code : " + aproduct.code)
        }

        var fav = $cookies.getObject("favCookie") ;
        var notpresent = true ;
        for (const product of fav.products) {
          if (product.code == favproduct.code) {
            notpresent = false
            console.log("Produit déja en favoris...")
            break
          }
        }
        if (notpresent) {
          fav.products.push(favproduct);
          console.log("Produit ajouté au favoris !");
        }
        var beep = new Audio("assets/beep.mp3");
        beep.play();
        console.log(fav) ;
        $cookies.putObject("favCookie", fav);
      },
      delProduct: function(code) {
        var fav = $cookies.getObject("favCookie");
        for (const product of fav.products) {
          if (product.code == code) {
            const index = fav.products.indexOf(product);
            fav.products.splice(index, 1);
            break;
          }
        }
        $cookies.putObject("favCookie", fav);
      }
    };

    return factory;


  }
])
