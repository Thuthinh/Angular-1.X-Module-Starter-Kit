(function () {
    'use strict';

    var app = angular.module('app', [
        'kendo.directives',
        'ui.bootstrap',
        'angular.filter',
        'core',
        'layout',
        'home'
    ]);

    //app.run(['breeze','moment',function (breeze, moment) {
    //    breeze.DataType.parseDateFromServer = function (source) {
    //        return moment(source).toDate();
    //    };
    //}]);

    // initData().then(init);

    init();

    function init() {
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['app']);
        });
    }

    //function initData() {
    //    var initInjector = angular.injector(["ng"]);
    //    var $http = initInjector.get("$http");
    //    var $q = initInjector.get("$q");
    //    return $q.all([loadUserProfile($http)]);
    //}

    //function loadUserProfile($http) {
    //    var url = window.location.port == 57119 ? "http://localhost:57110/service" : "/breeze/service";
    //    return $http.get(url + "/login").then(function (resp) {
    //        var login = resp.data;
    //        login.Enabled = login.UserAccountControl == '1' ? true : false;
    //        login.Domain = login.Domain.toLowerCase() + '\\' + login.cn;
    //        app.value('login', login);
    //        app.constant('serviceUrl', url);
    //    });
    //}
})();