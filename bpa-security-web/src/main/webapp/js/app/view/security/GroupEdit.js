define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm) {
	
	var GroupEdit = function(container, group){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(group.id){
			_isEditForm = true;
			_options.caption = "Edit Group";
		}else{
			_options.caption = "Add New Group";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "workflowGroupEdit";
		
		_options.formFields = [{name: "id", label: "Id", value: group.id, isKey: true, required: true, maxLength: 30},
		                       {name: "name", label: "Name", value: group.name, required: true, maxLength: 100}
		                       ];
		
		_options.validationRules = [
                { fieldName: "id", message: 'Id is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "name", message: 'Name is required', action: 'keyup, blur', rule: 'required' }
               ];
		
		_options.width = 320;
		_options.height = 145;

		
		var _simpleEditForm = new SimpleEditForm(container, _options);
		
		var _onSaveForm = function(data){
			if(_isEditForm){
        		Observable.prototype.publish.call(_self, data, "onSaveGroup");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewGroup");
        	}
		}
		_simpleEditForm.subscribe(_onSaveForm, "onSaveForm");
		
		
/*        
		var _editWindow = $('<div id="workflow_groupEditWindow"></div>');
		var _windowHeader = "";
		if(_isEditForm){
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Account Group Edit</span></td></tr></table></div>');
		}else{
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">New Account Group</span></td></tr></table></div>');
		}
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _groupIdLabel = $('<td>Group Id</td>');
		_groupIdLabel.appendTo(_newRow);
		var _groupIdInputColumn = $('<td></td>');
		var _groupIdInput = $('<input type="text" class="text-input" maxlength="8" style="width: 233px; float: left;"/>');
		_groupIdInput.attr("id", "groupIdInput" + _randomId);
		
		if(_isEditForm){
			_groupIdInput.val(_editedGroup.groupId);
			_groupIdInput.jqxInput({disabled: true});
		}
		_groupIdInput.appendTo(_groupIdInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_groupIdInputColumn);
		_groupIdInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _passwordLabel = $('<td>Password</td>');
		_passwordLabel.appendTo(_newRow);
		var _passwordInputColumn = $('<td></td>');
		var _passwordInput = $('<input type="text" class="text-input" maxlength="20" style="width: 233px; float: left;"/>');
		_passwordInput.attr("id", "passwordInput" + _randomId);
		if(_isEditForm){
			_passwordInput.val(_editedGroup.password);
		}
		_passwordInput.appendTo(_passwordInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_passwordInputColumn);
		_passwordInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _firstNameLabel = $('<td>First Name</td>');
		_firstNameLabel.appendTo(_newRow);
		var _firstNameInputColumn = $('<td></td>');
		var _firstNameInput = $('<input type="text" class="text-input" maxlength="30" style="width: 233px; float: left;"/>');
		_firstNameInput.attr("id", "firstNameInput" + _randomId);
		if(_isEditForm){
			_firstNameInput.val(_editedGroup.firstName);
		}
		_firstNameInput.appendTo(_firstNameInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_firstNameInputColumn);
		_firstNameInputColumn.appendTo(_newRow);
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _lastNameLabel = $('<td>Last Name</td>');
		_lastNameLabel.appendTo(_newRow);
		var _lastNameInputColumn = $('<td></td>');
		var _lastNameInput = $('<input type="text" class="text-input" maxlength="30" style="width: 233px;"/>');
		_lastNameInput.attr("id", "lastNameInput" + _randomId);
		if(_isEditForm){
			_lastNameInput.val(_editedGroup.lastName);
		}
		_lastNameInput.appendTo(_lastNameInputColumn);
		_lastNameInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _emailLabel = $('<td>Email</td>');
		_emailLabel.appendTo(_newRow);
		var _emailInputColumn = $('<td></td>');
		var _emailInput = $('<input type="text" class="text-input" maxlength="30" style="width: 233px; float: left;"/>');
		_emailInput.attr("id", "emailInput" + _randomId);
		if(_isEditForm){
			_emailInput.val(_editedGroup.email);
		}
		_emailInput.appendTo(_emailInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_emailInputColumn);
		_emailInputColumn.appendTo(_newRow);
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		
		var _saveButtonLabel = $('<td></td>');
		_saveButtonLabel.appendTo(_newRow);
		var _buttonColumn = $('<td colspan="2"></td>');
		var _saveButton = $('<input type="button" value="Save" style="margin-right: 5px; margin-top: 5px;"/>');
		_saveButton.appendTo(_buttonColumn);
		
		var _cancelButton = $('<input type="button" value="Cancel"/>');
		_cancelButton.appendTo(_buttonColumn);
		
		_buttonColumn.appendTo(_newRow);
		
		_windowHeader.appendTo(_editWindow);
		_windowContent.appendTo(_editWindow);
        _editWindow.appendTo(container);
        
        _editWindow.jqxWindow('resizable', true);
        _editWindow.jqxWindow('draggable', true);
        
        _editWindow.jqxWindow({
        	autoOpen: false,
            showCollapseButton: false, 
            isModal: true,
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 236, width: 346,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
        	_editWindow.jqxWindow('destroy');
        });
        
        _groupIdInput.jqxInput({ theme: 'metro' });
        _passwordInput.jqxInput({ theme: 'metro' });
        _firstNameInput.jqxInput({ theme: 'metro' });
        _lastNameInput.jqxInput({ theme: 'metro' });
        _emailInput.jqxInput({ theme: 'metro' });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _groupIdInput.attr("id"), message: 'Group Id is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _passwordInput.attr("id"), message: 'Password is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _firstNameInput.attr("id"), message: 'First Name is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _emailInput.attr("id"), message: 'Email is required', action: 'keyup, blur', rule: 'required' }
                   
                   ]
        	});
        
        _editForm.on('validationSuccess', function (event) { 
        	_saveGroup();
        }); 
        
        _saveButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        _cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        
        _saveButton.click(function(event){
        	_editForm.jqxValidator('validate');
		});
        
        _cancelButton.click(function(event){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        });
        
        var _saveGroup = function(){
        	
        	var _savedData = {};
        	
        	if(_isEditForm){
        		_savedData.groupId = _editedGroup.groupId;
        	}else{
        		_savedData.groupId = _groupIdInput.val().replace(/-/g, "");
        	}
        	_savedData.password = _passwordInput.val();
        	_savedData.firstName = _firstNameInput.val();
        	_savedData.lastName = _lastNameInput.val();
        	_savedData.email = _emailInput.val();
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updategroup");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewgroup");
        	}
        }
        
        this.open = function(){
        	_editWindow.jqxWindow('open');
        }
        
        this.close = function(){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        }*/
		
		this.open = function(){
			_simpleEditForm.open();
        }
        
        this.close = function(){
        	_simpleEditForm.close();
        }
        
	}
	
	inheritPrototype(GroupEdit, Observable);

    return GroupEdit;
    
});

