(function () {
    'use strict';

    angular
       .module('data',[])
       .factory('datacontext', init);

    init.$inject = ['logger'];

    function init(logger) {
        var service = {
               getDataById: getDataById
        };
        return service;

        function getDataById(id) {
            // implement the the ajax call.
        }
    }
})();
