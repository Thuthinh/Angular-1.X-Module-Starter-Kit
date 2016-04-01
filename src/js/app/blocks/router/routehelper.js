(function () {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$state', 'logger', 'routehelperConfig', 'NProgress'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    }

    function routehelper($location, $rootScope, $state, logger, routehelperConfig, NProgress) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        var $stateProvider = routehelperConfig.config.$stateProvider;
        var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        init();

        return service;

        function configureRoutes(router) {
            router.forEach(function (route) {
                $stateProvider.state(route.state, route.config);
                routes.push(route.config);
            });
            $urlRouterProvider.otherwise('/');
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$stateChangeError',
                function (event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            updateDocTitle();
            handleSubState();
        }

        function getRoutes() {
            return routes;
        }

        function handleSubState() {
            $rootScope.$on('$stateChangeStart', function (evt, to, params) {
                NProgress.start();
                if (to.redirectTo) {
                    evt.preventDefault();
                    $state.go(to.redirectTo, params)
                };
            });
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function (ev, to, toParams, from, fromParams) {
                    NProgress.done();
                    $rootScope.prevState = from;
                    routeCounts.changes++;
                    handlingRouteChangeError = false;
                    var title = routehelperConfig.config.docTitle + ' ' + (to.title || '');
                    $rootScope.title = title;
                    $rootScope.$broadcast('hidden', to.name == 'home' ? true : false);
                }
            );
        }
    };
})();