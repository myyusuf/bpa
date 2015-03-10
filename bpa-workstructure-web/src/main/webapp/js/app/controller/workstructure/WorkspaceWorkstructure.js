define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceWorkstructure = function(container){
		
		$.subscribe("viewEmployeeListEvent", function(e, data){
			
			var _gridContainer = $('<div></div>');
        	
			require(['./composer/workstructure/EmployeeComposer'], function (EmployeeComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _employeeComposer = new EmployeeComposer(_gridContainer);
            });
		});
		
	};
	
	return WorkspaceWorkstructure;
});