/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import WindowPanelOptions = require("bpa/base/component/container/WindowPanelOptions");
import SimplePanel = require("bpa/base/component/container/SimplePanel");
import jqxwindow = require("jqxwindow");
import Layout = require("bpa/base/component/layout/Layout");

class Window extends Component{
    title: string;
    contentContainer: Component;
    content: Component;

    titleIconUrl: string;

    constructor(theOptions: WindowPanelOptions) {
        super(theOptions);

        if(theOptions.title != undefined && theOptions.title != null){
            this.title = theOptions.title;
        }else{
            this.title = "";
        }
        //this.content = theOptions.content;

        if(theOptions.titleIconUrl != undefined && theOptions.titleIconUrl != null){
            this.titleIconUrl = theOptions.titleIconUrl;
        }else{
            this.titleIconUrl = "images/icons/bpa/base/application-dialog.png";
        }

        jqxwindow;
    }

    renderTo(theContainer: any){

        var _this = this;

        var _window = $("<div id=\"" + this.id + "\"><\/div>");

        var _windowHeader = $("<div style='height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;'>" +
            "<table>" +
            "   <tr>" +
            "       <td>" +
            "           <img src='" + this.titleIconUrl + "' style='margin-right: 1px' />" +
            "       </td>" +
            "       <td valign='center'>" +
            "           <span style='font-weight: bold'>" +
                            this.title +
            "           </span>" +
            "       </td>" +
            "   </tr>" +
            "</table>" +
            "</div>");

        var _windowContent = $("<div><\/div>");

        _windowHeader.appendTo(_window);
        _windowContent.appendTo(_window);

        this.element = _window;
        this.element.appendTo(theContainer);

        //Build Content

        this.content = this.buildContent();
        this.contentContainer = this.buildContentContainer(this.content);

        this.contentContainer.renderTo(_windowContent);

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

        this.element = this.element.jqxWindow({
            autoOpen: false,
            showCollapseButton: false,
            isModal: true,
            width: _width,
            height: _height,
            initContent: function () {
                _this.element.jqxWindow('focus');
            },
            theme: this.theme
        });
    }

    openWindow(): void{
        this.element.jqxWindow('open');
    }

    closeWindow(): void{
        this.element.jqxWindow('close');
    }

    buildContentContainer(theContent: Component) : Component{
        return new SimplePanel({content: theContent});
    }

    buildContent() : Component{
        return new SimplePanel({});
    }
}

export  = Window;
