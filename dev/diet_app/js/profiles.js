myApp.factory('profiles',

  function() {
    var factory = {
        loseweight : {proportion : [0.15,0.4,0.45],
                  // entre 18 et 40 ans
                   adult : {energyHF: [2350,1900]},
                   // plus de 40 ans
                   old : {energyHF: [2200,1750]}
                  },
        healthy : {proportion : [0.15,0.375,0.475],
                  // entre 18 et 40 ans
                   adult : {energyHF: [2650,2150]},
                   // plus de 40 ans
                   old : {energyHF: [2450,2000]}
                  },
        gainweight : {proportion : [0.2,0.3,0.5],
                  // entre 18 et 40 ans
                  adult : {energyHF: [3250,2500]},
                  // plus de 40 ans
                  old : {energyHF: [3050,2350]}
                }

    };
    return factory;
  }
)
