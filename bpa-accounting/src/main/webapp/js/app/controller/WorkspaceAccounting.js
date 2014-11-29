define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceAccounting = function(container){
		
		$.subscribe("viewCoaListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/CoaList'], function (UserList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
				}
				
            	var userListPage = new UserList(gridContainer);
            });
		});
		
	};
	
	return WorkspaceAccounting;
});