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
            		var _x = i18n.t("security:security.save");
            		console.log("_x : " + _x);
                	_initializeWorkspace();
            	});
            	
            	var _initializeWorkspace = function(){
            		$("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
                    $("#jqxMenu").css('visibility', 'visible');
                    
                    var registerMenu = function(){
                    	$("#userListMenu").click(function(){
                    		$.publish("viewUserListEvent", {name: "user"});
                    	});
                    	
                    	$("#roleListMenu").click(function(){
                    		$.publish("viewRoleListEvent", {name: "role"});
                    	});
                    }
                    
                    registerMenu();
                    
                    require(['./controller/WorkspaceSecurity'], function (WorkspaceSecurity) {
                    	
                    	var container = $("#content");
                    	var workspaceSecurity = new WorkspaceSecurity(container);
                    });
            		
            	};
        	
        });
    };
    return {
        initialize: initialize
    };
});