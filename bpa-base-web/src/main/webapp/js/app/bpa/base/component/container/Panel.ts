/**
 * Created by Yusuf on 5/8/2015.
 */

import $ = require("jquery");
import jqxpanel = require("jqxpanel");
import Component = require("bpa/base/component/Component");
import PanelOptions = require("bpa/base/component/container/PanelOptions");

class Panel extends Component{

    caption: string;

    content: Component;

    constructor(theOptions: PanelOptions) {
        super(theOptions);

        this.content = theOptions.content;
        this.caption = theOptions.caption;

        jqxpanel;
    }

    renderTo(theContainer: any){

        var _body = $("<div id=\"" + this.id + "\" style=\"border: 1px solid #f0f0f0;\"><\/div>");
        this.element = _body;
        this.element.appendTo(theContainer);

        var _section = $("<div style=\"border: 0;\"><\/div>");
        var _sectionContainer = $("<div><\/div>");
        _sectionContainer.appendTo(_section);

        if(this.caption != undefined && this.caption != null){
            var _header = $("<div style=\"background-color: #f0f0f0; height: 18px; padding: 8px;\"><span style=\"font-weight: bold;\">" + this.caption +"<\/span><\/div>");
            _header.appendTo(_body);
        }

        _section.appendTo(_body);

        var _width: any = 'auto';
        if(this.width != undefined){
            _width = this.width;
        }

        var _height: any = 'auto';
        if(this.height != undefined){
            _height = this.height;
        }

        _section =_section.jqxPanel({width: _width, height: _height,theme: this.theme});
        if(this.content != undefined && this.content != null){
            this.content.renderTo(_sectionContainer);
        }

    }
}

export = Panel;