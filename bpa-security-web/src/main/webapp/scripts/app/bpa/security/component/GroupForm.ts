/**
 * Created by Yusuf on 5/20/2015.
 */

import Form = require("bpa/base/component/input/Form");
import FormOptions = require("bpa/base/component/input/FormOptions");
import GroupFormOptions = require("bpa/security/component/GroupFormOptions");
import TextBox = require("bpa/base/component/input/TextBox");
import Label = require("bpa/base/component/Label");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import Group = require("bpa/security/model/Group");

import SimplePanel = require("bpa/base/component/container/SimplePanel");

class GroupForm extends Form{

    group: Group;
    onValidationSuccess: any;

    _codeTextBox: TextBox;

    constructor(theOptions: GroupFormOptions){

        var _this = this;

        this.group = theOptions.group;
        this.onValidationSuccess = theOptions.onValidationSuccess;

        var _codeLabel: Label = new Label({label: "Code"});
        var _codeTextBox: TextBox = new TextBox({name: 'code', value: this.group.code, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});
        var _nameLabel: Label = new Label({label: "Name"});
        var _nameTextBox: TextBox = new TextBox({name: 'name', value: this.group.name, isRequired: true, minLength: 3, maxLength: 20, widthInPercentage: 90});
        var _descriptionLabel: Label = new Label({label: "Description"});
        var _descriptionTextBox: TextBox = new TextBox({name: 'description', value: this.group.description, maxLength: 150, widthInPercentage: 90});

        var _tableLayout: TableLayout = new TableLayout({
            classStyling: "edit-table",
            rows:[
                {
                    columns:[
                        {content: _codeLabel, width: 85},
                        {content: _codeTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _nameLabel},
                        {content: _nameTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _descriptionLabel},
                        {content: _descriptionTextBox}
                    ]
                }
            ]
        });

        var _formOptions: FormOptions = {
            items: [_codeTextBox, _nameTextBox, _descriptionTextBox],
            layout: _tableLayout,
            onValidationSuccess: _this.onValidationSuccess
        }

        super(_formOptions);

        _this._codeTextBox = _codeTextBox;
    }

    editMode(){
        this._codeTextBox.disable();
    }

    newMode(){
        this._codeTextBox.enable();
    }

}

export = GroupForm;
