/**
 * Created by Yusuf on 5/2/2015.
 */

/// <reference path="ts/require.d.ts" />

requirejs.config({
    paths: {
        "jquery": "../lib/jquery/1.11.1/jquery.min",
        "jqueryui": "../lib/jqueryui/1.11.4/jquery-ui.min",
        "jqxcore":"../lib/jqwidgets/3.8.0/jqxcore",
        "jqxbuttons":"../lib/jqwidgets/3.8.0/jqxbuttons",
        "jqxsplitter":"../lib/jqwidgets/3.8.0/jqxsplitter",
        "jqxscrollbar":"../lib/jqwidgets/3.8.0/jqxscrollbar",
        "jqxpanel":"../lib/jqwidgets/3.8.0/jqxpanel",
        "jqxdockpanel":"../lib/jqwidgets/3.8.0/jqxdockpanel",
        "jqxnavigationbar":"../lib/jqwidgets/3.8.0/jqxnavigationbar",
        "jqxtree":"../lib/jqwidgets/3.8.0/jqxtree",
        "jqxtabs":"../lib/jqwidgets/3.8.0/jqxtabs",
        "jqxwindow":"../lib/jqwidgets/3.8.0/jqxwindow",
        "jqxinput":"../lib/jqwidgets/3.8.0/jqxinput",
        "jqxdata":"../lib/jqwidgets/3.8.0/jqxdata",
        "jqxgrid.pager": "../lib/jqwidgets/3.8.0/jqxgrid.pager",
        "jqxgrid.sort": "../lib/jqwidgets/3.8.0/jqxgrid.sort",
        "jqxgrid.edit": "../lib/jqwidgets/3.8.0/jqxgrid.edit",
        "jqxgrid.selection": "../lib/jqwidgets/3.8.0/jqxgrid.selection",
        "jqxdropdownlist": "../lib/jqwidgets/3.8.0/jqxdropdownlist",
        "jqxlistbox": "../lib/jqwidgets/3.8.0/jqxlistbox",
        "jqxmenu":"../lib/jqwidgets/3.8.0/jqxmenu",
        "jqxgrid":"../lib/jqwidgets/3.8.0/jqxgrid",
		"jqxtreegrid":"../lib/jqwidgets/3.8.0/jqxtreegrid",
		"jqxdatatable":"../lib/jqwidgets/3.8.0/jqxdatatable",
        "jqxvalidator":"../lib/jqwidgets/3.8.0/jqxvalidator",
        "jqxnotification":"../lib/jqwidgets/3.8.0/jqxnotification",
        "jqxtooltip":"../lib/jqwidgets/3.8.0/jqxtooltip",
        "jqxpasswordinput":"../lib/jqwidgets/3.8.0/jqxpasswordinput",

        "component":"bpa/base/component/Component",
        "button":"bpa/base/component/Button",
        "splitterlayout":"bpa/base/component/layout/SplitterLayout",
        "splitterlayoutpanel":"bpa/base/component/layout/SplitterLayoutPanel",
        "panel":"bpa/base/component/container/Panel",
        "dockpanel":"bpa/base/component/container/DockPanel",
        "dockpanelitem":"bpa/base/component/container/DockPanelItem",
        "navigationbar":"bpa/base/component/container/NavigationBar",
        "navigationbaritem":"bpa/base/component/container/NavigationBarItem",
        "tree":"bpa/base/component/Tree",
        "treeitem":"bpa/base/component/TreeItem",
        "tab":"bpa/base/component/container/Tab",
        "tabitem":"bpa/base/component/container/TabItem",
        "window":"bpa/base/component/container/Window",
        "form":"bpa/base/component/container/Form",
        "textbox":"bpa/base/component/TextBox",
        "datasource":"bpa/base/data/DataSource",
        "datafield":"bpa/base/data/DataField",
        "dataadapter":"bpa/base/data/DataAdapter",
        "datagrid":"bpa/base/component/grid/DataGrid",
        "menu":"bpa/base/component/Menu",
        "menuitem":"bpa/base/component/MenuItem",

        "componentoptions":"bpa/base/component/ComponentOptions",
        "buttonoptions":"bpa/base/component/ButtonOptions",
        "layoutoptions":"bpa/base/component/layout/LayoutOptions",
        "splitterlayoutoptions":"bpa/base/component/layout/SplitterLayoutOptions",
        "splitterlayoutpaneloptions":"bpa/base/component/layout/SplitterLayoutPanelOptions",
        "paneloptions":"bpa/base/component/container/PanelOptions",
        "dockpaneloptions":"bpa/base/component/container/DockPanelOptions",
        "navigationbaroptions":"bpa/base/component/container/NavigationBarOptions",
        "treeoptions":"bpa/base/component/TreeOptions",
        "taboptions":"bpa/base/component/container/TabOptions",
        "tabitemoptions":"bpa/base/component/container/TabItemOptions",
        "textboxoptions":"bpa/base/component/TextBoxOptions",
        "datasourceoptions":"bpa/base/data/DataSourceOptions",
        "datagridoptions":"bpa/base/component/grid/DataGridOptions",
        "menuoptions":"bpa/base/component/MenuOptions",

        "clickeventlistener":"bpa/base/component/event/ClickEventListener",
        "selecttreeitemeventlistener":"bpa/base/component/event/SelectTreeItemEventListener",

        "myresize":"../lib/alman/jquery.ba-resize.min"
    },
    shim:{
        "jqueryui": {
            export: "$",
            deps: ['jquery']
        },
        "jqxcore": {
            export: "$",
            deps: ['jquery']
        },
        "jqxbuttons": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxsplitter": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxscrollbar": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxbuttons"]
        },
        "jqxpanel": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxscrollbar"]
        },
        "jqxdockpanel": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxnavigationbar": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxtree": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxtabs": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxwindow": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxinput": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxgrid.pager": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxgrid"]
        },
        "jqxgrid.sort": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxgrid"]
        },
        "jqxgrid.edit": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxgrid"]
        },
        "jqxgrid.selection": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxgrid"]
        },
        "jqxlistbox": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxdropdownlist": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxlistbox"]
        },
        "jqxmenu": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxgrid": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxdropdownlist", "jqxscrollbar", "jqxmenu"]
        },
        "jqxdata": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxtreegrid": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxdropdownlist", "jqxscrollbar", "jqxdatatable"]
        },
        "jqxdatatable": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxvalidator": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxnotification": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxtooltip": {
            export: "$",
            deps: ['jquery', "jqxcore"]
        },
        "jqxpasswordinput": {
            export: "$",
            deps: ['jquery', "jqxcore", "jqxtooltip"]
        },
        "myresize": {
            export: "$",
            deps: ['jquery']
        }
    }
});

require(["app-base-test"] );
