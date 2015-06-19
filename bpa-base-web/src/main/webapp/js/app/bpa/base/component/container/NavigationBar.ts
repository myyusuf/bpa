/**
 * Created by Yusuf on 5/8/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxnavigationbar = require("jqxnavigationbar");
import Component = require("bpa/base/component/Component");
import NavigationBarOptions = require("bpa/base/component/container/NavigationbarOptions");
import NavigationBarItem = require("bpa/base/component/container/Navigationbaritem");

import myresize = require("myresize");

class NavigationBar extends Component{

    items: Array<NavigationBarItem>;

    constructor(theOptions: NavigationBarOptions) {
        super(theOptions);

        this.items = theOptions.items;

        jqxnavigationbar;
        myresize;
    }

    renderTo(theContainer: any){

        this.element = $("<div id='" + this.id +"'></div>");
        this.element.css("border", "0");
        this.element.css("margin-right", "-1px");
        this.element.css("margin-top", "-1px");

        this.items.forEach(item=>{
            var _itemLabelStr="";
            _itemLabelStr += "	<div>";
            _itemLabelStr += "		<div style='margin-top: 0px;'>";
            _itemLabelStr += "			<div style='float: left;'>";
            _itemLabelStr += "				<img alt='" + item.iconAlt + "' src='"+ item.iconUrl +"' \/>";
            _itemLabelStr += "			<\/div>";
            _itemLabelStr += "			<div style='margin-left: 4px; float: left;'>" + item.label + "<\/div>";
            _itemLabelStr += "		<\/div>";
            _itemLabelStr += "	<\/div>";

            var _itemLabel = $(_itemLabelStr);
            var _itemContent = $("<div><\/div>");

            _itemLabel.appendTo(this.element);
            _itemContent.appendTo(this.element);

            if(item.content != undefined && item.content != null){
                item.content.renderTo(_itemContent);
            }

        });

        this.element.appendTo(theContainer);

        //needed for navigation bar to fit the container's height (possibly bugs)
        $(theContainer).resize(function(){
            //console.log("theContainer height : " + $(theContainer).height());
        });

        var _width: any = 'auto';
        if(this.widthInPercentage != undefined){
            _width = this.widthInPercentage + '%';
        }
        if(this.width != undefined){
            _width = this.width;
        }


        var _height: any = 'auto';
        if(this.heightInPercentage != undefined){
            _height = this.heightInPercentage + '%';
        }
        if(this.height != undefined){
            _height = this.height;
        }

        this.element.jqxNavigationBar({ width: _width, height: _height, expandMode: "singleFitHeight", theme: this.theme});

    }
}

export = NavigationBar;
