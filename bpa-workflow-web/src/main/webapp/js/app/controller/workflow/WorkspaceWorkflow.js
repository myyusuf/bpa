define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceWorkflow = function(container){
		
		$.subscribe("viewProcessDefinitionListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/workflow/ProcessDefinitionList'], function (ProcessDefinitionList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var processDefinitionListPage = new ProcessDefinitionList(gridContainer);
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