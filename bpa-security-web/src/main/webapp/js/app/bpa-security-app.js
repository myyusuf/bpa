define(["require", "jQuery", "tinypubsub", "i18next", "jqxcore", "jqxmenu"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
        	var _languangeOptions = { 
    			ns: { 
    			    namespaces: ['base', 'security'], 
    			    defaultNs: 'base',
    			    lng: "en"
    			  } 
    		};
        	
        	i18n.init(_languangeOptions, function(t){
        		var _x = i18n.t("security:security.addUser");
            	console.log("_x --> " + _x);
            	_initializeWorkspace();
        	});
        	
        	var _initializeWorkspace = function(){
        		
        		
        		$("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
                $("#jqxMenu").css('visibility', 'visible');
                
                var registerMenu = function(){
                	
                	$("#userListMenu").click(function(){
                		$.publish("viewUserListEvent", {name: "user"});
                	});
                	
                	$("#groupListMenu").click(function(){
                		$.publish("viewGroupListEvent", {name: "group"});
                	});
                	
                }
                
                registerMenu();
                
                require(['./controller/security/WorkspaceSecurity'], function (WorkspaceSecurity) {
                	
                	var container = $("#content");
                	var workspaceSecurity = new WorkspaceSecurity(container);
                });
        		
        		
        	}
            
        });
    };
    return {
        initialize: initialize
    };
});