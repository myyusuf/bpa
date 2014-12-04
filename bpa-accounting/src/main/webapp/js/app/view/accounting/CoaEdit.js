define(["jQuery", "jqxcore", "jqxbuttons"], function () {
	
	var CoaEdit = function(container){
		
		var url = BPA.Constant.accounting.coaUrl;
        
		var editWindow = $('<div id="coaEditWindow"></div>');
        editWindow.appendTo(container);
        
        editWindow.jqxWindow('resizable', true);
        editWindow.jqxWindow('draggable', true);
        editWindow.jqxWindow('open');
        
        editWindow.jqxWindow({
            showCollapseButton: true, maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200, height: 300, width: 500,
            initContent: function () {
            	editWindow.jqxWindow('focus');
            }
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
        
	}

    return CoaEdit;
    
});

