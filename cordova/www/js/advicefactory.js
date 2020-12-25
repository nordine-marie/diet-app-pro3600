myApp.factory('adviceFactory',['$cookies',"profiles",

  function($cookies,profiles) {
    var factory = {
      init: function() {
        var cookie = $cookies.getObject("userCookie") ;
        //console.log(cookie.surname) ;
        if (typeof cookie == "undefined" ) {
          var user = {profile: "healthy", gender: 0, age: 18, surname: "IsNotInit"} ; //convention homme : 0 femme : 1
          $cookies.putObject("userCookie", user) ;
          console.log("user non initialisé") ;
          return true; //new user
        }
        else if (cookie.surname == "IsNotInit") {
          console.log("user non initialisé : IsNotInit") ;
          return true; //new user
        }
        else {
          console.log("user déja initialisé auparavant") ;
          return false ; //already known user
        }
      },
      getUser: function() {
        console.log("Hello user")
        return $cookies.getObject("userCookie") ;
      },
      getUserProfile: function() {
        var cookie = $cookies.getObject("userCookie") ;
        return cookie.profile ;
      },
      getNeededEnergy: function() {
        var user = $cookies.getObject("userCookie")
        // Tranche d'age du user :
        if (user.age >= 40){ var usertype = "old" ;}
        else { var usertype = "adult" ; }
        return profiles[user.profile][usertype].energyHF[user.gender] ; // un peu compliqué à expliquer mais ça marche, demandez moi au pire.
      },
      getPropotion: function(aprofile) {
        return profiles[aprofile].proportion ;
      },
      setUserProfile: function(aprofile) {
        var cookie = $cookies.getObject("userCookie") ;
        cookie.profile = aprofile ;
        $cookies.putObject("userCookie", user) ;
        console.log("Profile setted to " + aprofile) ;
      },
      evalCartPLG: function() {
        var cart = $cookies.getObject("cartCookie") ;
        var plg_total = [0,0,0] ;
        for (const product of cart.products) {
          plg_total[0] = plg_total[0] + product.plg_list[0]*product.quantity ;
          plg_total[1] = plg_total[1] + product.plg_list[1]*product.quantity ;
          plg_total[2] = plg_total[2] + product.plg_list[2]*product.quantity ;
          }
        return plg_total ;
      },
      evalCartProportion: function() {
        var cart = $cookies.getObject("cartCookie") ;
        var plg_total = [0,0,0] ;
        var sum= 0 ;
        if (cart.products.length==0) {
          return plg_total ;
        }
        for (const product of cart.products) {
          plg_total[0] = plg_total[0] + product.plg_list[0]*product.quantity ;
          plg_total[1] = plg_total[1] + product.plg_list[1]*product.quantity ;
          plg_total[2] = plg_total[2] + product.plg_list[2]*product.quantity ;
          if ( product.plg_list[0]!=0 || product.plg_list[1]!=0 || product.plg_list[2]!=0) {
            sum = sum + (product.plg_list[0] + product.plg_list[1] + product.plg_list[2])*product.quantity ;
          }
        }
        if (sum!=0) {
          plg_total[0] = plg_total[0]/sum ;
          plg_total[1] = plg_total[1]/sum ;
          plg_total[2] = plg_total[2]/sum ;
        }
        return plg_total ;
      },
      evalCartEnergy: function() {
        var cart = $cookies.getObject("cartCookie") ;
        var energy_total = 0 ;
        for (const product of cart.products) {
          energy_total = energy_total + product.energy*product.quantity ;
        }
        return energy_total ;
      }
    };
    return factory;
  }
])
