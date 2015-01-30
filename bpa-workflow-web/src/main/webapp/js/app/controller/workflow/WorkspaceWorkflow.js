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
		
		$.subscribe("viewUserListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/workflow/identity/UserComposer'], function (UserComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var _userComposer = new UserComposer(gridContainer);
            });
		});
		
		$.subscribe("viewGroupListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/workflow/identity/GroupComposer'], function (GroupComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var _groupComposer = new GroupComposer(gridContainer);
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