myApp.factory('frequentFactory', ["$cookies",

  function($cookies) {
    var factory = {
      test: function() {console.log("Frequent test");},
      init: function() {
        var cookie = $cookies.getObject("freqCookie");
        var now = new Date() ;
        if (typeof cookie == "undefined") {
          var freq = {
            month: now.getMonth(),
            total: 0, // total est le nombre total de produit acheté ce mois,le definir permet de diminuer la complexité le calcul de freqence en O(1)
            products: [] // un produit sera de la forme {product_name,code,nb,plg_list}
          };
          $cookies.putObject("freqCookie", freq);
          console.log("fréquence des produits achetés initialisé");
        }
        else if (now.getMonth() != cookie.month) { //chaque nouveau mois
          // supression des produits peu achetés du cookie des fréquences en plusieurs étapes:
          // Calcul des fréquences d'achat des produits :
          var nbArr = [] ;
          for (var product of cookie.products) {
            nbArr.push(product.nb) ;
          }
          var freqArr = nbArr.map(x => x/cookie.total) ; // calcul des fréquences en divisant par le nb de produit total
          const seuil = 0.1 // compris entre 0 et 1
          for (var i = 0; i < cookie.total; i++) {
            if (freqArr[i] < seuil) {
              cookie.products[i].nb = -1 // marque les produits peu achetés
            }
          }
          new_products = [] ;
          for (var product of cookie.products) {
            if (product.nb > 0) { // ie. si il a pas été marqué
              new_product = { product_name : product.product_name,
                              code : product.code,
                              nb : 0, // on remet les compteurs à 0 pour ce nouveau mois
                              plg_list : product.plg_list,
                              energy : product.energy
                            } ;
              new_products.push(new_product) ; // on garde ainsi seulement les produits non marqués
            }
          }
          cookie.products = new_products ;
          cookie.total = 0 ;
          $cookies.putObject("freqCookie", cookie);
          console.log("fréquence des produits achetés màj")
        }
        else {
          console.log("fréquence des produits achetés déja initialisé auparavant");
        }
        console.log($cookies.getObject("freqCookie")) ;
      },
      get: function() {
        return $cookies.getObject("freqCookie");
      },
      add: function(aproduct) {
        var freq = $cookies.getObject("freqCookie") ;
        var notpresent = true ;
        for (const product of freq.products) {
          if (product.code == aproduct.code) {
            freq.total = freq.total + 1 ;
            product.nb = product.nb + 1 ;
            notpresent = false ;
          }
        }
        if (notpresent) {
          freq.products.push({product_name: aproduct.product_name, code: aproduct.code, nb:1, plg_list: aproduct.plg_list,energy: aproduct.energy})
          freq.total = freq.total + 1 ;
        }
        console.log(freq) ;
        $cookies.putObject("freqCookie", freq) ;
      }
    };
    return factory;
  }
])
