define(["jqxbuttons", "jqxinput", "jqxvalidator"], function () {
	
	var CoaEdit = function(container, row){
		
		var url = BPA.Constant.accounting.coaUrl;
        
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
		var codeInput = $('<input type="text" class="text-input" />');
		codeInput.appendTo(codeInputColumn);
		codeInputColumn.appendTo(newRow);
		
		newRow = $('<tr></tr>');
		newRow.appendTo(editTable);
		var nameLabel = $('<td>Name</td>');
		nameLabel.appendTo(newRow);
		var nameInputColumn = $('<td></td>');
		var nameInput = $('<input type="text" class="text-input" />');
		nameInput.appendTo(nameInputColumn);
		nameInputColumn.appendTo(newRow);
		
		
		windowHeader.appendTo(editWindow);
		windowContent.appendTo(editWindow);
        editWindow.appendTo(container);
        
        editWindow.jqxWindow('resizable', true);
        editWindow.jqxWindow('draggable', true);
        editWindow.jqxWindow('open');
        
        editWindow.jqxWindow({
            showCollapseButton: true, maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200, height: 300, width: 500,
            initContent: function () {
            	editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        $('.text-input').jqxInput({  });
        editForm.jqxValidator({
            rules: [
                    { input: codeInput, message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                    { input: nameInput, message: 'Name is required', action: 'keyup, blur', rule: 'required' }
                   
                   ]
        	});
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
        
	}

    return CoaEdit;
    
});

