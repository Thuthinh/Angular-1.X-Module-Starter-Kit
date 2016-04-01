(function () {
    'use strict';

    var app = angular.module('app', [
        'core',
        'layout',
        'home'
    ]);

    init();

    function init() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    }
}());
