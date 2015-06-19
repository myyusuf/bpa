/**
 * Created by Yusuf on 5/5/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import LabelOptions = require("bpa/base/component/LabelOptions");

class Label extends Component{

    label: String;

    constructor(theOptions: LabelOptions) {
        super(theOptions);

        this.label = theOptions.label;

    }

    renderTo(theContainer: any){

        this.element = $("<span>" + this.label + "<\/span>");
        this.element.appendTo(theContainer);

    }

}

export = Label;