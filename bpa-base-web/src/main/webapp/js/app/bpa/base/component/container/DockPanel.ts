/**
 * Created by Yusuf on 5/8/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxdockpanel = require("jqxdockpanel");
import Component = require("bpa/base/component/Component");
import DockPanelOptions = require("bpa/base/component/container/DockPanelOptions");
import DockPanelItem = require("bpa/base/component/container/DockPanelItem");
import myresize = require("myresize");

class DockPanel extends Component{

    items: Array<DockPanelItem>;
    lastChildFill: boolean;

    dynamicChild: any;

    constructor(theOptions: DockPanelOptions) {
        super(theOptions);

        this.items = theOptions.items;

        jqxdockpanel;
        myresize;
    }

    renderTo(theContainer: any){

        this.element = $("<div id=\"" + this.id + "\" style=\"height: 100%; width: 100%; padding: 0; margin: 0; background-color: blue;\"><\/div>");
        this.element.appendTo(theContainer);

        var _totalHeight = 0;
        var _containerHeight = $(theContainer).height();

        this.items.forEach(item=>{
            var _childContainer = $("<div style='height: " + item.height + "px; width: " + item.width + "; background: " + item.backgroundColor + ";'><\/div>");

            if(item.dynamicHeight){
                this.dynamicChild = _childContainer;
            }else{
                _totalHeight += item.height;
            }

            if(item.dock != undefined && item.dock != null){
                _childContainer.attr('dock', item.dock);
            }

            _childContainer.appendTo(this.element);
            item.container = _childContainer;

            if(item.content != undefined && item.content != null){
                item.content.renderTo(_childContainer);
            }else if(item.htmlContent != undefined && item.htmlContent != null){
                item.htmlContent.appendTo(_childContainer);
            }

        });

        $(_this.dynamicChild).height(_containerHeight - _totalHeight);

        $(theContainer).resize(function(){
            var _containerHeight = $(theContainer).height();
            //console.log("theContainer height : " + _containerHeight);
            //console.log("dynamicChild height : " + $(_this.dynamicChild).height());
            $(_this.dynamicChild).height(_containerHeight - _totalHeight);
        });

        /*var _header = $("<div style='height: 30px; width: 100%; background: red;'><\/div>");
        var _footer = $("<div style='height: 30px; width: 100%; background: black;'><\/div>");

        var _content = $("<div id='testContent' style='width: 100%; background: green;'><\/div>");

        _header.appendTo(this.element);
        _footer.appendTo(this.element);

        _content.appendTo(this.element); //lastchild


        _header.attr('dock', 'top');
        _content.attr('dock', 'top');
        _footer.attr('dock', 'bottom');*/

       this.element.jqxDockPanel({ width: '100%', height: '100%', lastchildfill: this.lastChildFill});

    }
}

export = DockPanel;