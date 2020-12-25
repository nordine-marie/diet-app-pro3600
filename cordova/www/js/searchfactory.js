myApp.factory('searchFactory',["$http",

  function($http) {
    var factory = {
      find_alts : function(cat) {
        var altloading = true ;
        var altproducts = [] ;

        $http.get("https://fr.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0="+ cat +"&json=true")
          .then(function(response) {
            for (var product of response.data.products) {
              var aproduct = {image_front_thumb_url: product.image_front_thumb_url,
                              nutriscore_score: product.nutriscore_score,
                              code: product.code
                            } ;
              altproducts.push(aproduct)
            }
            altproducts.sort(function(product_a,product_b) {return (product_a.nutriscore_score - product_b.nutriscore_score)}) ;

          });
      return [altproducts,false] ;
      }
    };
    return factory;
  }]
)
