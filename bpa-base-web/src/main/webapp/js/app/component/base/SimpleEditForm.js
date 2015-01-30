define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var SimpleEditForm = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _dataId = _options.dataId;
		if(!_dataId) throw "dataId is required";
		
		var _formName = _options.formName;
		if(!_formName) throw "formName is required";
		
		var _caption = _options.caption;
		if(!_caption) throw "caption is required";
		
		var _formFields =  _options.formFields;
		if(!_formFields) throw "formFields is required";
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _dataId != undefined && _dataId != null;
		
		var _randomId = BPA.Util.getRandomId(_formName);
        
		var _editWindow = $('<div id="'+ _formName + '_Window"></div>');
		var _windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">' + _caption + '</span></td></tr></table></div>');
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		
		for(i=0; i<_formFields.length; i++){
			
			var _newRow = $('<tr></tr>');
			_newRow.appendTo(_editTable);
			var _fieldLabel = $('<td>'+_formFields[i].label+'</td>');
			_fieldLabel.appendTo(_newRow);
			var _fieldInputColumn = $('<td></td>');
			var _fieldInput = '';
			if(_formFields[i].required){
				_fieldInput = $('<input type="text" class="text-input" maxlength="8" style="width: 233px; float: left;"/>');
			}else{
				_fieldInput = $('<input type="text" class="text-input" maxlength="8" style="width: 233px;"/>');
			}
			_fieldInput.attr("id", _formFields[i].name + "_Input_" + _randomId);
			_fieldInput.jqxInput({ theme: 'metro' });
			
			if(_isEditForm){
				_fieldInput.val(_editedGroup.groupId);
				if(_formFields[i].isKey){
					_fieldInput.jqxInput({disabled: true});
				}
			}
			_fieldInput.appendTo(_fieldInputColumn);
			if(_formFields[i].required){
				$(BPA.Constant.requiredFieldSymbol).appendTo(_fieldInputColumn);
			}
			
			_fieldInputColumn.appendTo(_newRow);
			
		}
		
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
        
        /*_editForm.jqxValidator({
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
        }*/
        
        this.open = function(){
        	_editWindow.jqxWindow('open');
        }
        
        this.close = function(){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        }
        
	}
	
	inheritPrototype(SimpleEditForm, Observable);

    return SimpleEditForm;
    
});

