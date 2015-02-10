define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceWorkflow = function(container){
		
		$.subscribe("viewDeploymentListEvent", function(e, data){
			
			var _gridContainer = $('<div></div>');
        	
			require(['./composer/workflow/DeploymentComposer'], function (DeploymentComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _deploymentComposer = new DeploymentComposer(_gridContainer);
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
			var _gridContainer = $('<div></div>');
        	
			require(['./composer/workflow/identity/UserComposer'], function (UserComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _userComposer = new UserComposer(_gridContainer);
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
		
		$.subscribe("viewRunningProcessInstanceListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/workflow/administration/RunningProcessInstanceComposer'], function (RunningProcessInstanceList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var runningProcessInstanceList = new RunningProcessInstanceList(gridContainer);
            });
		});
		
	};
	
	return WorkspaceWorkflow;
});