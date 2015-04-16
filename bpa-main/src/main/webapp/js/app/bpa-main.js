require.config({
    paths: {
        "jQuery": "../jquery/1.11.1/jquery.min",
        "tinypubsub": "../tinypubsub/ba-tiny-pubsub",
        "i18next": "../i18next/i18next-1.7.7.min",
        "jqxcore": "../jqwidgets/3.7.1/jqxcore",
        "jqxtabs": "../jqwidgets/3.7.1/jqxtabs",
        "jqxbuttons": "../jqwidgets/3.7.1/jqxbuttons",
        "jqxpanel": "../jqwidgets/3.7.1/jqxpanel",
        "jqxscrollbar": "../jqwidgets/3.7.1/jqxscrollbar",
        "jqxtree": "../jqwidgets/3.7.1/jqxtree",
        "jqxexpander": "../jqwidgets/3.7.1/jqxexpander",
        "jqxsplitter": "../jqwidgets/3.7.1/jqxsplitter",
        "jqxmenu": "../jqwidgets/3.7.1/jqxmenu",
        "jqxnavigationbar": "../jqwidgets/3.7.1/jqxnavigationbar",
        "jqxgrid": "../jqwidgets/3.7.1/jqxgrid",
        "jqxgrid.pager": "../jqwidgets/3.7.1/jqxgrid.pager",
        "jqxgrid.sort": "../jqwidgets/3.7.1/jqxgrid.sort",
        "jqxgrid.edit": "../jqwidgets/3.7.1/jqxgrid.edit",
        "jqxgrid.selection": "../jqwidgets/3.7.1/jqxgrid.selection",
        "jqxdropdownlist": "../jqwidgets/3.7.1/jqxdropdownlist",
        "jqxlistbox": "../jqwidgets/3.7.1/jqxlistbox",
        "jqxgrid": "../jqwidgets/3.7.1/jqxgrid",
        "jqxdata": "../jqwidgets/3.7.1/jqxdata",
        "jqxtreegrid": "../jqwidgets/3.7.1/jqxtreegrid",
        "jqxdatatable": "../jqwidgets/3.7.1/jqxdatatable",
        "jqxwindow": "../jqwidgets/3.7.1/jqxwindow",
        "jqxinput": "../jqwidgets/3.7.1/jqxinput",
        "jqxvalidator": "../jqwidgets/3.7.1/jqxvalidator",
        "jqxcombobox": "../jqwidgets/3.7.1/jqxcombobox",
        "jqxnotification": "../jqwidgets/3.7.1/jqxnotification",
        "jqxmaskedinput": "../jqwidgets/3.7.1/jqxmaskedinput",
        "jqxfileupload": "../jqwidgets/3.7.1/jqxfileupload",
        "jqxpasswordinput": "../jqwidgets/3.7.1/jqxpasswordinput",
        "jqxtooltip": "../jqwidgets/3.7.1/jqxtooltip",
        
        "bpmn/Bpmn" : "../bpmnjs/bpmn.min",
        
        "jQueryUi": "../jqueryui/1.10.4/jquery-ui.min",
        "primitives" : "../primitives/primitives.min",
        
        "notificationWindow": "../app/component/base/NotificationWindow",
        "bpaObservable": "../app/component/base/Observable"
        	
    },
    //waitSeconds: 60,
    shim: {
    	"tinypubsub": {
            export: "$",
            deps: ['jQuery']
        },
        "i18next": {
            export: "$",
            deps: ['jQuery']
        },
        "jqxcore": {
            export: "$",
            deps: ['jQuery']
        },
        "jqxtabs": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxbuttons": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxpanel": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxscrollbar": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxtree": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxexpander": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxsplitter": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxmenu": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxnavigationbar": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxgrid.pager": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxgrid"]
        },
        "jqxgrid.sort": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxgrid"]
        },
        "jqxgrid.edit": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxgrid"]
        },
        "jqxgrid.selection": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxgrid"]
        },
        "jqxlistbox": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxdropdownlist": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxlistbox"]
        },
        "jqxgrid": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxdropdownlist", "jqxscrollbar"]
        },
        "jqxdata": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxtreegrid": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxdropdownlist", "jqxscrollbar", "jqxdatatable"]
        },
        "jqxdatatable": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxwindow": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxinput": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxvalidator": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxcombobox": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxnotification": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxfileupload": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxtooltip": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxpasswordinput": {
            export: "$",
            deps: ['jQuery', "jqxcore", "jqxtooltip"]
        },
        "jqxmaskedinput": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
    	"jQueryUi": {
            export: "$",
            deps: ['jQuery']
        },
    	"primitives": {
            export: "$",
            deps: ['jQuery', 'jQueryUi']
        },
        "bpaErrorWindow": {
            export: "ErrorWindow"
        },
        "notificationWindow": {
            export: "NotificationWindow"
        },
        "bpaObservable": {
            export: "Observable"
        }
        
    },
    packages: [
               { name: "dojo", location: "../dojo/dojo" },
               { name: "dojox", location: "../dojo/dojox"},
          ]
});
require(["bpa-main-cms-app"], function (App) {
    App.initialize();
});