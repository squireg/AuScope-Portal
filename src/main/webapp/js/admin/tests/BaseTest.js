Ext.ns('Admin.Tests');

Admin.Tests.TestIDCounter = 0;

/**
 * The base test containing the interface that all tests must extend
 * and utilities for all tests to leverage
 */
Admin.Tests.BaseTest = Ext.extend(Ext.util.Observable, {
    _id : null,
    _status : null,
    _cswRecordStore : null,
    _knownLayerStore : null,
    _errors : [],
    _warnings : [],
    _details : [],

    /**
     * Accepts all Ext.util.Observable configuration options with the following additions
     * {
     *
     * }
     *
     * Adds the following events
     * statuschanged : function(Admin.Tests.BaseTest test, Admin.Tests.TestStatus status) - Called when this test undergoes a status change
     */
    constructor : function(cfg) {
        this.addEvents('statuschanged');
        this.listeners  = cfg.listeners;
        this._id = String.format('admintest-{0}', Admin.Tests.TestIDCounter++);
        this._status = Admin.Tests.TestStatus.Initialising;
        this._cswRecordStore = cfg.cswRecordStore;
        this._knownLayerStore = cfg.knownLayerStore;
        Admin.Tests.BaseTest.superclass.constructor.call(this, cfg);
    },

    /**
     * Gets the unique ID of this test as a String
     */
    getId : function() {
        return this._id;
    },

    /**
     * [Abstract] Gets the title of this test as a String
     */
    getTitle : Ext.emptyFn,

    /**
     * [Abstract] Gets the description of this test as a HTML String.
     *
     * This function may be called before, during or after a test is run. Ideally the results of this function
     * should be amended with details of the TestResult.
     */
    getDescription : function() {
        var description = '';
        for (var i = 0; i < this._errors.length; i++) {
            description += '<br/><b>[ERROR]</b> ' + this._errors[i];
        }
        for (var i = 0; i < this._warnings.length; i++) {
            description += '<br/><b>[WARN]</b> ' + this._warnings[i];
        }
        for (var i = 0; i < this._details.length; i++) {
            description += '<br/><b>[INFO]</b> ' + this._details[i];
        }
        return description;
    },

    /**
     * Gets the tooltip string for the current status of this test. This f
     */
    getStatusTip : function() {
        switch(this._status) {
        case Admin.Tests.TestStatus.Success:
            return 'This test has succeeded';
        case Admin.Tests.TestStatus.Warning:
            return 'This test has resulted in 1 or more non critical warnings. Please see the description for more information.';
        case Admin.Tests.TestStatus.Error:
            return 'This test has failed. Please see the description for more information.';
        case Admin.Tests.TestStatus.Running:
            return 'This test is currently running. The result will be available shortly.';
        case Admin.Tests.TestStatus.Unavailable:
            return 'This test is currently unavailable because the backend is unreachable or unable to initialise this test\'s dependencies.';
        }
    },

    /**
     * [Abstract] Starts this test.
     * startTest(KnownLayerStore knownLayerStore, CSWRecordStore cswRecordStore)
     */
    startTest : Ext.emptyFn,

    /**
     * Utility function for changing the status of this test & alerting any listeners
     */
    _changeStatus : function(newStatus) {
        this._status = newStatus;
        this.fireEvent('statuschanged', this, newStatus);
    },

    /**
     * Utility for handling the typical responses from the backend AdminController
     */
    _handleAdminControllerResponse : function(responseObj) {
        this._errors = responseObj.errors;
        this._warnings = responseObj.warnings;
        this._details = responseObj.details;

        if (!responseObj.success) {
            this._changeStatus(Admin.Tests.TestStatus.Error);
            return;
        }

        if (responseObj.errors.length > 0 || responseObj.warnings.length > 0) {
            this._changeStatus(Admin.Tests.TestStatus.Warning);
            return;
        }

        this._changeStatus(Admin.Tests.TestStatus.Success);
    }
});