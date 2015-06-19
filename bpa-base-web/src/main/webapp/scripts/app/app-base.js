/**
 * Created by Yusuf on 5/2/2015.
 */
define(["require", "exports", "jquery", "button", "splitterlayout", "panel", "dockpanel", "navigationbar", "tree", "tab", "tabitem", "datasource", "dataadapter", "datagrid"], function (require, exports, $, Button, SplitterLayout, Panel, DockPanel, NavigationBar, Tree, Tab, TabItem, DataSource, DataAdapter, DataGrid) {
    var _button1 = new Button({
        label: "Button1",
        onClick: function (event) {
            console.log("test onClick event listener: " + event);
        }
    });
    var _button2 = new Button({
        label: "Button2",
        onClick: function (event) {
            console.log("test onClick event listener: " + event);
        }
    });
    //-------------------------------------------------
    var _onSelectItem = function (item, label, value) {
        console.log("Label : " + label + ", value : " + value);
    };
    var _treeOptions = {
        items: [
            {
                icon: '',
                label: 'Mail'
            },
            {
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
    var _navigationBarItems = [];
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
    var _navigationBarOptions = {
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
    var _data = [{ code: "AAA", name: "Test" }];
    var _dataSourceOptions = {
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
    var _dataGridOptions = {
        dataAdapter: _dataAdapter,
        width: "100%",
        height: 200
    };
    var _dataGrid = new DataGrid(_dataGridOptions);
    var _tabItems = [];
    var _tabItem = new TabItem({ caption: "TabCaption1", content: _dataGrid });
    var _tabItem2 = new TabItem({ caption: "TabCaption2", content: _button1 });
    _tabItems.push(_tabItem);
    _tabItems.push(_tabItem2);
    var _tabOptions = {
        selectionTracker: true,
        items: _tabItems,
        height: 300,
        width: 500
    };
    var _tab = new Tab(_tabOptions);
    var _splitterLayout2 = new SplitterLayout({
        width: '100%',
        height: '100%',
        orientation: "vertical",
        panels: [{ size: 200 }, { size: 300, content: _tab }]
    });
    //-------------------------------------------------------------------------------------------------------------
    var _dockPanelItems = [];
    var _header = {
        width: "100%",
        height: "25px",
        backgroundColor: "rgb(84, 88, 92)",
        dock: "top"
    };
    var _footer = {
        width: "100%",
        height: "20px",
        backgroundColor: "#eee",
        dock: "bottom"
    };
    var _content = {
        width: "100%",
        backgroundColor: "white",
        content: _splitterLayout2,
        dock: "left"
    };
    _dockPanelItems.push(_header);
    _dockPanelItems.push(_footer);
    _dockPanelItems.push(_content); //lastchild
    var _dockPanelOptions = {
        lastChildFill: true,
        items: _dockPanelItems
    };
    var _dockPanel = new DockPanel(_dockPanelOptions);
    _dockPanel.renderTo($("#content"));
});
//_splitterLayout2.renderTo($("#content"));
//_dataGrid.renderTo($("#content"));
//_panel.renderTo($("#content"));
//$(window).resize(function(){
//    console.log("resize : " + $("#testContent").height());
//});
