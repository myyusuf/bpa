/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import WindowPanel = require("bpa/base/component/container/WindowPanel");
import ConfirmationWindowOptions = require("bpa/base/component/ConfirmationWindowOptions");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Button = require("bpa/base/component/Button");
import Label = require("bpa/base/component/Label");


class ConfirmationWindow extends WindowPanel{

    message: string;
    onOkButtonClick: any;
    onCancelButtonClick: any;

    constructor(theOptions: ConfirmationWindowOptions) {

        super({width: 400, height: 150});

        if(theOptions.title == undefined){
            this.title = "Confirmation"
        }
        this.titleIconUrl = "images/icons/bpa/base/exclamation-circle.png";
        this.message = theOptions.message;

        this.onOkButtonClick = theOptions.onOkButtonClick;
        this.onCancelButtonClick = theOptions.onCancelButtonClick;
        this.content = theOptions.content;

    }

    buildContentContainer(theContent: Component) : Component{

        var _this = this;

        var _okButton = new Button(
            {
                label: "OK",
                onClick: function(event){
                    _this.closeWindow();
                    if(_this.onOkButtonClick != undefined){
                        _this.onOkButtonClick();
                    }
                }
            });

        var _cancelButton = new Button(
            {
                label: "Cancel",
                onClick: function(event){

                    _this.closeWindow();
                    if(_this.onCancelButtonClick != undefined){
                        _this.onCancelButtonClick();
                    }
                }
            });

        var _buttonContainer: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {widthInPercentage: 98},
                        {content: _cancelButton, widthInPercentage: 1},
                        {content: _okButton, widthInPercentage: 1},
                    ]
                }
            ]
        });

        var _tableLayout: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {content: theContent, width: 100},
                    ]
                },
                {
                    columns:[
                        {content: _buttonContainer, width: 100}
                    ]
                }
            ]
        });

        return _tableLayout;
    }

    buildContent() : Component{
        return new Label({label: this.message});
    }

}

export = ConfirmationWindow;