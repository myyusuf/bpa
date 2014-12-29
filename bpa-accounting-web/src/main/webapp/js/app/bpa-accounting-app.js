define(["require", "jQuery", "tinypubsub", "i18next", "jqxcore", "jqxmenu"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
        	var _languangeOptions = { 
    			ns: { 
    			    namespaces: ['base', 'accounting'], 
    			    defaultNs: 'base',
    			    lng: "en"
    			  } 
    		};
        	
        	i18n.init(_languangeOptions, function(t){
        		var _x = i18n.t("base.save");
            	console.log("_x --> " + _x);
            	_initializeWorkspace();
        	});
        	
        	var _initializeWorkspace = function(){
        		
        		
        		$("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
                $("#jqxMenu").css('visibility', 'visible');
                
                var registerMenu = function(){
                	
                	$("#accountGroupListMenu").click(function(){
                		$.publish("viewAccountGroupListEvent", {name: "accountGroup"});
                	});
                	
                	$("#coaListMenu").click(function(){
                		$.publish("viewCoaListEvent", {name: "coa"});
                	});
                	
                	$("#journalListMenu").click(function(){
                		$.publish("viewJournalListEvent", {name: "journal"});
                	});
                	
                	$("#ledgerListMenu").click(function(){
                		$.publish("viewLedgerListEvent", {name: "ledger"});
                	});
                	
                	$("#balanceSheetListMenu").click(function(){
                		$.publish("viewBalanceSheetListEvent", {name: "balance sheet"});
                	});
                	
                	
                }
                
                registerMenu();
                
                require(['./controller/WorkspaceAccounting'], function (WorkspaceAccounting) {
                	
                	var container = $("#content");
                	var workspaceAccounting = new WorkspaceAccounting(container);
                });
        		
        		
        	}
            
        });
    };
    return {
        initialize: initialize
    };
});