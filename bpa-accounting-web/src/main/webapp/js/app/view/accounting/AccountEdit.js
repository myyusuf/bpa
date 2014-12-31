define(["bpaObservable", "component/accounting/DefaultBalanceComboBox", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, DefaultBalanceComboBox) {
	
	var AccountEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _editedAccount = _options.editedAccount || {};
		
		var _parentComboBoxUrl = _options.parentComboBoxUrl || BPA.Constant.accounting.accountParentUrl;
		var _defaultBalanceComboboxUrl = _options.defaultBalanceComboboxUrl || BPA.Constant.accounting.defaultBalanceUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedAccount.code != undefined && _editedAccount.code != null;
		
		var _randomId = BPA.Util.getRandomId("accountEdit");
        
		var _editWindow = $('<div id="accountEditWindow"></div>');
		var _windowHeader = "";
		if(_isEditForm){
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Chart of Account Edit</span></td></tr></table></div>');
		}else{
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">New Chart of Account</span></td></tr></table></div>');
		}
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		
		
		//Account Group Combo-----------------------------------------------
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _accountGroupLabel = $('<td style="width: 100px;">Account Group</td>');
		_accountGroupLabel.appendTo(_newRow);
		var _accountGroupInputColumn = $('<td style="width: 255px;"></td>');
		var _accountGroupInput = $('<div style="margin-top: 3px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_accountGroupInput.attr("id", "accountGroupInput" + _randomId);
		_accountGroupInput.appendTo(_accountGroupInputColumn);
		$('<span style="color: red; font-weight: bold; float: left; margin-top: 10px; margin-left: 4px;">*</span>').appendTo(_accountGroupInputColumn);
		_accountGroupInputColumn.appendTo(_newRow);
		
        var _accountGroupComboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: BPA.Constant.accounting.accountGroupUrl
        };
        var _accountGroupDataAdapter = new $.jqx.dataAdapter(_accountGroupComboSource,{
        	
            /*beforeLoadComplete: function (records) {
            	records.splice(0, 0, {code: '', name: '--Please Select--'});
                return records;
            }*/
        	
        });
        var _accountGroupComboBox = _accountGroupInput.jqxComboBox({ selectedIndex: 0, source: _accountGroupDataAdapter, displayMember: "code", valueMember: "code", width: 233, height: 21,
        	promptText: "Select Account Group...",
        	renderer: function (index, label, value) {
                var _item = _accountGroupDataAdapter.records[index];
                if (_item != null) {
                	var _label = '';
                	if(_item.code != ''){
                		_label = _item.code + " (" + _item.name + ")";
                	}else{
                		_label = _item.name;
                	}
                	return _label;
                }
                
                return '';
            },
            
            renderSelectedItem: function(index, item){
                var _item = _accountGroupDataAdapter.records[index];
                if (_item != null) {
                	
                	var _label = '';
                	if(_item.code != ''){
                		_label = _item.code + " (" + _item.name + ")";
                	}else{
                		_label = _item.name;
                	}
                	return _label;
                    
                }
                
                return '';   
            },
            theme: 'metro'
        });
        
        _accountGroupComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedAccount.accountGroup != undefined && _editedAccount.accountGroup != null){
        		var _selectedParentItem = _accountGroupComboBox.jqxComboBox('getItemByValue', _editedAccount.accountGroup.code);
            	_accountGroupComboBox.jqxComboBox('selectItem', _selectedParentItem);
        	}
        	
        	_editForm.jqxValidator('hide');
        	
        });
        
        _accountGroupComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _accountGroupInput.attr("id"));
	    });
        
        if(_isEditForm){
        	_accountGroupComboBox.jqxComboBox({ disabled: true }); 
        }
        
		//------------------------------------------------------
        
        
        //Parent Combo------------------------------------------------------
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _parentLabel = $('<td>Parent</td>');
		_parentLabel.appendTo(_newRow);
		var _parentInputColumn = $('<td></td>');
		var _parentInput = $('<div style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_parentInput.attr("id", "parentInput" + _randomId);
		_parentInput.appendTo(_parentInputColumn);
		$('<span style="color: red; font-weight: bold; float: left; margin-top: 10px; margin-left: 4px;">*</span>').appendTo(_parentInputColumn);
		_parentInputColumn.appendTo(_newRow);
		
        var _parentComboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: _parentComboBoxUrl
        };
        
        var _parentDataAdapter = {};
        /*var _parentDataAdapter = new $.jqx.dataAdapter(_parentComboSource,{
        	
        	formatData: function (data) {
                   data.selfAccountCode = data.code;
                   return data;
            }, 
            beforeLoadComplete: function (records) {
            	records.splice(0, 0, {code: '', name: '--Please Select--'});
                return records;
            }
        	
        });*/
        var _parentComboBox = _parentInput.jqxComboBox({ selectedIndex: 0, 
        	//source: _parentDataAdapter, 
        	displayMember: "code", valueMember: "code", 
        	width: 233, height: 21,
        	promptText: "Select Parent Account...",
        	renderer: function (index, label, value) {
                var _item = _parentDataAdapter.records[index];
                if (_item != null) {
                	var _label = '';
                	if(_item.code != ''){
                		_label = _item.code + " (" + _item.name + ")";
                	}else{
                		_label = _item.name;
                	}
                	return _label;
                }
                
                return '';
            },
            
            renderSelectedItem: function(index, item){
                var _item = _parentDataAdapter.records[index];
                if (_item != null) {
                	
                	var _label = '';
                	if(_item.code != ''){
                		_label = _item.code + " (" + _item.name + ")";
                	}else{
                		_label = _item.name;
                	}
                	return _label;
                    
                }
                
                return '';   
            },
            theme: 'metro'
        });
        
        _parentComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedAccount.parent != undefined && _editedAccount.parent != null){
        		var _selectedParentItem = _parentComboBox.jqxComboBox('getItemByValue', _editedAccount.parent.code);
            	_parentComboBox.jqxComboBox('selectItem', _selectedParentItem);
        	}
        	
        });
        
        _parentComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _parentInput.attr("id"));
	    });
        
        if(_isEditForm){
        	_parentComboBox.jqxComboBox({ disabled: true }); 
        }
        
		//------------------------------------------------------
        
        _accountGroupComboBox.bind('select', function(event){
			if (event.args){
				var _groupCode = event.args.item.value;
				if(_groupCode){
					_parentComboBox.jqxComboBox({ disabled: false});
					_parentComboSource.data = {groupCode: _groupCode, selfAccountCode: _editedAccount.code};
					_parentDataAdapter = new $.jqx.dataAdapter(_parentComboSource);
					_parentComboBox.jqxComboBox({source: _parentDataAdapter});
				}
			}
		});   
		
		
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _codeLabel = $('<td>Code</td>');
		_codeLabel.appendTo(_newRow);
		var _codeInputColumn = $('<td></td>');
		var _codeInput = $('<input type="text" class="text-input" maxlength="5" style="float: left;"/>');
		_codeInput.attr("id", "codeInput" + _randomId);
		if(_isEditForm){
			_codeInput.val(_editedAccount.code);
			_codeInput.jqxInput({disabled: true});
		}
		_codeInput.appendTo(_codeInputColumn);
		$('<span style="color: red; font-weight: bold; float: left; margin-top: 8px; margin-left: 4px;">*</span>').appendTo(_codeInputColumn);
		_codeInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _nameLabel = $('<td>Name</td>');
		_nameLabel.appendTo(_newRow);
		var _nameInputColumn = $('<td></td>');
		var _nameInput = $('<input type="text" class="text-input" maxlength="50" style="float: left;"/>');
		_nameInput.attr("id", "nameInput" + _randomId);
		if(_isEditForm){
			_nameInput.val(_editedAccount.name);
		}
		
		_nameInput.appendTo(_nameInputColumn);
		$('<span style="color: red; font-weight: bold; float: left; margin-top: 8px; margin-left: 4px;">*</span>').appendTo(_nameInputColumn);
		_nameInputColumn.appendTo(_newRow);
		
		
		//Default Balance------------------------------------------------------
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
        	
        	if(_editedAccount.defaultBalance != undefined && _editedAccount.defaultBalance != null){
        		var _selectedItem = _defaultBalanceComboBox.jqxComboBox('getItemByValue', _editedAccount.defaultBalance.code);
            	_defaultBalanceComboBox.jqxComboBox('selectItem', _selectedItem);
        	}
        	
        	//to close the validation message on combobox when form first loaded
        	_editForm.jqxValidator('hide');
        	
        });
        
        if(_isEditForm){
        	_defaultBalanceComboBox.jqxComboBox({ disabled: true }); 
        }
        
		//------------------------------------------------------
		
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _descriptionLabel = $('<td>Description</td>');
		_descriptionLabel.appendTo(_newRow);
		var _descriptionInputColumn = $('<td></td>');
		var _descriptionInput = $('<textarea rows="5" cols="30" maxlength="250"></textarea>');
		_descriptionInput.attr("id", "descriptionInput" + _randomId);
		if(_isEditForm){
			_descriptionInput.val(_editedAccount.description);
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
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 328, width: 394,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
        	_editWindow.jqxWindow('destroy');
        });
        
        _codeInput.jqxInput({ theme: 'metro' });
        _nameInput.jqxInput({ theme: 'metro' });
        _descriptionInput.jqxInput({ theme: 'metro', width: 235, height: 80 });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _codeInput.attr("id"), message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _nameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _accountGroupInput.attr("id"), message: 'Account Group is required', action: 'keyup, blur', 
                    	rule: function(input){
	                    	var _val = _accountGroupComboBox.jqxComboBox('val');
	                    	if(_val==""){
	                    		return false;
	                    	}
	                    	return true;
                    	}
                     },
                     { input: "#" + _parentInput.attr("id"), message: 'Parent Account is required', action: 'keyup, blur', 
                     	rule: function(input){
 	                    	var _val = _parentComboBox.jqxComboBox('val');
 	                    	if(_val==""){
 	                    		return false;
 	                    	}
 	                    	return true;
                     	}
                      }
                   
                   ]
        	});
        
        _editForm.on('validationSuccess', function (event) { 
        	_saveAccount();
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
        
        var _saveAccount = function(){
        	
        	var _accountGroupComboItem = _accountGroupComboBox.jqxComboBox('getSelectedItem');
        	var _parentComboItem = _parentComboBox.jqxComboBox('getSelectedItem');
        	var _defaultBalanceComboItem = _defaultBalanceComboBox.jqxComboBox('getSelectedItem');
        	
        	var _savedData = {};
        	_savedData.code = _codeInput.val();
        	_savedData.name = _nameInput.val();;
        	_savedData.description = _descriptionInput.val();
        	
        	_savedData.accountGroup = {};
        	_savedData.accountGroup.code = _accountGroupComboItem.value;
        	
        	_savedData.parent = {};
        	_savedData.parent.code = _parentComboItem.value;
        	
        	_savedData.defaultBalance = {};
        	_savedData.defaultBalance.code = _defaultBalanceComboItem.value;
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updateaccount");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewaccount");
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
	
	inheritPrototype(AccountEdit, Observable);

    return AccountEdit;
    
});

