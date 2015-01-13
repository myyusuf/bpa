﻿require.config({
    paths: {
        "jQuery": "../jquery/1.11.1/jquery.min",
        "tinypubsub": "../tinypubsub/ba-tiny-pubsub",
        "i18next": "../i18next/i18next-1.7.7.min",
        "jqxcore": "../jqwidgets/3.5.0/jqxcore",
        "jqxtabs": "../jqwidgets/3.5.0/jqxtabs",
        "jqxbuttons": "../jqwidgets/3.5.0/jqxbuttons",
        "jqxpanel": "../jqwidgets/3.5.0/jqxpanel",
        "jqxscrollbar": "../jqwidgets/3.5.0/jqxscrollbar",
        "jqxtree": "../jqwidgets/3.5.0/jqxtree",
        "jqxexpander": "../jqwidgets/3.5.0/jqxexpander",
        "jqxsplitter": "../jqwidgets/3.5.0/jqxsplitter",
        "jqxmenu": "../jqwidgets/3.5.0/jqxmenu",
        "jqxnavigationbar": "../jqwidgets/3.5.0/jqxnavigationbar",
        "jqxgrid": "../jqwidgets/3.5.0/jqxgrid",
        "jqxgrid.pager": "../jqwidgets/3.5.0/jqxgrid.pager",
        "jqxgrid.sort": "../jqwidgets/3.5.0/jqxgrid.sort",
        "jqxgrid.edit": "../jqwidgets/3.5.0/jqxgrid.edit",
        "jqxgrid.selection": "../jqwidgets/3.5.0/jqxgrid.selection",
        "jqxdropdownlist": "../jqwidgets/3.5.0/jqxdropdownlist",
        "jqxlistbox": "../jqwidgets/3.5.0/jqxlistbox",
        "jqxgrid": "../jqwidgets/3.5.0/jqxgrid",
        "jqxdata": "../jqwidgets/3.5.0/jqxdata",
        "jqxslider": "../jqwidgets/3.5.0/jqxslider",
        "bpmn/Bpmn" : "../bpmnjs/bpmn.min",
        
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
            deps: ['jQuery', "jqxcore", "jqxdropdownlist"]
        },
        "jqxdata": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
        },
        "jqxslider": {
            export: "$",
            deps: ['jQuery', "jqxcore"]
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
require(["bpa-workflow-app"], function (App) {
    App.initialize();
});