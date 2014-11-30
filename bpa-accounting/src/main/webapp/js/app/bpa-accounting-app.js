define(["require", "jQuery", "tinypubsub", "jqxcore", "jqxtabs", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxmenu", "jqxnavigationbar", 
        "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxlistbox", "jqxdropdownlist", "jqxgrid", "jqxdata", 
        "jqxtreegrid", "jqxdatatable"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
            
            $("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
            $("#jqxMenu").css('visibility', 'visible');
            
            var registerMenu = function(){
            	$("#coaListMenu").click(function(){
            		$.publish("viewCoaListEvent", {name: "coa"});
            	});
            	
            	$("#balanceSheetListMenu").click(function(){
            		$.publish("viewBalanceSheetListEvent", {name: "balance sheet"});
            	});
            	
            	$("#ledgerListMenu").click(function(){
            		$.publish("viewLedgerListEvent", {name: "ledger"});
            	});
            }
            
            registerMenu();
            
            require(['./controller/WorkspaceAccounting'], function (WorkspaceAccounting) {
            	
            	var container = $("#content");
            	var workspaceAccounting = new WorkspaceAccounting(container);
            });
            
        });
    };
    return {
        initialize: initialize
    };
});