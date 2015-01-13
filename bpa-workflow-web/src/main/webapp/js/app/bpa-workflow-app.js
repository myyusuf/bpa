define(["require", "jQuery", "tinypubsub", "i18next", "jqxcore", "jqxmenu"], function (require) {
    var initialize = function () {
    	
        $(document).ready(function () {
        	
            
            $("#jqxMenu").jqxMenu({ width: '100%', theme: 'metro'});
            $("#jqxMenu").css('visibility', 'visible');
            
            var registerMenu = function(){
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
            
        });
    };
    return {
        initialize: initialize
    };
});