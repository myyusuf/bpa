define(["jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function () {
	
	var CoaEdit = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var editedCoa = _options.editedCoa || {};
		
		var onSaveCoa = _options.onSaveCoa || function(coa, self){
			console.log("[No implementation] Call default onSaveCoa function with data : " + coa)
		};
		
		var comboboxUrl = _options.comboboxUrl || BPA.Constant.accounting.coaUrl;
		
		this.isEditForm = editedCoa.code != undefined && editedCoa.code != null;
		
		var randomId = BPA.Util.getRandomId("coaEdit");
        
		var editWindow = $('<div id="coaEditWindow"></div>');
		var windowHeader = "";
		if(this.isEditForm){
			windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Chart of Account Edit</span></td></tr></table></div>');
		}else{
			windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">New Chart of Account</span></td></tr></table></div>');
		}
		
		var windowContent = $('<div></div>');
		
		var editForm = $('<form></form>');
		editForm.appendTo(windowContent);
		var editTable = $('<table class="edit-table"></table>');
		editTable.appendTo(editForm);
		
		var newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var codeLabel = $('<td>Code</td>');
		codeLabel.appendTo(newRow);
		var codeInputColumn = $('<td></td>');
		var codeInput = $('<input type="text" class="text-input" maxlength="5" />');
		codeInput.attr("id", "codeInput" + randomId);
		if(this.isEditForm){
			codeInput.val(editedCoa.code);
		}
		codeInput.appendTo(codeInputColumn);
		codeInputColumn.appendTo(newRow);
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var nameLabel = $('<td>Name</td>');
		nameLabel.appendTo(newRow);
		var nameInputColumn = $('<td></td>');
		var nameInput = $('<input type="text" class="text-input" maxlength="50" />');
		nameInput.attr("id", "nameInput" + randomId);
		if(this.isEditForm){
			nameInput.val(editedCoa.name);
		}
		
		nameInput.appendTo(nameInputColumn);
		nameInputColumn.appendTo(newRow);
		//------------------------------------------------------
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var parentLabel = $('<td>Parent</td>');
		parentLabel.appendTo(newRow);
		var parentInputColumn = $('<td></td>');
		var parentInput = $('<div style="margin-top: 3px; margin-bottom: 3px; margin-left: 2px;"></div>');
		parentInput.attr("id", "parentInput" + randomId);
		parentInput.appendTo(parentInputColumn);
		parentInput.appendTo(newRow);
		
		var source = new Array();
        var comboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: comboboxUrl
        };
        var dataAdapter = new $.jqx.dataAdapter(comboSource,{
        	
        	formatData: function (data) {
                   data.selfAccountCode = data.code;
                   return data;
            }
        	
        });
        var parentComboBox = parentInput.jqxComboBox({ selectedIndex: 0, source: dataAdapter, displayMember: "code", valueMember: "code", width: 233, height: 21,
        	
        	renderer: function (index, label, value) {
                var item = dataAdapter.records[index];
                if (item != null) {
                	var label = '';
                	if(item.code != ''){
                		label = item.code + " (" + item.name + ")";
                	}else{
                		label = item.name;
                	}
                	return label;
                }
                
                return '';
            },
            
            renderSelectedItem: function(index, item){
                var item = dataAdapter.records[index];
                if (item != null) {
                	
                	var label = '';
                	if(item.code != ''){
                		label = item.code + " (" + item.name + ")";
                	}else{
                		label = item.name;
                	}
                	return label;
                    
                }
                
                return '';   
            },
            theme: 'metro'
        });
        
        parentComboBox.on('bindingComplete', function (event) {
        	dataAdapter.records.splice(0, 0, {code: '', name: '--Please Select--'});
        	parentComboBox.jqxComboBox('insertAt', {code: '0', name: 'Please Select'}, 0); 
        	if(editedCoa.parent != undefined && editedCoa.parent != null){
        		var selectedParentItem = parentComboBox.jqxComboBox('getItemByValue', editedCoa.parent.code);
            	parentComboBox.jqxComboBox('selectItem', selectedParentItem);
        	}
        	
        });
        
		//------------------------------------------------------
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var descriptionLabel = $('<td>Description</td>');
		descriptionLabel.appendTo(newRow);
		var descriptionInputColumn = $('<td></td>');
		var descriptionInput = $('<textarea rows="5" cols="30" maxlength="250"></textarea>');
		descriptionInput.attr("id", "descriptionInput" + randomId);
		if(this.isEditForm){
			descriptionInput.val(editedCoa.description);
		}
		descriptionInput.appendTo(descriptionInputColumn);
		descriptionInputColumn.appendTo(newRow);
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var saveButtonLabel = $('<td></td>');
		saveButtonLabel.appendTo(newRow);
		var buttonColumn = $('<td colspan="2"></td>');
		var saveButton = $('<input type="button" value="Save" style="margin-right: 5px; margin-top: 5px;"/>');
		saveButton.appendTo(buttonColumn);
		
		var cancelButton = $('<input type="button" value="Cancel"/>');
		cancelButton.appendTo(buttonColumn);
		
		buttonColumn.appendTo(newRow);
		
		windowHeader.appendTo(editWindow);
		windowContent.appendTo(editWindow);
        editWindow.appendTo(container);
        
        editWindow.jqxWindow('resizable', true);
        editWindow.jqxWindow('draggable', true);
        editWindow.jqxWindow('open');
        
        editWindow.jqxWindow({
            showCollapseButton: false, 
            isModal: true,
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 270, width: 375,
            initContent: function () {
            	editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        editWindow.on('close', function (event) { 
        	editWindow.jqxWindow('destroy');
        });
        
        $('.text-input').jqxInput({ theme: 'metro' });
        descriptionInput.jqxInput({ theme: 'metro', width: 235, height: 80 });
        
        editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + codeInput.attr("id"), message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + nameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' }
                   
                   ]
        	});
        
        editForm.on('validationSuccess', function (event) { 
        	saveCoa();
        }); 
        	
        saveButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        
        saveButton.click(function(event){
        	editForm.jqxValidator('validate');
		});
        
        cancelButton.click(function(event){
        	editWindow.jqxWindow('close');
        	editWindow.jqxWindow('destroy');
        });
        
        var successNotification = $('<div>Data successfully saved</div>');
        successNotification.jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
        
        var saveCoa = function(){
        	
        	var item = parentComboBox.jqxComboBox('getSelectedItem');
        	
        	var savedData = {};
        	savedData.code = codeInput.val();
        	savedData.name = nameInput.val();;
        	savedData.description = descriptionInput.val();
        	savedData.parent = {};
        	savedData.parent.code = item.value;
        	
        	onSaveCoa(savedData, _self);
        }
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
        this.close = function(){
        	editWindow.jqxWindow('close');
        	editWindow.jqxWindow('destroy');
        }
        
	}

    return CoaEdit;
    
});

