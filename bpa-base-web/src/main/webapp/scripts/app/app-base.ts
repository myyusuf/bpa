/**
 * Created by Yusuf on 5/2/2015.
 */

/// <reference path="ts/require.d.ts" />
/// <reference path="ts/jquery.d.ts" />

import $ = require("jquery");
import Button = require("button");
import SplitterLayout = require("splitterlayout");
import Panel = require("panel");
import DockPanel = require("dockpanel");
import DockPanelItem = require("dockpanelitem");
import DockPanelOptions = require("dockpaneloptions");

import NavigationBar = require("navigationbar");
import NavigationBarItem = require("navigationbaritem");
import NavigationBarOptions = require("navigationbaroptions");

import Tree = require("tree");
import TreeOptions = require("treeoptions");
import SelectTreeItemEvent = require("selecttreeitemevent");

import Tab = require("tab");
import TabOptions = require("taboptions");
import TabItem = require("tabitem");
import TabItemOptions = require("tabitemoptions");

import TextBox = require("textbox");
import TextBoxOptions = require("textboxoptions");

import DataSource = require("datasource");
import DataSourceOptions = require("datasourceoptions");
import DataAdapter = require("dataadapter");
import DataGrid = require("datagrid");
import DataGridOptions = require("datagridoptions");



var _button1 = new Button(
    {
        label: "Button1",
        onClick: function(event){
            console.log("test onClick event listener: " + event);
        }
    });

var _button2 = new Button(
    {
        label: "Button2",
        onClick: function(event){
            console.log("test onClick event listener: " + event);
        }
    });

//-------------------------------------------------

var _onSelectItem: SelectTreeItemEvent = function(item, label, value){
    console.log("Label : " + label + ", value : " + value);
}

var _treeOptions: TreeOptions = {
    items: [
        {
            icon: '',
            label: 'Mail'
        },{
            icon: '',
            label: 'Contacts',
            expanded: true,
            items: [
                {
                    icon: '',
                    label: 'Details',
                    value: 'test value'
                },
            ]
        }
    ],

    onSelectItem: _onSelectItem
};


var _tree = new Tree(_treeOptions);

var _navigationBarItems:Array<NavigationBarItem> = [];
_navigationBarItems.push({
    iconUrl: '',
    iconAlt: 'testIconAlt',
    label: 'Test',
    content: _tree
});
_navigationBarItems.push({
    iconUrl: '',
    iconAlt: 'testIconAlt2',
    label: 'Test2',
    content: _button1
});

var _navigationBarOptions: NavigationBarOptions = {
    items: _navigationBarItems,
    height: 300
};

var _navigationBar = new NavigationBar(_navigationBarOptions);

var _panel = new Panel({
    caption: "Menu",
    height: 400,
    content: _navigationBar
});

//-------------------------------------------------

/*var _splitterLayout3 = new SplitterLayout({
    width: '100%',
    height: 200,
    orientation: "vertical",
    panels: [{size: 100}, {size: 100, content: _button2}]
});

var _splitterLayout1 = new SplitterLayout({
    width: '100%',
    height: 398,
    orientation: "horizontal",
    panels: [{size: 200}, {size: 200, content: _splitterLayout3}]
});*/

/*var _textBoxOptions: TextBoxOptions = {
    placeHolder: 'test'
};
var _textBox = new TextBox(_textBoxOptions);*/

var _data = [{code: "AAA", name: "Test"}]
var _dataSourceOptions: DataSourceOptions = {
    dataType: "json",
    dataFields: [
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' }
    ],
    id: 'code',
    localData: _data
};

var _dataSource = new DataSource(_dataSourceOptions);
var _dataAdapter = new DataAdapter(_dataSource);
var _dataGridOptions: DataGridOptions = {
    dataAdapter: _dataAdapter,
    width: "100%",
    height: 200
}
var _dataGrid = new DataGrid(_dataGridOptions);

var _tabItems: Array<TabItem> = [];
var _tabItem: TabItem = new TabItem({caption: "TabCaption1", content: _dataGrid});
var _tabItem2: TabItem = new TabItem({caption: "TabCaption2", content: _button1});
_tabItems.push(_tabItem);
_tabItems.push(_tabItem2);


var _tabOptions: TabOptions = {
    selectionTracker: true,
    items:_tabItems,
    height: 300,
    width: 500
};

var _tab = new Tab(_tabOptions);

var _splitterLayout2 = new SplitterLayout({
    width: '100%',
    height: '100%',
    orientation: "vertical",
    panels: [{size: 200}, {size: 300, content: _tab}]
});

//-------------------------------------------------------------------------------------------------------------

var _dockPanelItems: Array<DockPanelItem> = [];
var _header: DockPanelItem = {
    width: "100%",
    height: "25px",
    backgroundColor: "rgb(84, 88, 92)",
    dock: "top"
};
var _footer: DockPanelItem = {
    width: "100%",
    height: "20px",
    backgroundColor: "#eee",
    dock: "bottom"
};
var _content: DockPanelItem = {
    width: "100%",
    backgroundColor: "white",
    content: _splitterLayout2,
    dock: "left"
};

_dockPanelItems.push(_header);
_dockPanelItems.push(_footer);
_dockPanelItems.push(_content); //lastchild

var _dockPanelOptions: DockPanelOptions = {
    lastChildFill: true,
    items: _dockPanelItems
}

var _dockPanel = new DockPanel(_dockPanelOptions);

_dockPanel.renderTo($("#content"));
//_splitterLayout2.renderTo($("#content"));

//_dataGrid.renderTo($("#content"));
//_panel.renderTo($("#content"));

//$(window).resize(function(){
//    console.log("resize : " + $("#testContent").height());
//});






