define(["jqxbuttons", "jqxinput", "jqxvalidator"], function () {
	
	var CoaEdit = function(container, row){
		
		var url = BPA.Constant.accounting.coaUrl;
		var randomId = BPA.Util.getRandomId("coaEdit");
        
		var editWindow = $('<div id="coaEditWindow"></div>');
		var windowHeader = $('<div><span>Chart of Account Edit</span></div>');
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
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 237, width: 375,
            initContent: function () {
            	editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        $('.text-input').jqxInput({  });
        editForm.jqxValidator({
        	closeOnClick: true,
            rules: [
                    { input: "#" + codeInput.attr("id"), message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + nameInput.attr("id"), message: 'Name is required', action: 'keyup, blur', rule: 'required' }
                   
                   ]
        	});
        
        saveButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
        
	}

    return CoaEdit;
    
});

