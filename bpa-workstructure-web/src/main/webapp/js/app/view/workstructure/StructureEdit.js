define(["bpaObservable", "component/base/SimpleComboBox", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleComboBox) {
	
	var StructureEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _editedStructure = _options.editedStructure || {};
		
		var _employeeComboBoxUrl = BPA.Constant.workstructure.employeesUrl;
		var _positionComboboxUrl =  BPA.Constant.workstructure.positionsUrl;
		var _locationComboboxUrl =  BPA.Constant.workstructure.locationsUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedStructure.structureId != undefined && _editedStructure.structureId != null;
		
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
		
		
		
		//Employee Combo-----------------------------------------------
		var _newRow = $('<tr></tr>');
		var _rowLabel = $('<td style="width: 100px;">Employee</td>');
		var _rowFirstColumn = $('<td style="width: 255px;"></td>');
		_newRow.appendTo(_editTable);
		_rowLabel.appendTo(_newRow);
		_rowFirstColumn.appendTo(_newRow);
		
		var _employeeComboBox = $('<div style="margin-top: 3px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_employeeComboBox.attr("id", "employeeComboBox" + _randomId);
		_employeeComboBox.appendTo(_rowFirstColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_rowFirstColumn);
		
		
        var _employeeComboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'employeeId' },
                { name: 'name' }
            ],
            url: _employeeComboBoxUrl
        };
        var _employeeDataAdapter = new $.jqx.dataAdapter(_employeeComboSource,{});
        _employeeComboBox = _employeeComboBox.jqxComboBox({ source: _employeeDataAdapter, displayMember: "name", valueMember: "employeeId", width: 233, height: 21,
        	promptText: "Select Employee...",
        	renderer: function (index, label, value) {
                var _item = _employeeDataAdapter.records[index];
                if (_item != null) {
                	var _label = '';
                	if(_item.code != ''){
                		_label = _item.employeeId + " (" + _item.name + ")";
                	}else{
                		_label = _item.name;
                	}
                	return _label;
                }
                
                return '';
            },
            
            renderSelectedItem: function(index, item){
                var _item = _employeeDataAdapter.records[index];
                if (_item != null) {
                	
                	var _label = '';
                	if(_item.code != ''){
                		_label = _item.employeeId + " (" + _item.name + ")";
                	}else{
                		_label = _item.name;
                	}
                	return _label;
                    
                }
                
                return '';   
            },
            theme: 'metro'
        });
        
        _employeeComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedStructure.employeeId != undefined && _editedStructure.employeeId != null){
        		var _selectedEmployeeItem = _employeeComboBox.jqxComboBox('getItemByValue', _editedStructure.employeeId);
            	_employeeComboBox.jqxComboBox('selectItem', _selectedEmployeeItem);
        	}
        	
        	_editForm.jqxValidator('hide');
        	
        });
        
        _employeeComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _employeeComboBox.attr("id"));
	    });
        
		//------------------------------------------------------
        
        
      //Position Combo-----------------------------------------------
		_newRow = $('<tr></tr>');
		_rowLabel = $('<td style="width: 100px;">Position</td>');
		_rowFirstColumn = $('<td style="width: 255px;"></td>');
		_newRow.appendTo(_editTable);
		_rowLabel.appendTo(_newRow);
		_rowFirstColumn.appendTo(_newRow);
		
		var _positionComboBox = $('<div style="margin-top: 3px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_positionComboBox.attr("id", "positionComboBox" + _randomId);
		_positionComboBox.appendTo(_rowFirstColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_rowFirstColumn);
		
		
		var _positionComboBox = new SimpleComboBox(_positionComboBox,{promptText: 'Select Position...', url: _positionComboboxUrl});
        
        _positionComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedStructure.positionCode != undefined && _editedAccountGroup.positionCode != null){
        		var _selectedItem = _positionComboBox.jqxComboBox('getItemByValue', _editedStructure.positionCode);
            	_positionComboBox.jqxComboBox('selectItem', _selectedItem);
        	}
        	
        	_editForm.jqxValidator('hide');
        	
        });
        
        _positionComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _positionComboBox.attr("id"));
	    });
        
		//------------------------------------------------------
        
        //Location Combo-----------------------------------------------
		_newRow = $('<tr></tr>');
		_rowLabel = $('<td style="width: 100px;">Location</td>');
		_rowFirstColumn = $('<td style="width: 255px;"></td>');
		_newRow.appendTo(_editTable);
		_rowLabel.appendTo(_newRow);
		_rowFirstColumn.appendTo(_newRow);
		
		var _locationComboBox = $('<div style="margin-top: 3px; margin-bottom: 0px; margin-left: 0px; float: left;"></div>');
		_locationComboBox.attr("id", "locationComboBox" + _randomId);
		_locationComboBox.appendTo(_rowFirstColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_rowFirstColumn);
		
		
		var _locationComboBox = new SimpleComboBox(_locationComboBox,{promptText: 'Select Location...', url: _locationComboboxUrl, displayMember : "address", valueMember: "code"});
        
        _locationComboBox.on('bindingComplete', function (event) {
        	
        	if(_editedStructure.location != undefined && _editedAccountGroup.location != null){
        		var _selectedItem = _locationComboBox.jqxComboBox('getItemByValue', _editedStructure.location.code);
            	_locationComboBox.jqxComboBox('selectItem', _selectedItem);
        	}
        	
        	_editForm.jqxValidator('hide');
        	
        });
        
        _locationComboBox.on('change', function (event){
            _editForm.jqxValidator('validateInput', "#" + _locationComboBox.attr("id"));
	    });
        
		//------------------------------------------------------
        
        
        
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
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 187, width: 376,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
        	_editWindow.jqxWindow('destroy');
        });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _employeeComboBox.attr("id"), message: 'Employee is required', action: 'keyup, blur', 
                    	rule: function(input){
	                    	var _val = _employeeComboBox.jqxComboBox('val');
	                    	if(_val==""){
	                    		return false;
	                    	}
	                    	return true;
                    	}
                     },
                     { input: "#" + _positionComboBox.attr("id"), message: 'Position is required', action: 'keyup, blur', 
                     	rule: function(input){
 	                    	var _val = _positionComboBox.jqxComboBox('val');
 	                    	if(_val==""){
 	                    		return false;
 	                    	}
 	                    	return true;
                     	}
                      },
                      { input: "#" + _locationComboBox.attr("id"), message: 'Location is required', action: 'keyup, blur', 
                      	rule: function(input){
  	                    	var _val = _locationComboBox.jqxComboBox('val');
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
        
       var _generateUUID = function(){
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        };
        
        var _saveStructure = function(){
        	
        	var _savedData = {};
        	_savedData.structureId = _generateUUID();
        	_savedData.employee =_employeeComboBox.jqxComboBox('getSelectedItem').originalItem;
        	_savedData.position =_positionComboBox.jqxComboBox('getSelectedItem').originalItem;
        	_savedData.location =_locationComboBox.jqxComboBox('getSelectedItem').originalItem;
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "onSaveStructure");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "onSaveNewStructure");
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

