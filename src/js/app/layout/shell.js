(function() {
    'use strict';

    angular
        .module('layout')
        .controller('Shell', init);

    init.$inject = ['config'];

    function init(config) {
        var vm = this;
        vm.appTitle = config.appTitle;
        vm.version = config.version;
    }
})();
