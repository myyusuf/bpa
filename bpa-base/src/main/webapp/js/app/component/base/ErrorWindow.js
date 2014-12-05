define(["jqxbuttons"], function () {
	
	var ErrorWindow = function(container, title, content){
		
		var _title = title || 'Error';
		var _content = content || 'Error when execute action';
		
        var closeButton = $('<input type="button" value="Close"/>');
        closeButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        	
        var errorWindow = $('<div id="coaEditErrorWindow"></div>');
		var errorWindowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/error.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">' + _title + '</span></td></tr></table></div>');
		var errorWindowContent = $('<div><span style="color: red">' + _content + '</span></div>');
		
		errorWindowHeader.appendTo(errorWindow);
		errorWindowContent.appendTo(errorWindow);
		errorWindow.appendTo(container);
		
		var editDiv = $('<div style="position:absolute; bottom: 15px; text-align: center; width: 100%;"></div>');
		closeButton.appendTo(editDiv);
		editDiv.appendTo(errorWindowContent);
		
		closeButton.click(function(event){
			errorWindow.jqxWindow('close');
			errorWindow.jqxWindow('destroy');
		});
		
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

    return ErrorWindow;
    
});