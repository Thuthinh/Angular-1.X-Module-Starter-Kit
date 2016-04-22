(function () {
    'use strict';

    angular
        .module('home',[])
        .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    };

    function getRoutes() {
        return [
            {
                state: 'home',
                config: {
                    url: '/',
                    templateUrl: 'template/home.html',
                    controller: 'home',
                    controllerAs: 'vm',
                    title: 'Home'
                }
            }
        ];
    };
})();
