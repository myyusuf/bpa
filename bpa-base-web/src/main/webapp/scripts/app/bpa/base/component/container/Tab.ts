/**
 * Created by Yusuf on 5/9/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxtabs = require("jqxtabs");
import Component = require("bpa/base/component/Component");
import TabOptions = require("bpa/base/component/container/TabOptions");
import TabItem = require("bpa/base/component/container/TabItem");

class Tab extends Component{

    selectionTracker: boolean;
    items: Array<TabItem>;
    tempItems: Array<TabItem>;

    constructor(theOptions: TabOptions) {
        super(theOptions);

        this.selectionTracker = theOptions.selectionTracker;
        this.tempItems = theOptions.items;

        jqxtabs;
    }

    addTab(anTabItem: TabItem): void{
       /* var _tabItemTmp = new TabItem({caption: "test"});
        this.items.push(_tabItemTmp);

        var _positionIndex = this.element.jqxTabs('length');
        this.element.jqxTabs('addLast', tabCaption , tabId + "_content");
        this.element.jqxTabs('setContentAt', _positionIndex , '<div id="' + tabId + '" >Loading content...</div>');

        var _parentContainer = $('#' + tabId).parent();
        var _children = _parentContainer.children();
        for(var i=0; i<_children.length; i++){
            _children[i].remove();
        }*/

        //this.items.push(anTabItem);
        this.element.jqxTabs('addLast', "<div tabKey='" + anTabItem.tabKey +"'>" + anTabItem.caption + "<\/div>", "<div>[Content]<\/div>");

        var _tabLength = this.element.jqxTabs('length');

        var _contentDIV = $("#" + this.id + " .jqx-tabs-content-element")[_tabLength-1];
        var _children = $(_contentDIV).children();
        for(var i=0; i<_children.length; i++){
            _children[i].remove();
        }

        anTabItem.renderTo(_contentDIV);

    }

    selectTab(aTabKey: string): number{
        var _positionIndex = -1;

        for(var _index = 0; _index < this.element.jqxTabs('length'); _index++){

            var _contentDIV = $("#" + this.id + " .jqx-tabs-title")[_index];
            var _tabKey = $(_contentDIV).find("[tabKey]").attr("tabKey");

            if(_tabKey == aTabKey){
                _positionIndex = _index;
            }
        }

        if(_positionIndex > -1){
           this.element.jqxTabs('select', _positionIndex);
        }

        return _positionIndex;
    }

    renderTo(theContainer: any){

        this.element = $("<div style='border: 0;' id=\"" + this.id + "\"><\/div>");
        this.element.appendTo(theContainer);
        var _ul = $("<ul><\/ul>");
        _ul.appendTo(this.element);

        this.tempItems.forEach(item=>{

            var _li = $("<li><div tabKey='" + item.tabKey +"'>" + item.caption + "<\/div><\/li>");
            _li.appendTo(_ul);

        });

        this.tempItems.forEach(item=>{
            //var _childContainer = $("<div id=\""+ this.id + "_child_" + this.mainIndex +"\"><\/div>");
            var _childContainer = $("<div><\/div>");
            _childContainer.appendTo(this.element);
            //item.renderTo(_childContainer); must not render directly, instead please use initTabContent

        });

        //var _initTabContent = function(tabIndex: number){
        //    //_this.items[tabIndex].renderTo($("#"+ _this.id + "_child_" + tabIndex));
        //    var _contentDIV = $("#" + this.id + " .jqx-tabs-content-element")[tabIndex];
        //    _this.items[tabIndex].renderTo(_contentDIV);
        //}

        var _width: any = '100%';
        if(this.widthInPercentage != undefined){
            _width = this.widthInPercentage + '%';
        }
        if(this.width != undefined){
            _width = this.width;
        }

        var _height: any = '100%';
        if(this.heightInPercentage != undefined){
            _height = this.heightInPercentage + '%';
        }
        if(this.height != undefined){
            _height = this.height;
        }

        this.element = this.element.jqxTabs({width: _width, height: _height, theme: this.theme, position: 'top', showCloseButtons: true});

        this.tempItems.forEach(item=>{
            _this.element.jqxTabs('removeLast');
        });

        this.tempItems.forEach(item=>{
           _this.addTab(item);
        });

    }
}

export = Tab;
