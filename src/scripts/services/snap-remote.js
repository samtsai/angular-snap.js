angular.module('snap')
  .factory('snapRemote', ['$q', function($q) {
    'use strict';

    // Provide direct access to the snapper object and a few convenience methods
    // for our directives.

    var deferred = $q.defer()
      , exports;
  
    exports = {
      // Returns null until our `snap-content` initializes
      get: function() {
        return deferred.promise;
      },

      // Eventually we may want to allow for multiple snap instances
      register: function(snapper) {
        deferred.resolve(snapper);
      },

      toggle: function(side) {
        exports.get().then(function(snapper) {
          if(side === snapper.state().state) {
            exports.close(side);
          } else {
            exports.open(side);
          }
        });
      },

      open: function(side) {
        exports.get().then(function(snapper) {
          snapper.open(side);
        });
      },

      close: function() {
        exports.get().then(function(snapper) {
          snapper.close();
        });
      }
    };

    return exports;
  }]);