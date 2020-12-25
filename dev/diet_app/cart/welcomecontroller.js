myApp.controller('WelcomeController', ["$scope", "$cookies",

  function($scope,$cookies) {
    // ---- Welcome modal ---------- //
    var now = new Date() ;


    displayModal = function(code) {
      if (document.getElementById('id_' + code).style.display == 'block') {
        document.getElementById('id_' + code).style.display = 'none';
      } else {
        document.getElementById('id_' + code).style.display = 'block';
      }
    };
    welcomer = function() {
      var cookie = $cookies.getObject("welcomeCookie") ;
      var text = document.getElementById('welcome_div')
      var now = new Date() ;
      if (typeof cookie == "undefined") { //Toute première connexion (Nouvel utilisateur)
        var welcookie = {lastconnexion: now.getDay()} ;
        $cookies.putObject("welcomeCookie", welcookie) ;
        console.log("Welcome new user") ;
        text.innerHTML = "<h4 style='text-align: center;'>Bienvenue sur <strong>DietApp</strong>,<br> ton nouveau diététicien personnel !</h4>" ;
        displayModal('welcome') ; // 'welcome est l'id du modal à afficher
        setTimeout(function() {displayModal('welcome')} //callback
                  ,2500) ;// temps d'attente en ms
      }
      else if (cookie.lastconnexion != now.getDay()) { // première connexion journalière d'un ancien utilisateur
        var welcookie = {lastconnexion: now.getDay()} ;
        $cookies.putObject("welcomeCookie", welcookie) ;
        var user = $cookies.getObject("userCookie") ;
        console.log("Welcome " + $scope.surname + " !") ;
        text.innerHTML = "<h4 style='text-align: center;'>Bienvenue sur DietApp <strong>" + user.surname + "</strong>,<br> nous sommes ravis de vous retrouver parmi nous !</p>" ;
        displayModal('welcome') ;
        setTimeout(function() {displayModal('welcome')} //callback
                  ,2500) ;// temps d'attente en ms
      }
    } ;
    welcomer() ;


  }
]);
