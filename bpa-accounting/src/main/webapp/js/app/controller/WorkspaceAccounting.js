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
		
		$.subscribe("viewBalanceSheetListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/BalanceSheetList'], function (BalanceSheet) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var balanceSheet = new BalanceSheet(gridContainer);
            });
		});
		
	};
	
	return WorkspaceAccounting;
});