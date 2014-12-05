define(["jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox"], function () {
	
	var CoaEdit = function(container, row){
		
		var url = BPA.Constant.accounting.coaUrl;
		var randomId = BPA.Util.getRandomId("coaEdit");
        
		var editWindow = $('<div id="coaEditWindow"></div>');
		var windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Chart of Account Edit</span></td></tr></table></div>');
		var windowContent = $('<div></div>');
		
		var editForm = $('<form></form>');
		editForm.appendTo(windowContent);
		var editTable = $('<table class="register-table"></table>');
		editTable.appendTo(editForm);
		
		var newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var codeLabel = $('<td>Code</td>');
		codeLabel.appendTo(newRow);
		var codeInputColumn = $('<td></td>');
		var codeInput = $('<input type="text" class="text-input" maxlength="5" />');
		codeInput.attr("id", "codeInput" + randomId);
		codeInput.val(row.code);
		codeInput.appendTo(codeInputColumn);
		codeInputColumn.appendTo(newRow);
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var nameLabel = $('<td>Name</td>');
		nameLabel.appendTo(newRow);
		var nameInputColumn = $('<td></td>');
		var nameInput = $('<input type="text" class="text-input" maxlength="50" />');
		nameInput.attr("id", "nameInput" + randomId);
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
		var url = BPA.Constant.accounting.coaUrl;
        var comboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: url
        };
        var dataAdapter = new $.jqx.dataAdapter(comboSource,{
        	
        	formatData: function (data) {
                   data.selfAccountCode = row.code;
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
        	if(row.parent != undefined && row.parent != null){
        		var selectedParentItem = parentComboBox.jqxComboBox('getItemByValue', row.parent.code);
            	parentComboBox.jqxComboBox('selectItem', selectedParentItem);
        	}
        	
        });
        
		//------------------------------------------------------
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var descriptionLabel = $('<td>Description</td>');
		descriptionLabel.appendTo(newRow);
		var descriptionInputColumn = $('<td></td>');
		var descriptionInput = $('<textarea rows="5" cols="30"></textarea>');
		descriptionInput.appendTo(descriptionInputColumn);
		descriptionInputColumn.appendTo(newRow);
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var saveButtonLabel = $('<td></td>');
		saveButtonLabel.appendTo(newRow);
		var buttonColumn = $('<td colspan="2"></td>');
		var saveButton = $('<input type="button" value="Save" style="margin-right: 5px;"/>');
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
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 272, width: 375,
            initContent: function () {
            	editWindow.jqxWindow('focus');
            },
            theme: 'metro'
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
        
        saveButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        
        saveButton.click(function(event){
        	
        	var data = {};
        	data.code = codeInput.val();
        	data.name = "";
        	data.description = "";
        	data.parent = {};
        	data.parent.code = "";
        	
        	var closeButton = $('<input type="button" value="Close"/>');
        	closeButton = .jqxButton({ width: 60, height: 25, theme: 'metro'});
        	
			$.ajax({
			    url: BPA.Constant.accounting.coaUrl,
			    type: 'PUT',
			    data: data,
			    success: function(result) {
			    	editWindow.jqxWindow('destroy');
			    },
			    error: function(jqXHR, status, error){
			    	
			    	var errorWindow = $('<div id="coaEditErrorWindow"></div>');
					var errorWindowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/error.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Error Updating Chart of Account</span></td></tr></table></div>');
					var errorWindowContent = $('<div><span style="color: red">Error status : '+ jqXHR.status + '<br>Error message : '+ error + '</span></div>');
					
					errorWindowHeader.appendTo(errorWindow);
					errorWindowContent.appendTo(errorWindow);
					errorWindow.appendTo(container);
					
					closeButton.appendTo(errorWindowContent);
					
					errorWindow.jqxWindow({
			            showCollapseButton: false, 
			            isModal: true,
			            height: 150, width: 400,
			            initContent: function () {
			            	errorWindow.jqxWindow('focus');
			            },
			            theme: 'metro'
			        });
			    }
			});
		});
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
        
	}

    return CoaEdit;
    
});

