(function () {
    'use strict';

    angular
       .module('data')
       .factory('datacontext', init);

    init.$inject = ['entityManagerFactory', 'logger', '$q'];

    function init(emf, logger, $q) {
        var manager = emf.newManager(),
           EntityQuery = emf.EntityQuery,
           Predicate = emf.Predicate,
           service = {
               manager: manager,
               deleteRow: deleteRow,
               getById: getById,
               getWellboreById: getWellboreById,
               getWellCriteria: getWellCriteria,
               getCasingOD: getCasingOD,
               getIntakePK: getIntakePK,
               getTubingOD: getTubingOD,
               getMotorPK: getMotorPK,
               getSensorPK: getSensorPK,
               getProtectorPK: getProtectorPK,
               getInstallById: getInstallById,
               getApplicationUserById: getApplicationUserById,
               getDesignByInstallId: getDesignByInstallId,
               getTubingByInstallId: getTubingByInstallId,
               getIntakeByInstallId: getIntakeByInstallId,
               getSensorByInstallId: getSensorByInstallId,
               getSurfaceByInstallId: getSurfaceByInstallId,
               getFailureByInstallId: getFailureByInstallId,
               getAttachmentTypePK: getAttachmentTypePK,
               getFailPK: getFailPK,
               getFailHardware: getFailHardware,
               getPumpById: getPumpById,
               getAttachmentById: getAttachmentById,
               getMotorById: getMotorById,
               getIntakeById: getIntakeById,
               getCableById: getCableById,
               getProtectorById: getProtectorById,
               getPumpConstruction: getPumpConstruction,
               getPumpModel: getPumpModel,
               sort_unique: sort_unique,
               getGrade: getGrade,
               saveChanges: saveChanges,
               rejectChanges: rejectChanges,
               hasChanges: hasChanges
           };
        return service;

        function sort_unique(arr) {
            var ret = [];
            for (var i = 1; i < arr.length; i++) {
                var item = arr[i];
                if (ret.indexOf(item) == -1) {
                    ret.push(item);
                }
            }
            return ret.sort();
        }

        function getInstallPredicate(id) {
            return Predicate.create('INSTALL_ID', 'eq', id);
        }

        function getById(id) {
            var predicate = Predicate.create('API_NO12', 'eq', id);
            return EntityQuery.from('Well').where(predicate).using(manager).execute();
        }

        function getWellboreById(id) {
            var predicate = Predicate.create('WELLBORE_ID', 'eq', id);
            return EntityQuery.from('Wellbore').where(predicate).toType('WELLBORE').using(manager).execute();
        }

        function getCasingOD() {
            return EntityQuery.from('PK_CASING_OD').select('ID,WT,OD').using(manager).execute();
        }

        function getGrade() {
            return EntityQuery.from('PK_TUBING_GRADE').select('GRADE').using(manager).execute();
        }

        function getTubingOD() {
            return EntityQuery.from('PK_TUBING_OD').select('ID,WT,OD').using(manager).execute();
        }

        function getIntakePK() {
            return EntityQuery.from('PK_INTAKETYPE_MOD').select('INTAKE_TYPE,MODEL,MANUFACTURER').using(manager).execute();
        }

        function getMotorPK() {
            return EntityQuery.from('PK_MOTORMAN_MOD').select('MODEL,MANUFACTURER').using(manager).execute();
        }

        function getSensorPK() {
            return EntityQuery.from('PK_SENSORMAN_MOD').select('SENSOR_TYPE,MANUFACTURER').using(manager).execute();
        }

        function getProtectorPK() {
            return EntityQuery.from('PK_PROTECTSER_MOD').select('MODEL,MANUFACTURER,SERIES').using(manager).execute();
        }

        function getAttachmentTypePK() {
            return EntityQuery.from('PK_ATTACHMENT_TYPE').select('ATTACHMENT_TYPE').using(manager).execute();
        }

        function getFailPK() {
            return EntityQuery.from('PK_FAIL').using(manager).execute();
        }

        function getFailHardware(id) {
            return EntityQuery.from('PK_FAIL_HARDWARE').withParameters({ id: id }).using(manager).execute();
        }

        function getWellCriteria(criteria) {
            var predicate = Predicate.create('WELL_NAME', 'startsWith', criteria.toUpperCase());
            return EntityQuery.from('WELL').where(predicate).select('WTS_GUID,WELL_NAME').using(manager).execute();
        }

        function getInstallById(id) {
            return EntityQuery.from('INSTALL').where(getInstallPredicate(id)).toType('INSTALL').using(manager).execute();
        }

        function getDesignByInstallId(id) {
            return EntityQuery.from('DESIGN').where(getInstallPredicate(id)).toType('DESIGN').using(manager).execute();
        }

        function getTubingByInstallId(id) {
            return EntityQuery.from('TUBING').where(getInstallPredicate(id)).toType('TUBING').using(manager).execute();
        }

        function getIntakeByInstallId(id) {
            return EntityQuery.from('INTAKE').where(getInstallPredicate(id)).toType('INTAKE').using(manager).execute();
        }

        function getSurfaceByInstallId(id) {
            return EntityQuery.from('SURFACE').where(getInstallPredicate(id)).toType('SURFACE').using(manager).execute();
        }

        function getFailureByInstallId(id) {
            return EntityQuery.from('FAILURE').where(getInstallPredicate(id)).toType('FAILURE').using(manager).execute();
        }

        function getSensorByInstallId(id) {
            return EntityQuery.from('SENSOR').where(getInstallPredicate(id)).toType('SENSOR').using(manager).execute();
        }

        function getMotorById(id) {
            var predicate = Predicate.create('MOTOR_ID', 'eq', id);
            return EntityQuery.from('MOTOR').where(predicate).toType('MOTOR').using(manager).execute();
        }

        function getIntakeById(id) {
            var predicate = Predicate.create('INTAKE_ID', 'eq', id);
            return EntityQuery.from('INTAKE').where(predicate).toType('INTAKE').using(manager).execute();
        }

        function getCableById(id) {
            var predicate = Predicate.create('CABLE_ID', 'eq', id);
            return EntityQuery.from('CABLE').where(predicate).toType('CABLE').using(manager).execute();
        }

        function getProtectorById(id) {
            var predicate = Predicate.create('PROTECTOR_ID', 'eq', id);
            return EntityQuery.from('PROTECTOR').where(predicate).toType('PROTECTOR').using(manager).execute();
        }

        function getApplicationUserById(id) {
            var predicate = Predicate.create('ID', 'eq', id);
            return EntityQuery.from('APPLICATION_USER').where(predicate).toType('APPLICATION_USER').using(manager).execute();
        }

        function getAttachmentById(id) {
            var predicate = Predicate.create('ATTACHMENT_ID', 'eq', id);
            return EntityQuery.from('ATTACHMENT').where(predicate).toType('ATTACHMENT').using(manager).execute();
        }

        function getPumpById(id) {
            var predicate = Predicate.create('PUMP_ID', 'eq', id);
            return EntityQuery.from('PUMP').where(predicate).toType('PUMP').using(manager).execute();
        }

        function getPumpConstruction() {
            return EntityQuery.from('PK_PUMPMAN_CONSTR').using(manager).execute();
        }

        function getPumpModel() {
            return EntityQuery.from('PK_PUMPMAN_MOD').using(manager).execute();
        }

        function hasChanges() {
            return manager.hasChanges();
        }

        function deleteRow() {
            var deferred = $q.defer();
            if (confirm("Are you sure you want to delete the following records ?") == true) {
                return manager.saveChanges().then(function (resp) {
                    logger.warning('Successful', 'Delete');
                    deferred.resolve();
                }, function (msg) {
                    logger.error(msg, msg, 'Error');
                });
            } else {
                manager.rejectChanges();
                deferred.reject();
            }
            return deferred.promise;
        }

        function saveChanges() {
            return manager.saveChanges().then(function (resp) {
                logger.success('Successful', 'Save');
                return resp;
            }, function (msg) {
                logger.error(msg, msg, 'Error');
            });
        }

        function rejectChanges() {
            return manager.rejectChanges();
        }
    }
})();