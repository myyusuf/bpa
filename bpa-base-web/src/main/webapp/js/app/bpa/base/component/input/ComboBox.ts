/**
 * Created by Yusuf on 5/23/2015.
 */

/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import jqxcombobox = require("jqxcombobox");
import Component = require("bpa/base/component/Component");
import ComboBoxOptions = require("bpa/base/component/input/ComboBoxOptions");
import DataAdapter = require("bpa/base/data/DataAdapter");

class ComboBox extends Component{

    dataAdapter: DataAdapter;
    displayMember: string;
    valueMember: string;

    constructor(theOptions: ComboBoxOptions) {
        super(theOptions);

        this.dataAdapter = theOptions.dataAdapter;
        this.valueMember = theOptions.valueMember;
        this.displayMember = theOptions.displayMember;

        jqxcombobox;
    }

    renderTo(theContainer: any){
        this.element = $("<div id=\"" + this.id + "\"><\/div>");
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

        this.element = this.element.jqxComboBox({
            source: this.dataAdapter.get(),
            displayMember: this.displayMember,
            valueMember: this.valueMember,
            width: _width,
            height: _height,
            theme: this.theme});
    }
}

export = ComboBox;
