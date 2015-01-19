define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceWorkflow = function(container){
		
		$.subscribe("viewDeploymentListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/workflow/DeploymentComposer'], function (DeploymentComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var _deploymentComposer = new DeploymentComposer(gridContainer);
            });
		});
		
		$.subscribe("viewProcessDefinitionListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/workflow/ProcessDefinitionComposer'], function (ProcessDefinitionComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var _processDefinitionComposer = new ProcessDefinitionComposer(gridContainer);
            });
		});
		
		$.subscribe("viewTaskListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/workflow/TaskList'], function (TaskList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var taskListPage = new TaskList(gridContainer);
            });
		});
		
	};
	
	return WorkspaceWorkflow;
});