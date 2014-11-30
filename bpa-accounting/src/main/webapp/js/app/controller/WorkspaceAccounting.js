define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceAccounting = function(container){
		
		$.subscribe("viewCoaListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/CoaList'], function (UserList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var userListPage = new UserList(gridContainer);
            });
			
		});
		
		$.subscribe("viewBalanceSheetListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/BalanceSheetList'], function (BalanceSheet) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var balanceSheet = new BalanceSheet(gridContainer);
            });
		});
		
		$.subscribe("viewLedgerListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/LedgerList'], function (LedgerList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var ledgerList = new LedgerList(gridContainer);
            });
		});
		
	};
	
	return WorkspaceAccounting;
});