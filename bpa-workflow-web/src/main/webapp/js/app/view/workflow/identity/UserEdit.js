define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var UserEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _editedUser = _options.editedUser || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedUser.userId != undefined && _editedUser.userId != null;
		
		var _randomId = BPA.Util.getRandomId("userEdit");
        
		var _editWindow = $('<div id="userEditWindow"></div>');
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
		var _userIdLabel = $('<td>User Id</td>');
		_userIdLabel.appendTo(_newRow);
		var _userIdInputColumn = $('<td></td>');
		var _userIdInput = $('<input type="text" class="text-input" maxlength="8" />');
		_userIdInput.attr("id", "userIdInput" + _randomId);
		
		if(_isEditForm){
			_userIdInput.val(_editedUser.userId);
			_userIdInput.jqxInput({disabled: true});
		}
		_userIdInput.appendTo(_userIdInputColumn);
		_userIdInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _nameLabel = $('<td>Name</td>');
		_nameLabel.appendTo(_newRow);
		var _nameInputColumn = $('<td></td>');
		var _nameInput = $('<input type="text" class="text-input" maxlength="50" />');
		_nameInput.attr("id", "nameInput" + _randomId);
		if(_isEditForm){
			_nameInput.val(_editedUser.name);
		}
		
		_nameInput.appendTo(_nameInputColumn);
		_nameInputColumn.appendTo(_newRow);
		//------------------------------------------------------
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _defaultBalanceLabel = $('<td>Default Balance</td>');
		_defaultBalanceLabel.appendTo(_newRow);
		var _defaultBalanceInputColumn = $('<td></td>');
		var _defaultBalanceInput = $('<div style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px;"></div>');
		_defaultBalanceInput.attr("id", "defaultBalanceInput" + _randomId);
		_defaultBalanceInput.appendTo(_defaultBalanceInputColumn);
		_defaultBalanceInputColumn.appendTo(_newRow);
		
		var _defaultBalanceComboBox = new DefaultBalanceComboBox(_defaultBalanceInput,{});
        
        _defaultBalanceComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedUser.defaultBalance != undefined && _editedUser.defaultBalance != null){
        		var _selectedItem = _defaultBalanceComboBox.jqxComboBox('getItemByValue', _editedUser.defaultBalance.userId);
            	_defaultBalanceComboBox.jqxComboBox('selectItem', _selectedItem);
        	}
        	
        	//to close the validation message on combobox when form first loaded
        	_editForm.jqxValidator('hide');
        	
        });
        
		//------------------------------------------------------
		
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
        
        _userIdInput.jqxInput({ theme: 'metro' });
        _nameInput.jqxInput({ theme: 'metro' });
        _descriptionInput.jqxInput({ theme: 'metro', width: 235, height: 80 });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _userIdInput.attr("id"), message: 'User Id is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _nameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _defaultBalanceInput.attr("id"), message: 'Default balance is required', action: 'keyup, blur', 
                    	rule: function(input){
	                    	var _val = _defaultBalanceComboBox.jqxComboBox('val');
	                    	if(_val==""){
	                    		return false;
	                    	}
	                    	return true;
                    	}
                     }
                   
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
        		_savedData.userId = _editedUser.userId;
        	}else{
        		_savedData.userId = _userIdInput.val().replace(/-/g, "");
        	}
        	_savedData.name = _nameInput.val();
        	_savedData.description = _descriptionInput.val();
        	_savedData.defaultBalance = {};
        	_savedData.defaultBalance.userId = _item.value;
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updateaccountgroup");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewaccountgroup");
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

