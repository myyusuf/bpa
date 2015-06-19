/**
 * Created by Yusuf on 6/15/2015.
 */

/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import WindowPanel = require("bpa/base/component/container/WindowPanel");
import ConfirmationWindowOptions = require("bpa/base/component/ConfirmationWindowOptions");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Button = require("bpa/base/component/Button");
import Label = require("bpa/base/component/Label");


class AlertWindow extends WindowPanel{

    message: string;
    onCloseButtonClick: any;

    constructor(theOptions: ConfirmationWindowOptions) {

        super({width: 400, height: 150});

        if(theOptions.title == undefined){
            this.title = "Alert"
        }
        this.titleIconUrl = "images/icons/bpa/base/error.png";
        this.message = theOptions.message;

    }

    buildContentContainer(theContent: Component) : Component{

        var _this = this;

        var _closeButton = new Button(
            {
                label: "Close",
                onClick: function(event){

                    _this.closeWindow();
                    if(_this.onCloseButtonClick != undefined){
                        _this.onCloseButtonClick();
                    }
                }
            });

        var _buttonContainer: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {widthInPercentage: 99},
                        {content: _closeButton, widthInPercentage: 1},
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

export = AlertWindow;
