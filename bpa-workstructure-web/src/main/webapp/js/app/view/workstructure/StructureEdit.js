define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var StructureEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _editedStructure = _options.editedStructure || {};
		
		var _employeeComboBoxUrl = BPA.Constant.workstructure.employeesUrl;
		var _positionComboboxUrl =  BPA.Constant.workstructure.positionsUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedStructure.code != undefined && _editedStructure.code != null;
		
		var _randomId = BPA.Util.getRandomId("workstructureStructureEdit");
        
		var _editWindow = $('<div id="editWindow_' + _randomId +'"></div>');
		var _windowHeader = "";
		if(_isEditForm){
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Structure Edit</span></td></tr></table></div>');
		}else{
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">New Structure</span></td></tr></table></div>');
		}
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		
		
		//Structure Group Combo-----------------------------------------------
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _structureGroupLabel = $('<td style="width: 100px;">Structure Group</td>');
		_structureGroupLabel.appendTo(_newRow);
		var _structureGroupInputColumn = $('<td style="width: 255px;"></td>');
		var _structureGroupInput = $('<div style="margin-top: 3px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_structureGroupInput.attr("id", "structureGroupInput" + _randomId);
		_structureGroupInput.appendTo(_structureGroupInputColumn);
		$('<span style="color: red; font-weight: bold; float: left; margin-top: 10px; margin-left: 4px;">*</span>').appendTo(_structureGroupInputColumn);
		_structureGroupInputColumn.appendTo(_newRow);
		
        var _structureGroupComboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: BPA.Constant.structureing.structureGroupUrl
        };
        var _structureGroupDataAdapter = new $.jqx.dataAdapter(_structureGroupComboSource,{
        	
            /*beforeLoadComplete: function (records) {
            	records.splice(0, 0, {code: '', name: '--Please Select--'});
                return records;
            }*/
        	
        });
        var _structureGroupComboBox = _structureGroupInput.jqxComboBox({ selectedIndex: 0, source: _structureGroupDataAdapter, displayMember: "code", valueMember: "code", width: 233, height: 21,
        	promptText: "Select Structure Group...",
        	renderer: function (index, label, value) {
                var _item = _structureGroupDataAdapter.records[index];
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
                var _item = _structureGroupDataAdapter.records[index];
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
        
        _structureGroupComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedStructure.structureGroup != undefined && _editedStructure.structureGroup != null){
        		var _selectedParentItem = _structureGroupComboBox.jqxComboBox('getItemByValue', _editedStructure.structureGroup.code);
            	_structureGroupComboBox.jqxComboBox('selectItem', _selectedParentItem);
        	}
        	
        	_editForm.jqxValidator('hide');
        	
        });
        
        _structureGroupComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _structureGroupInput.attr("id"));
	    });
        
        if(_isEditForm){
        	_structureGroupComboBox.jqxComboBox({ disabled: true }); 
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
                   data.selfStructureCode = data.code;
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
        	promptText: "Select Parent Structure...",
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
        	
        	if(_editedStructure.parent != undefined && _editedStructure.parent != null){
        		var _selectedParentItem = _parentComboBox.jqxComboBox('getItemByValue', _editedStructure.parent.code);
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
        
        _structureGroupComboBox.bind('change', function(event){
			if (event.args){
				var _groupCode = event.args.item.value;
				if(_groupCode){
					_parentComboSource.data = {groupCode: _groupCode, selfStructureCode: _editedStructure.code};
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
		var _codeInput = $('<input type="text" class="text-input" maxlength="8" style="width: 233px; float: left;"/>');
		_codeInput.attr("id", "codeInput" + _randomId);
		if(_isEditForm){
			_codeInput.val(_editedStructure.code);
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
		var _nameInput = $('<input type="text" class="text-input" maxlength="50" style="width: 233px; float: left;"/>');
		_nameInput.attr("id", "nameInput" + _randomId);
		if(_isEditForm){
			_nameInput.val(_editedStructure.name);
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
		var _defaultBalanceInput = $('<div style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_defaultBalanceInput.attr("id", "defaultBalanceInput" + _randomId);
		_defaultBalanceInput.appendTo(_defaultBalanceInputColumn);
		$('<span style="color: red; font-weight: bold; float: left; margin-top: 10px; margin-left: 4px;">*</span>').appendTo(_defaultBalanceInputColumn);
		_defaultBalanceInputColumn.appendTo(_newRow);
		
		var _defaultBalanceComboBox = new DefaultBalanceComboBox(_defaultBalanceInput,{});
        
        _defaultBalanceComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedStructure.defaultBalance != undefined && _editedStructure.defaultBalance != null){
        		var _selectedItem = _defaultBalanceComboBox.jqxComboBox('getItemByValue', _editedStructure.defaultBalance.code);
            	_defaultBalanceComboBox.jqxComboBox('selectItem', _selectedItem);
        	}
        	
        	//to close the validation message on combobox when form first loaded
        	_editForm.jqxValidator('hide');
        	
        });
        
        if(_isEditForm){
        	_defaultBalanceComboBox.jqxComboBox({ disabled: true }); 
        }
        
        _defaultBalanceComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _defaultBalanceInput.attr("id"));
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
			_descriptionInput.val(_editedStructure.description);
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
                    { input: "#" + _structureGroupInput.attr("id"), message: 'Structure Group is required', action: 'keyup, blur', 
                    	rule: function(input){
	                    	var _val = _structureGroupComboBox.jqxComboBox('val');
	                    	if(_val==""){
	                    		return false;
	                    	}
	                    	return true;
                    	}
                     },
                     { input: "#" + _parentInput.attr("id"), message: 'Parent Structure is required', action: 'keyup, blur', 
                     	rule: function(input){
 	                    	var _val = _parentComboBox.jqxComboBox('val');
 	                    	if(_val==""){
 	                    		return false;
 	                    	}
 	                    	return true;
                     	}
                      },
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
        	_saveStructure();
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
        
        var _saveStructure = function(){
        	
        	var _structureGroupComboItem = _structureGroupComboBox.jqxComboBox('getSelectedItem');
        	var _parentComboItem = _parentComboBox.jqxComboBox('getSelectedItem');
        	var _defaultBalanceComboItem = _defaultBalanceComboBox.jqxComboBox('getSelectedItem');
        	
        	var _savedData = {};
        	_savedData.code = _codeInput.val();
        	_savedData.name = _nameInput.val();;
        	_savedData.description = _descriptionInput.val();
        	
        	_savedData.structureGroup = {};
        	_savedData.structureGroup.code = _structureGroupComboItem.value;
        	
        	_savedData.parent = {};
        	_savedData.parent.code = _parentComboItem.value;
        	
        	_savedData.defaultBalance = {};
        	_savedData.defaultBalance.code = _defaultBalanceComboItem.value;
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updatestructure");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewstructure");
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
	
	inheritPrototype(StructureEdit, Observable);

    return StructureEdit;
    
});

