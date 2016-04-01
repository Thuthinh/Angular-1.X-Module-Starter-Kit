(function () {
    'use strict';

    angular
        .module('data')
        .factory('entityManagerFactory', init);

    init.$inject = ['breeze','breeze.metadata','serviceUrl'];

    function init(breeze, breezeMetadata, serviceUrl) {
        var provider = {
            newManager: newManager,
            EntityQuery: breeze.EntityQuery,
            Predicate: breeze.Predicate,
            serviceName: serviceUrl
        };
        return provider;

        function newManager() {
            var metadataStore = new breeze.MetadataStore();
            metadataStore.addDataService(
                new breeze.DataService({
                    serviceName: serviceUrl,
                    hasServerMetadata: false
                })
            );
            metadataStore.importMetadata(breezeMetadata);

            var mgr = new breeze.EntityManager({
                serviceName: serviceUrl,
                metadataStore: metadataStore
            });
            return mgr;
        };
    }
})();