/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import WindowPanel = require("bpa/base/component/container/WindowPanel");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Button = require("bpa/base/component/Button");
import SimplePanel = require("bpa/base/component/container/SimplePanel");

class EditWindow extends WindowPanel{

    onSaveButtonClick: any;
    onCancelButtonClick: any;

    constructor(theOptions: EditWindowOptions) {

        super(theOptions);

        this.onSaveButtonClick = theOptions.onSaveButtonClick;
        this.onCancelButtonClick = theOptions.onCancelButtonClick;
        this.content = theOptions.content;

    }

    buildContentContainer(theContent: Component) : Component{
         var _editWindowContent: EditWindowContent = this.buildEditWindowContent();
        return this.buildEditWindowContentContainer(_editWindowContent);
    }


    buildEditWindowContentContainer(theEditWindowContent: EditWindowContent) : Component{
        var _this = this;

        var _saveButton = new Button(
            {
                label: "Save",
                onClick: function(event){

                    if(theEditWindowContent.onSaveButtonClick != undefined){
                        theEditWindowContent.onSaveButtonClick();
                    }
                }
            });

        var _cancelButton = new Button(
            {
                label: "Cancel",
                onClick: function(event){
                    if(theEditWindowContent.onCancelButtonClick != undefined){
                        theEditWindowContent.onCancelButtonClick();
                    }
                }
            });

        var _buttonContainer: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {widthInPercentage: 98},
                        {content: _cancelButton, widthInPercentage: 1},
                        {content: _saveButton, widthInPercentage: 1},
                    ]
                }
            ]
        });

        var _tableLayout: TableLayout = new TableLayout({
            rows:[
                {
                    columns:[
                        {content: theEditWindowContent.content, width: 100},
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

    buildEditWindowContent() : EditWindowContent{
        return {content : new SimplePanel({})};
    }

}

export  = EditWindow;
