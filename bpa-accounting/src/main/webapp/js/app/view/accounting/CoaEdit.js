define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var CoaEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _editedCoa = _options.editedCoa || {};
		
		var _comboboxUrl = _options.comboboxUrl || BPA.Constant.accounting.coaUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedCoa.code != undefined && _editedCoa.code != null;
		
		var _randomId = BPA.Util.getRandomId("coaEdit");
        
		var _editWindow = $('<div id="coaEditWindow"></div>');
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
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _codeLabel = $('<td>Code</td>');
		_codeLabel.appendTo(_newRow);
		var _codeInputColumn = $('<td></td>');
		var _codeInput = $('<input type="text" class="text-input" maxlength="5" />');
		_codeInput.attr("id", "codeInput" + _randomId);
		if(_isEditForm){
			_codeInput.val(_editedCoa.code);
		}
		_codeInput.appendTo(_codeInputColumn);
		_codeInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _nameLabel = $('<td>Name</td>');
		_nameLabel.appendTo(_newRow);
		var _nameInputColumn = $('<td></td>');
		var _nameInput = $('<input type="text" class="text-input" maxlength="50" />');
		_nameInput.attr("id", "nameInput" + _randomId);
		if(_isEditForm){
			_nameInput.val(_editedCoa.name);
		}
		
		_nameInput.appendTo(_nameInputColumn);
		_nameInputColumn.appendTo(_newRow);
		//------------------------------------------------------
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _parentLabel = $('<td>Parent</td>');
		_parentLabel.appendTo(_newRow);
		var _parentInputColumn = $('<td></td>');
		var _parentInput = $('<div style="margin-top: 3px; margin-bottom: 3px; margin-left: 2px;"></div>');
		_parentInput.attr("id", "parentInput" + _randomId);
		_parentInput.appendTo(_parentInputColumn);
		_parentInput.appendTo(_newRow);
		
        var _comboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: _comboboxUrl
        };
        var _dataAdapter = new $.jqx.dataAdapter(_comboSource,{
        	
        	formatData: function (data) {
                   data.selfAccountCode = data.code;
                   return data;
            }
        	
        });
        var _parentComboBox = _parentInput.jqxComboBox({ selectedIndex: 0, source: _dataAdapter, displayMember: "code", valueMember: "code", width: 233, height: 21,
        	
        	renderer: function (index, label, value) {
                var _item = _dataAdapter.records[index];
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
                var _item = _dataAdapter.records[index];
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
        	_dataAdapter.records.splice(0, 0, {code: '', name: '--Please Select--'});
        	_parentComboBox.jqxComboBox('insertAt', {code: '0', name: 'Please Select'}, 0); 
        	if(_editedCoa.parent != undefined && _editedCoa.parent != null){
        		var _selectedParentItem = _parentComboBox.jqxComboBox('getItemByValue', _editedCoa.parent.code);
            	_parentComboBox.jqxComboBox('selectItem', _selectedParentItem);
        	}
        	
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
			_descriptionInput.val(_editedCoa.description);
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
        
        _codeInput.jqxInput({ theme: 'metro' });
        _nameInput.jqxInput({ theme: 'metro' });
        _descriptionInput.jqxInput({ theme: 'metro', width: 235, height: 80 });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _codeInput.attr("id"), message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _nameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' }
                   
                   ]
        	});
        
        _editForm.on('validationSuccess', function (event) { 
        	_saveCoa();
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
        
        var _saveCoa = function(){
        	
        	var _item = _parentComboBox.jqxComboBox('getSelectedItem');
        	
        	var _savedData = {};
        	_savedData.code = _codeInput.val();
        	_savedData.name = _nameInput.val();;
        	_savedData.description = _descriptionInput.val();
        	_savedData.parent = {};
        	_savedData.parent.code = _item.value;
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updatecoa");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewcoa");
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
	
	inheritPrototype(CoaEdit, Observable);

    return CoaEdit;
    
});

