/**
 * Created by Yusuf on 5/20/2015.
 */

import Form = require("bpa/base/component/input/Form");
import FormOptions = require("bpa/base/component/input/FormOptions");
import UserFormOptions = require("bpa/security/component/UserFormOptions");
import TextBox = require("bpa/base/component/input/TextBox");
import Label = require("bpa/base/component/Label");
import TableLayout = require("bpa/base/component/layout/TableLayout");
import User = require("bpa/security/model/User");

import UserGroupGrid = require("bpa/security/component/UserGroupGrid");
import SimplePanel = require("bpa/base/component/container/SimplePanel");

class UserForm extends Form{

    user: User;
    onValidationSuccess: any;

    constructor(theOptions: UserFormOptions){

        var _this = this;

        this.user = theOptions.user;
        this.onValidationSuccess = theOptions.onValidationSuccess;

        var _userIdLabel: Label = new Label({label: "User Id"});
        var _userIdTextBox: TextBox = new TextBox({name: 'userId', value: this.user.userId, isRequired: true, widthInPercentage: 90});
        var _firstNameLabel: Label = new Label({label: "First Name"});
        var _firstNameTextBox: TextBox = new TextBox({name: 'firstName', value: this.user.firstName, isRequired: true, widthInPercentage: 90});
        var _lastNameLabel: Label = new Label({label: "Last Name"});
        var _lastNameTextBox: TextBox = new TextBox({name: 'lastName', value: this.user.lastName, isRequired: false, widthInPercentage: 90});

        var _userGroupLabel: Label = new Label({label: "Group"});
        var _userGroupGrid: UserGroupGrid = new UserGroupGrid({name: 'userGroup'});

        var _simplePanel = new SimplePanel({content: _userGroupGrid});

        var _tableLayout: TableLayout = new TableLayout({
            classStyling: "edit-table",
            rows:[
                {
                    columns:[
                        {content: _userIdLabel, width: 85},
                        {content: _userIdTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _firstNameLabel},
                        {content: _firstNameTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _lastNameLabel},
                        {content: _lastNameTextBox}
                    ]
                },
                {
                    columns:[
                        {content: _userGroupLabel, height: 180},
                        {content: _simplePanel, height: 180}
                    ]
                }
            ]
        });

        var _formOptions: FormOptions = {
            items: [_userIdTextBox, _firstNameTextBox, _userGroupGrid],
            layout: _tableLayout,
            onValidationSuccess: _this.onValidationSuccess
        }

        super(_formOptions);
    }

}

export = UserForm;
