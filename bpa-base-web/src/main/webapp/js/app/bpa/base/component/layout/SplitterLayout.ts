/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxsplitter = require("jqxsplitter");
import Component = require("bpa/base/component/Component");
import SplitterLayoutOptions = require("bpa/base/component/layout/SplitterLayoutOptions");
import SplitterLayoutPanel = require("bpa/base/component/layout/SplitterLayoutPanel");

class SplitterLayout extends Component{
    static DEFAULT_ORIENTATION: string = "vertical";
    orientation: string;
    panels:Array<SplitterLayoutPanel>;

    constructor(theOptions: SplitterLayoutOptions) {
        super(theOptions);

        this.panels = theOptions.panels;

        if(theOptions.orientation != undefined && theOptions.orientation != null && theOptions.orientation != ""){
            this.orientation = theOptions.orientation;
        }else{
            this.orientation = SplitterLayout.DEFAULT_ORIENTATION;
        }

        jqxsplitter;
    }

    renderTo(theContainer: any){

        var _mainPanel = $("<div><\/div>");
        var _childPanel = "";

        this.element = _mainPanel;
        this.element.appendTo(theContainer);

        this.panels.forEach(panel=>{
            var _childPanel = $("<div><\/div>");
            _childPanel.appendTo(_mainPanel);

            if(panel.content != undefined && panel.content != null){
                panel.content.renderTo(_childPanel);
            }

        });

        var _panelsOptions = [];
        this.panels.forEach(panel=>{
            _panelsOptions.push({
                size: panel.size,
                collapsible: panel.collapsible,
                collapsed: panel.collapsed,
                min: panel.min
            });
        });

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

        this.element = this.element.jqxSplitter({ theme: this.theme, width: _width, height: _height, panels: _panelsOptions, orientation: this.orientation });

    }

}

export = SplitterLayout;
