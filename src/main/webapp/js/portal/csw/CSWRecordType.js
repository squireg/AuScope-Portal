/**
 * An Ext.data.Types extension for portal.csw.CSWRecord
 *
 * See http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Types
 */
Ext.ns('portal.csw');
portal.csw.CSWRecordType = {
    convert: function(v, data) {
        if (Ext.isArray(v)) {
            var newArray = [];
            for (var i = 0; i < v.length; i++) {
                newArray.push(this.convert(v[i]));
            }
            return newArray;
        } else if (v instanceof portal.csw.CSWRecord) {
            return v;
        } else if (Ext.isObject(v)) {
            return Ext.create('portal.csw.CSWRecord', v);
        }
        return null;
    },
    sortType: function(v) {
        return v.data.id;  // When sorting, order by id
    },
    type: 'portal.csw.OnlineResource'
};