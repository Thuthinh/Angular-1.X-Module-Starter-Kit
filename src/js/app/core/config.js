(function() {
    'use strict';

    var core = angular.module('core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[NG-Modular Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Template',
        version: '2.0'
    };

    core.value('config', config);

    core.config(configure);

    /* @ngInject */

    configure.$inject = ['$logProvider', '$stateProvider', '$urlRouterProvider', 'routehelperConfigProvider', 'exceptionHandlerProvider'];

    function configure($logProvider, $stateProvider, $urlRouterProvider, routehelperConfigProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.docTitle = config.appTitle;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
