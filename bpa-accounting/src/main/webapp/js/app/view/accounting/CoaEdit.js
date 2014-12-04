define(["jQuery", "jqxcore", "jqxbuttons"], function () {
	
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
		var userNameLabel = $('<td>User Name</td>');
		userNameLabel.appendTo(newRow);
		var userNameInputColumn = $('<td></td>');
		var userNameInput = $('<input type="text" id="userInput" class="text-input" />');
		userNameInput.appendTo(userNameInputColumn);
		userNameInputColumn.appendTo(newRow);
		
		
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
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
        
	}

    return CoaEdit;
    
});

