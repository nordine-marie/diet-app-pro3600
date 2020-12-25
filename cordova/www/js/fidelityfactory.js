myApp.factory('fidelityFactory', ["$cookies",

  function($cookies) {
    var factory = {
      init: function() {
        var cookie = $cookies.getObject("fcardsCookie") ;
        if (typeof cookie == "undefined") {
          var cards = [] ;
          $cookies.putObject("fcardsCookie", cards) ;
          console.log("Fcards initialisé") ;
        }
        else {
          console.log("Fcards déja initialisé auparavant") ;
        }
      },
      getFcards: function() {
        var cards = $cookies.getObject("fcardsCookie") ;
        return cards ;
      },
      addFcard: function(name,code) {
        var cards = $cookies.getObject("fcardsCookie") ;
          if (code.length == 8) {
            var card = {name: name,
                        code: code,
                        type: "EAN8",
                        imgsrc : "https://barcode.tec-it.com/barcode.ashx?data=" + code + "&code=EAN8&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&codepage=&qunit=Mm&quiet=0"
                      }
          }
          else if (code.length == 13) {
            var card = {name: name,
                        code: code,
                        type: "EAN13",
                        imgsrc : "https://barcode.tec-it.com/barcode.ashx?data=" + code + "&code=EAN13&multiplebarcodes=false&translate-esc=false&unit=Fit&dpi=96&imagetype=Gif&rotation=0&color=%23000000&bgcolor=%23ffffff&codepage=&qunit=Mm&quiet=0"
                      }
          }
          else {
            console.log("Barcode note recognized, must be EAN8 or EAN13"  ) ;
          }
          cards.push(card) ;
          $cookies.putObject("fcardsCookie",cards) ;
        },
        remFcard: function(code) {
          var cards = $cookies.getObject("fcardsCookie") ;
          for (var card of cards) {
            if (card.code == code) {cards.splice(cards.indexOf(card), 1)};
          }
          $cookies.putObject("fcardsCookie",cards) ;
        }
      }

    return factory;


  }
])
