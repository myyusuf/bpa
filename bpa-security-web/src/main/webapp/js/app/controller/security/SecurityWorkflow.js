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
			var _gridContainer = $('<div></div>');
			
			require(['./composer/workflow/ProcessDefinitionComposer'], function (ProcessDefinitionComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _processDefinitionComposer = new ProcessDefinitionComposer(_gridContainer);
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
			var _gridContainer = $('<div></div>');
			
			require(['./composer/workflow/identity/GroupComposer'], function (GroupComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _groupComposer = new GroupComposer(_gridContainer);
            });
		});
		
		$.subscribe("viewTaskListEvent", function(e, data){
			var _gridContainer = $('<div></div>');
			
			require(['./view/workflow/TaskList'], function (TaskList) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var taskListPage = new TaskList(_gridContainer);
            });
		});
		
		$.subscribe("viewRunningProcessInstanceListEvent", function(e, data){
			var _gridContainer = $('<div></div>');
			
			require(['./composer/workflow/administration/RunningProcessInstanceComposer'], function (RunningProcessInstanceList) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var runningProcessInstanceList = new RunningProcessInstanceList(_gridContainer);
            });
		});
		
		$.subscribe("viewQueuedTaskListMenuEvent", function(e, data){
			var _gridContainer = $('<div></div>');
			
			require(['./composer/workflow/task/QueuedComposer'], function (QueuedComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var queuedComposer = new QueuedComposer(_gridContainer);
            });
		});
		
		$.subscribe("viewInboxTaskListMenuEvent", function(e, data){
			var _gridContainer = $('<div></div>');
			
			require(['./composer/workflow/task/InboxComposer'], function (InboxComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var inboxComposer = new InboxComposer(_gridContainer);
            });
		});
		
	};
	
	return WorkspaceWorkflow;
});