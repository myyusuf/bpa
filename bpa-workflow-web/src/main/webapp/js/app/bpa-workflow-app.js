define(["require", "jQuery", "tinypubsub", "i18next", "jqxcore", "jqxmenu"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
        	var _languangeOptions = { 
    			ns: { 
    			    namespaces: ['base', 'workflow'], 
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
                	
                	$("#deploymentListMenu").click(function(){
                		$.publish("viewDeploymentListEvent", {name: "deployment"});
                	});
                	
                	$("#processDefinitionListMenu").click(function(){
                		$.publish("viewProcessDefinitionListEvent", {name: "process definition"});
                	});
                	
                	$("#taskListMenu").click(function(){
                		$.publish("viewTaskListEvent", {name: "task"});
                	});
                	
                }
                
                registerMenu();
                
                require(['./controller/workflow/WorkspaceWorkflow'], function (WorkspaceWorkflow) {
                	
                	var container = $("#content");
                	var workspaceWorkflow = new WorkspaceWorkflow(container);
                });
        		
        		
        	}
            
        });
    };
    return {
        initialize: initialize
    };
});