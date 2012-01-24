/**
 * An abstract class for providing functionality that 
 * looks for more information about a particular QueryTarget.
 * 
 * Ie if the user selects a particular feature from a WFS for 
 * more information, the querier will lookup that information
 * an return a portal.layer.querier.BaseComponent contain
 * said information
 * 
 */
Ext.define('portal.layer.querier.Querier', {
    extend: 'Ext.util.Observable',
    constructor: function(config){

        // Copy configured listeners into *this* object so that the base class's
        // constructor will add them.
        this.listeners = config.listeners;

        // Call our superclass constructor to complete construction process.
        this.callParent(arguments)
    },

    /**
     * An abstract function for querying for information
     * about a particular feature/location associated with a 
     * data source.
     * 
     * The result of the query will be returned via a callback mechanism
     * as a BaseComponent ie. a GUI widget.
     *
     * function(portal.layer.querier.QueryTarget target
     *          function(portal.layer.querier.Querier this, portal.layer.querier.BaseComponent baseComponent) callback
     *
     * returns - void
     *
     * target - the instance that fired off the query
     * callback - will be called the specified parameters after the BaseComponent has been created
     */
    query : portal.util.UnimplementedFunction

});