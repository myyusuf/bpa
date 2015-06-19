/**
 * Created by Yusuf on 5/9/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxtree = require("jqxtree");
import Component = require("bpa/base/component/Component");
import TreeOptions = require("bpa/base/component/TreeOptions");
import TreeItem = require("bpa/base/component/TreeItem");
import SelectTreeItemEventListener = require("bpa/base/component/event/SelectTreeItemEventListener");

class Tree extends Component{

    items: Array<TreeItem>;
    onSelectItem: SelectTreeItemEventListener;
    showBorder: boolean;

    constructor(theOptions: TreeOptions) {
        super(theOptions);

        this.items = theOptions.items;
        this.onSelectItem = theOptions.onSelectItem;
        this.showBorder = theOptions.showBorder;

        jqxtree;
    }

    setOnSelectItem(anOnSelectItem: SelectTreeItemEventListener){
        this.onSelectItem = anOnSelectItem;
    }

    renderTo(theContainer: any){

        this.element = $("<div id=\"" + this.id + "\"><\/div>");

        if(this.showBorder != undefined && this.showBorder != null){
            if(!this.showBorder){
                this.element.css("border", "0");
            }
        }
        this.element.appendTo(theContainer);

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

        this.element.jqxTree({ source: this.items, width: _width, height: _height, theme: this.theme});

        var _select = (event: any)=>{
            var _args = event.args;
            var _item = this.element.jqxTree('getItem', _args.element);
            var _label = _item.label;
            var _value = _item.value;

            this.onSelectItem(_item, _label, _value);
        }
        this.element.on('select', _select);
    }
}

export = Tree;
