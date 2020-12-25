myApp.factory('advicer',['adviceFactory','$cookies',

  function(adviceFactory,$cookies) {
    var factory = {
      calc: function(lib) { // lib = "freqCookie" or "favCookie"
        var abs = Math.abs ;
        freqproducts=$cookies.getObject(lib).products ;
        // variable : user data | variableR : user profile recommended data (R for recommended)
        var energy = adviceFactory.evalCartEnergy() ;
        var energyR = adviceFactory.getNeededEnergy() ;

        var plg = adviceFactory.evalCartPLG() ;
        var plg_ratio = [plg[0]/(plg[0]+plg[1]+plg[2]),plg[1]/(plg[0]+plg[1]+plg[2]),plg[2]/(plg[0]+plg[1]+plg[2])];
        var plg_ratioR = adviceFactory.getPropotion(adviceFactory.getUserProfile()) ;
        // définition d'une distance discriminante
        var discr = function(energy,energyR,plg,plgR) {
          return abs(plg[0]-plgR[0]) + abs(plg[1]-plgR[1]) + abs(plg[2]-plgR[2]) // Rq : la difference d'énergie est triplé car mangé trop calorique bien que équilibré est inutile.
        }
        //Recherche d'un produit à conseiller (ou pas)
        best = null ; // variable contenant le produit à conseiller
        mindiscr = discr(energy,energyR,plg_ratio,plg_ratioR) ;
        console.log("default") ;
        console.log(mindiscr) ;
        for (var product of freqproducts) {
          var sum = plg[0]+product.plg_list[0]+plg[1]+product.plg_list[1]+plg[2]+product.plg_list[2] ;
          var newplg_ratio = [(plg[0]+product.plg_list[0])/sum, (plg[1]+product.plg_list[1])/sum, (plg[2]+product.plg_list[2])/sum];
          var newenergy = energy + product.energy ;
          var newdiscr = discr(newenergy,energyR,newplg_ratio,plg_ratioR) ;
          console.log(product.product_name) ;
          console.log(newdiscr) ;
          if (newdiscr <= mindiscr) { // lorsqu'on trouve un meilleur produit à conseiller
            mindiscr = newdiscr ;
            best = product
          }
        }
        if(best == null) { return best;} // Permet de rattraper l'erreur au niveau de l'affichage HTML
        else { return best.code;} // le code suffit à identifier un produit




      },
      advicerFav: function() {

      }
    };
    return factory;
  }
])
