/**
 * Created by Yusuf on 5/9/2015.
 */
/// <reference path="../../../ts/jquery.d.ts" />

import $ = require("jquery");
import Component = require("bpa/base/component/Component");
import EditWindow = require("bpa/base/component/container/EditWindow");
import EditWindowOptions = require("bpa/base/component/container/EditWindowOptions");
import GroupForm = require("bpa/security/component/GroupForm");
import Button = require("bpa/base/component/Button");
import Group = require("bpa/security/model/Group");
import OnSaveGroupListener = require("bpa/security/component/event/OnSaveGroupListener");
import EditWindowContent = require("bpa/base/component/container/EditWindowContent");

class GroupEditWindow extends EditWindow{

    onSaveGroupListener: OnSaveGroupListener;
    group: Group;

    constructor(group: Group, theOnSaveGroupListener: OnSaveGroupListener) {

        super({width: 300, height: 180});

        var _this = this;

        _this.group = group;

        if(_this.isEditMode()){
            _this.title = "Edit Group";
        }else{
            _this.title = "Add Group";
        }

        _this.onSaveGroupListener = theOnSaveGroupListener;
        
    }

    buildEditWindowContent() : EditWindowContent{

        var _this = this;
        var _groupForm: GroupForm = new GroupForm({group: this.group, onValidationSuccess: function(){
            _this.onSaveGroupListener(_groupForm.getValue());
        }});

        if(_this.isEditMode()){
            _groupForm.editMode();
        }else{
            _groupForm.newMode();
        }

        return {content : _groupForm,
            onSaveButtonClick : function(){
                _groupForm.validate();
            },
            onCancelButtonClick: function(){
                _this.closeWindow();
            }
        };
    }

    isEditMode(){
        if(this.group != undefined && this.group != null && this.group.code != null && this.group.code != ""){
            return true;
        }else{
            return false;
        }
    }

}

export  = GroupEditWindow;
