define(["jQuery", "jqxcore", "jqxgrid", "jqxtreegrid"], function () {
	
	var WorkspaceAccounting = function(container){
		
		$.subscribe("viewAccountGroupListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
        	
        	require(['./composer/accounting/AccountGroupComposer'], function (AccountGroupComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var accountGroupComposer = new AccountGroupComposer(gridContainer);
            });
			
//			require(['./view/accounting/AccountList'], function (UserList) {
//				if(container.children()[0] != undefined){
//					$(container.children()[0]).jqxTreeGrid('destroy');
//					if(container.children()[0] != undefined){
//						$(container.children()[0]).jqxGrid('destroy');
//					}
//				}
//				
//            	var userListPage = new UserList(gridContainer);
//            });
        	
		});
		
		$.subscribe("viewAccountListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
        	
        	require(['./composer/accounting/AccountComposer'], function (AccountComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var accountComposer = new AccountComposer(gridContainer);
            });
        	
//        	require(['./composer/accounting/AccountComposerExt'], function (AccountComposerExt) {
//				if(container.children()[0] != undefined){
//					$(container.children()[0]).jqxTreeGrid('destroy');
//					if(container.children()[0] != undefined){
//						$(container.children()[0]).jqxGrid('destroy');
//					}
//				}
//				
//            	var accountComposerExt = new AccountComposerExt(gridContainer);
//            });
			
		});
		
		$.subscribe("viewJournalListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/JournalList'], function (JournalList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var journalList = new JournalList(gridContainer);
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
		
		$.subscribe("viewBalanceSheetListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/accounting/BalanceSheetList'], function (BalanceSheetList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var balanceSheetList = new BalanceSheetList(gridContainer);
            });
		});
		
	};
	
	return WorkspaceAccounting;
});