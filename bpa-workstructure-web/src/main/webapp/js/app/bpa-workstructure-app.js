define(["require", "jQuery", "tinypubsub", "i18next", "jqxcore", "jqxmenu"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
        	var _languangeOptions = { 
    			ns: { 
    			    namespaces: ['base', 'workstructure'], 
    			    defaultNs: 'base',
    			    lng: "en"
    			  } 
    		};
        	
        	i18n.init(_languangeOptions, function(t){
        		var _x = i18n.t("workstructure:workstructure.startProcess");
            	console.log("_x --> " + _x);
            	_initializeWorkspace();
        	});
        	
        	var _initializeWorkspace = function(){
        		
        		
        		$("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
                $("#jqxMenu").css('visibility', 'visible');
                
                var registerMenu = function(){
                	
                	$("#employeeListMenu").click(function(){
                		$.publish("viewEmployeeListEvent", {name: "employee"});
                	});
                	
                }
                
                registerMenu();
                
                require(['./controller/workstructure/WorkspaceWorkstructure'], function (WorkspaceWorkstructure) {
                	
                	var container = $("#content");
                	var workspaceWorkstructure = new WorkspaceWorkstructure(container);
                });
        		
        		
        	}
            
        });
    };
    return {
        initialize: initialize
    };
});