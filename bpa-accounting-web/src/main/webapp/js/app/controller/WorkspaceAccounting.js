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
			
//			require(['./view/accounting/CoaList'], function (UserList) {
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
		
		$.subscribe("viewCoaListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
        	
        	require(['./composer/accounting/CoaComposer'], function (CoaComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxTreeGrid('destroy');
					if(container.children()[0] != undefined){
						$(container.children()[0]).jqxGrid('destroy');
					}
				}
				
            	var coaComposer = new CoaComposer(gridContainer);
            });
        	
//        	require(['./composer/accounting/CoaComposerExt'], function (CoaComposerExt) {
//				if(container.children()[0] != undefined){
//					$(container.children()[0]).jqxTreeGrid('destroy');
//					if(container.children()[0] != undefined){
//						$(container.children()[0]).jqxGrid('destroy');
//					}
//				}
//				
//            	var coaComposerExt = new CoaComposerExt(gridContainer);
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