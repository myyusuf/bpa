define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var UserEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _editedUser = _options.editedUser || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedUser.code != undefined && _editedUser.code != null;
		
		var _randomId = BPA.Util.getRandomId("userEdit");
        
		var _editWindow = $('<div id="userEditWindow"></div>');
		var _windowHeader = "";
		if(_isEditForm){
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">User Edit</span></td></tr></table></div>');
		}else{
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">New User</span></td></tr></table></div>');
		}
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _usernameLabel = $('<td>Username</td>');
		_usernameLabel.appendTo(_newRow);
		var _usernameInputColumn = $('<td></td>');
		var _usernameInput = $('<input type="text" class="text-input" maxlength="15" />');
		_usernameInput.attr("id", "usernameInput" + _randomId);
		
		if(_isEditForm){
			_usernameInput.val(_editedUser.username);
			_usernameInput.jqxInput({disabled: true});
		}
		_usernameInput.appendTo(_usernameInputColumn);
		_usernameInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _firstNameLabel = $('<td>First Name</td>');
		_firstNameLabel.appendTo(_newRow);
		var _firstNameInputColumn = $('<td></td>');
		var _firstNameInput = $('<input type="text" class="text-input" maxlength="50" />');
		_firstNameInput.attr("id", "firstNameInput" + _randomId);
		if(_isEditForm){
			_firstNameInput.val(_editedUser.firstName);
		}
		
		_firstNameInput.appendTo(_firstNameInputColumn);
		_firstNameInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _lastNameLabel = $('<td>Last Name</td>');
		_lastNameLabel.appendTo(_newRow);
		var _lastNameInputColumn = $('<td></td>');
		var _lastNameInput = $('<input type="text" class="text-input" maxlength="50" />');
		_lastNameInput.attr("id", "lastNameInput" + _randomId);
		if(_isEditForm){
			_lastNameInput.val(_editedUser.lastName);
		}
		
		_lastNameInput.appendTo(_lastNameInputColumn);
		_lastNameInputColumn.appendTo(_newRow);

		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _descriptionLabel = $('<td>Description</td>');
		_descriptionLabel.appendTo(_newRow);
		var _descriptionInputColumn = $('<td></td>');
		var _descriptionInput = $('<textarea rows="5" cols="30" maxlength="250"></textarea>');
		_descriptionInput.attr("id", "descriptionInput" + _randomId);
		if(_isEditForm){
			_descriptionInput.val(_editedUser.description);
		}
		_descriptionInput.appendTo(_descriptionInputColumn);
		_descriptionInputColumn.appendTo(_newRow);
		
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
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 270, width: 375,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
        	_editWindow.jqxWindow('destroy');
        });
        
        _usernameInput.jqxInput({ theme: 'metro' });
        _firstNameInput.jqxInput({ theme: 'metro' });
        _lastNameInput.jqxInput({ theme: 'metro' });
        _descriptionInput.jqxInput({ theme: 'metro', width: 235, height: 80 });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _usernameInput.attr("id"), message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _firstNameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _lastNameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' }
                   ]
        	});
        
        _editForm.on('validationSuccess', function (event) { 
        	_saveUser();
        }); 
        
    	_defaultBalanceComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _defaultBalanceInput.attr("id"));
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
        
        var _saveUser = function(){
        	
        	var _item = _defaultBalanceComboBox.jqxComboBox('getSelectedItem');
        	
        	var _savedData = {};
        	
        	if(_isEditForm){
        		_savedData.username = _editedUser.username;
        	}else{
        		_savedData.username = _usernameInput.val();
        	}
        	_savedData.firstName = _firstNameInput.val();
        	_savedData.lastName = _lastNameInput.val();
        	_savedData.description = _descriptionInput.val();
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updateuser");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewuser");
        	}
        }
        
        this.open = function(){
        	_editWindow.jqxWindow('open');
        }
        
        this.close = function(){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        }
        
	}
	
	inheritPrototype(UserEdit, Observable);

    return UserEdit;
    
});

