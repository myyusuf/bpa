/**
 * Created by Yusuf on 5/14/2015.
 */

/// <reference path="ts/jquery.d.ts" />

import $ = require("jquery");
import Button = require("bpa/base/component/Button");
import SplitterLayout = require("bpa/base/component/layout/SplitterLayout");

import DockPanel = require("bpa/base/component/container/DockPanel");
import DockPanelItem = require("bpa/base/component/container/DockPanelItem");
import DockPanelOptions = require("bpa/base/component/container/DockPanelOptions");
import Tab = require("bpa/base/component/container/Tab");
import TabOptions = require("bpa/base/component/container/TabOptions");
import TabItem = require("bpa/base/component/container/TabItem");
import Menu = require("bpa/base/component/Menu");
import MenuOptions = require("bpa/base/component/MenuOptions");

import UserController = require("bpa/security/controller/UserController");
import UserList = require("bpa/security/component/UserList");

import GroupController = require("bpa/security/controller/GroupController");
import GroupList = require("bpa/security/component/GroupList");

import SimplePanel = require("bpa/base/component/container/SimplePanel");

var _userListClickListener = function(event){
    console.log("displaying userlist... : " + _content);

    //var _userList: UserList = new UserList({});
    //var _simplePanel = new SimplePanel({content: _userList});
    //_content.changeContent(_simplePanel);

    var _simplePanel = new SimplePanel({});
    _content.changeContent(_simplePanel);
    var _userController = new UserController();
    _userController.handleRequest("view", _simplePanel.element);
};

var _groupListClickListener = function(event){
    console.log("displaying grouplist... : " + _content);

    //var _groupList: GroupList = new GroupList({});
    //var _simplePanel = new SimplePanel({content: _groupList});
    //_content.changeContent(_simplePanel);

    var _simplePanel = new SimplePanel({});
    _content.changeContent(_simplePanel);
    var _groupController = new GroupController();
    _groupController.handleRequest("view", _simplePanel.element);
};

var _menuItems = [
    {
        "id": "1",
        "text": "User List",
        "parentid": "-1",
        "subMenuWidth": '250px',
        onClick: _userListClickListener
    },
    {
        "text": "Group List",
        "id": "2",
        "parentid": "-1",
        "subMenuWidth": '250px',
        onClick: _groupListClickListener
    }

];
var _menuOptions: MenuOptions = {
    items: _menuItems
};

var _menu = new Menu(_menuOptions);

var _dockPanelItems: Array<DockPanelItem> = [];
var _header: DockPanelItem = new DockPanelItem({
    width: "100%",
    height: 25,
    backgroundColor: "rgb(84, 88, 92)",
    htmlContent: $("<div style='color: white; font-family: Arial, sans-serif; font-size: 11px; padding: 6px; ' >Business Process Automation - Security Module<\/div>"),
    dock: "top"
});
var _header2: DockPanelItem = new DockPanelItem({
    width: "100%",
    height: 30,
    backgroundColor: "rgb(84, 88, 92)",
    content: _menu,
    dock: "top"
});
var _footer: DockPanelItem = new DockPanelItem({
    width: "100%",
    height: 20,
    backgroundColor: "#eee",
    htmlContent: $("<div style='color: black; font-family: Arial, sans-serif; font-size: 9px; padding: 6px; ' >Ready<\/div>"),
    dock: "bottom"
});

//var _simplePanel = new SimplePanel({});
var _content: DockPanelItem = new DockPanelItem({
    width: "100%",
    backgroundColor: "white",
    dynamicHeight: true,
    //content: _simplePanel,
    dock: "top"
});

_dockPanelItems.push(_header);
_dockPanelItems.push(_header2);
_dockPanelItems.push(_footer);
_dockPanelItems.push(_content); //lastchild

var _dockPanelOptions: DockPanelOptions = {
    lastChildFill: true,
    items: _dockPanelItems
}

var _dockPanel = new DockPanel(_dockPanelOptions);


_dockPanel.renderTo($("#content"));



