Ext.define('CpsiMapview.view.grid.ItemDeleter',
    {
        extend: 'Ext.grid.column.Action',
        xtype: 'cmv_itemdeleter',
        width: 55,
        requiredRole: this.deleteItemRequiredRole,
        menuDisabled: true, // disable the column header menu containing sort/hide options
        iconCls: 'x-fa fa-delete',
        ignoreConfirmation: false,
        isActionColumn: true,
        hideable: false, // prevent the user from hiding this column
        draggable: false,
        tooltip: 'Click here to remove the record',

        /**
            Possible bug when a row editor plugin is added to the same grid as the ItemDeleter?

            column.getEditor().hide() called - and there is no Editor for the ItemDeleter

            http://docs.sencha.com/extjs/4.2.3/source/Column3.html#Ext-grid-column-Column-method-getEditor

            EDIT: by LEO 20160404 - a fake control returned by getEditor() creates more issues, while defining a real editor seems to work
            */
        editor: {
            xtype: 'label',
            text: ''
        },

        itemIsDisabled: function (/*view, rowIndex, colIndex, item, record*/) {
            return this.disabled;
        },

        items: [
            {
                ignoreConfirmation: this.ignoreConfirmation,
                iconCls: 'icon-delete',
                tooltip: this.tooltip,
                handler: 'onDeleteFileClick',
                // updated in 6.7 or get the following warning
                // WARN: '[W] [Ext.grid.column.Action] The isDisabled config is deprecated. Use isActionDisabled to avoid conflict with Ext.Component#isDisabled().'
                isActionDisabled: function (view, rowIndex, colIndex, item, record) {
                    return this.disabled || this.itemIsDisabled(view, rowIndex, colIndex, item, record);
                }
            }
        ]
    });

