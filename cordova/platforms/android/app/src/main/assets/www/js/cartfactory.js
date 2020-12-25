myApp.factory('cartFactory', ["$cookies","frequentFactory",

  function($cookies,frequentFactory) {
    var factory = {
      init: function() {
        frequentFactory.init() ;
        var cookie = $cookies.getObject("cartCookie") ;
        if (typeof cookie == "undefined") {
          var cart = {products: []} ;
          $cookies.putObject("cartCookie", cart) ;
          console.log("cart initialisé") ;
        }
        else {
          console.log("cart déja initialisé auparavant") ;
        }
      },
      get: function() {
        return $cookies.getObject("cartCookie");
      },
      addProduct: function(aoffproduct) { // un 'aoffproduct' est un produit tel que renvoyé par la db OFF, pour des raisons de taille maximale de cookie on redéfinit un produit plus léger 'aproduct'
        //console.log(aoffproduct) ;
        var cart = $cookies.getObject("cartCookie");
        var aproduct = {
          product_name: aoffproduct.product_name,
          generic_name: aoffproduct.generic_name,
          categories: aoffproduct.categories,
          nutriscore_score: aoffproduct.nutriscore_score,
          nutriscore_tag: aoffproduct.nutrition_grades,
          code: aoffproduct.code,
          masse: 100,
          co2 : aoffproduct.nutriments["carbon-footprint-from-known-ingredients_100g"], //gCO2/100g
          brands : aoffproduct.brands_tags,
          origins : aoffproduct.origins_tags,
          image_front_thumb_url: aoffproduct.image_front_thumb_url,
          quantity: 1,
          plg_list: [
                      // Protides
                      (parseFloat(aoffproduct.nutriments.proteins)),
                      // Lipides
                      (parseFloat(aoffproduct.nutriments.fat) + parseFloat(aoffproduct.nutriments.fat)),
                      // Glucides
                      (parseFloat(aoffproduct.nutriments.sugars) + parseFloat(aoffproduct.nutriments.carbohydrates))
                    ],
          energy: 0 // en kCal
        };

/*
        // gestion de la nullité des PLG
        if (parseFloat(aoffproduct.nutriments.proteins) + parseFloat(aoffproduct.nutriments.fat) + parseFloat(aoffproduct.nutriments.fat) + parseFloat(aoffproduct.nutriments.sugars) + parseFloat(aoffproduct.nutriments.carbohydrates) == 0) {
          aproduct.plg_list = [0,0,0]
        }
*/
        // gestion de l'énergie sous ses differentes unités connues (kcal,kj) :
        if (typeof(aoffproduct.nutriments["energy-kcal"])!="undefined") { // gestion de l'absence d'attributs calories
          aproduct["energy"]=aoffproduct.nutriments["energy-kcal"] ;
        }
        else if (typeof(aoffproduct.nutriments["energy-kj"])!="undefined") {
          aproduct["energy"]=aoffproduct.nutriments["energy-kj"]*0.24 ;
        }
        else {
          console.log("Energy of " + aproduct.product_name + " unknown, please report this error with the bar-code : " + aproduct.code)
        }
        frequentFactory.add(aproduct) ;
        var notpresent = true ;
        for (const product of cart.products) {
          if (product.code == aproduct.code) {
            product.quantity = product.quantity + 1;
            notpresent = false;
          }
        }
        if (notpresent) {cart.products.push(aproduct);}

        $cookies.putObject("cartCookie", cart);
        console.log($cookies.getObject("cartCookie"));
        var beep = new Audio("assets/beep.mp3");
        beep.play();
      },
      delProduct: function(code) {

        var cart = $cookies.getObject("cartCookie");
        for (const product of cart.products) {
          if (product.code == code) {
            const index = cart.products.indexOf(product);
            cart.products.splice(index, 1);
            break;
          }
        }
        $cookies.putObject("cartCookie", cart);
      },
      clearProduct: function() {
        var cart = {products: []}
        $cookies.putObject("cartCookie", cart)
      },
      incrProduct: function(code) {
        var cart = $cookies.getObject("cartCookie");
        for (const product of cart.products) {
          if (product.code == code) {
            product.quantity = product.quantity + 1;
            break;
          }
        }
        $cookies.putObject("cartCookie", cart);
        console.log($cookies.getObject("cartCookie"));
      },
      incrProductMasse: function(code) {
        var cart = $cookies.getObject("cartCookie");
        for (const product of cart.products) {
          if (product.code == code) {
            product.masse = product.masse + 100;
            break;
          }
        }
        $cookies.putObject("cartCookie", cart);
        console.log($cookies.getObject("cartCookie"));
      },
      decrProduct: function(code) {
        var cart = $cookies.getObject("cartCookie");
        for (const product of cart.products) {
          if (product.code == code) {
            product.quantity = product.quantity - 1;
            if (product.quantity == 0) {
              const index = cart.products.indexOf(product);
              cart.products.splice(index, 1);
            }
            break;
          }
        }
        $cookies.putObject("cartCookie", cart);
      },
      decrProductMasse: function(code) {
        var cart = $cookies.getObject("cartCookie");
        for (const product of cart.products) {
          if (product.code == code) {
            product.masse = product.masse - 100;
            if (product.masse == 0) {
              const index = cart.products.indexOf(product);
              cart.products.splice(index, 1);
            }
            break;
          }
        }
        $cookies.putObject("cartCookie", cart);
      },
      carbonFootprint: function() {
        var cart = $cookies.getObject("cartCookie");
        var sum = 0 ;
        for (const product of cart.products) {
          if (typeof(product.co2)=="string") {
            sum = sum + parseFloat(product.co2)*product.quantity ;
          }
        }
        return Math.round(sum) ;
      }

    };
    return factory;


  }
])
