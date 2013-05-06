/**
 * Builds a form panel for CSW filters
 */
Ext.define('auscope.layer.filterer.forms.CSWServiceFilterForm', {
    extend: 'portal.layer.filterer.BaseFilterForm',

    /**
     * Accepts a config for portal.layer.filterer.BaseFilterForm
     */
    constructor : function(config) {
        // First build our keyword/resource data from our list of CSWRecords
        // Always treat it as an array:
        var cswRecords = [].concat(config.layer.get('cswRecords'));

        current_date = new Date();
        
        Ext.apply(config, {
            delayedFormLoading: false,
            border: false,
            autoScroll: true,
            hideMode:'offsets',
            width:'100%',
            buttonAlign:'right',
            labelAlign:'right',
            labelWidth: 70,
            bodyStyle:'padding:5px',
            autoHeight: true,
            items: [{
                xtype:'fieldset',
                title: 'CSW Filter Properties',
                autoHeight: true,
                items: [{
                    anchor: '100%',
                    xtype: 'textfield',
                    fieldLabel: 'Any text',
                    name: 'anyText'
                },{
                    anchor: '100%',
                    xtype: 'textfield',
                    fieldLabel: 'Title',
                    name: 'title'
                },{
                    anchor: '100%',
                    xtype: 'textfield',
                    fieldLabel: 'Abstract',
                    name: 'abstract'
                },{
                    xtype:'fieldset',
                    title: 'Metadata change date',
                    autoHeight: true,
                    items: [{
                        anchor: '100%',
                        xtype : 'datefield',
                        fieldLabel : 'From',
                        name : 'metadata_change_date_from',
                        allowBlank : true,
                        maxValue : current_date,
                        format : 'd/m/Y'
                    },{
                        anchor: '100%',
                        xtype : 'datefield',
                        fieldLabel : 'To',
                        name : 'metadata_change_date_to',
                        allowBlank : true,
                        maxValue : current_date,
                        format : 'd/m/Y'
                    }]
                },{
                    xtype:'fieldset',
                    title: 'Temporal extent',
                    autoHeight: true,
                    items: [{
                        anchor: '100%',
                        xtype : 'datefield',
                        fieldLabel : 'From',
                        name : 'temporal_extent_date_from',
                        allowBlank : true,
                        maxValue : current_date,
                        format : 'd/m/Y'
                    },{
                        anchor: '100%',
                        xtype : 'datefield',
                        fieldLabel : 'To',
                        name : 'temporal_extent_date_to',
                        allowBlank : true,
                        maxValue : current_date,
                        format : 'd/m/Y'
                    }]
                }]
            }]
        });
        
        this.callParent(arguments);
    }
});
