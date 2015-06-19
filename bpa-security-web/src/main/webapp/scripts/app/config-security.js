/**
 * Created by Yusuf on 5/2/2015.
 */
/// <reference path="ts/require.d.ts" />
requirejs.config({
    paths: {
        "jquery": "../lib/jquery/1.11.1/jquery.min",
        "jqueryui": "../lib/jqueryui/1.11.4/jquery-ui.min",
        "jqxcore": "../lib/jqwidgets/3.8.0/jqxcore",
        "jqxbuttons": "../lib/jqwidgets/3.8.0/jqxbuttons",
        "jqxsplitter": "../lib/jqwidgets/3.8.0/jqxsplitter",
        "jqxscrollbar": "../lib/jqwidgets/3.8.0/jqxscrollbar",
        "jqxpanel": "../lib/jqwidgets/3.8.0/jqxpanel",
        "jqxdockpanel": "../lib/jqwidgets/3.8.0/jqxdockpanel",
        "jqxnavigationbar": "../lib/jqwidgets/3.8.0/jqxnavigationbar",
        "jqxtree": "../lib/jqwidgets/3.8.0/jqxtree",
        "jqxtabs": "../lib/jqwidgets/3.8.0/jqxtabs",
        "jqxwindow": "../lib/jqwidgets/3.8.0/jqxwindow",
        "jqxinput": "../lib/jqwidgets/3.8.0/jqxinput",
        "jqxdata": "../lib/jqwidgets/3.8.0/jqxdata",
        "jqxgrid.pager": "../lib/jqwidgets/3.8.0/jqxgrid.pager",
        "jqxgrid.sort": "../lib/jqwidgets/3.8.0/jqxgrid.sort",
        "jqxgrid.edit": "../lib/jqwidgets/3.8.0/jqxgrid.edit",
        "jqxgrid.selection": "../lib/jqwidgets/3.8.0/jqxgrid.selection",
        "jqxdropdownlist": "../lib/jqwidgets/3.8.0/jqxdropdownlist",
        "jqxlistbox": "../lib/jqwidgets/3.8.0/jqxlistbox",
        "jqxmenu": "../lib/jqwidgets/3.8.0/jqxmenu",
        "jqxgrid": "../lib/jqwidgets/3.8.0/jqxgrid",
        "jqxtreegrid": "../lib/jqwidgets/3.8.0/jqxtreegrid",
        "jqxdatatable": "../lib/jqwidgets/3.8.0/jqxdatatable",
        "jqxvalidator": "../lib/jqwidgets/3.8.0/jqxvalidator",
        "jqxnotification": "../lib/jqwidgets/3.8.0/jqxnotification",
        "jqxtooltip": "../lib/jqwidgets/3.8.0/jqxtooltip",
        "jqxpasswordinput": "../lib/jqwidgets/3.8.0/jqxpasswordinput",
        "myresize": "../lib/alman/jquery.ba-resize.min"
    },
    shim: {
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
            deps: ['jquery', "jqxcore", "jqxbuttons"]
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
require(["app-security"]);
