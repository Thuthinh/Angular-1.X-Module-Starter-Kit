(function() {
    'use strict';

    angular
        .module('blocks.exception')
        .factory('exception', init);

    init.$inject = ['logger'];

    function init(logger) {
        var service = {
            catcher: catcher
        };
        return service;

        function catcher(message) {
            return function(reason) {
                logger.error(message, reason);
            };
        }
    }
})();