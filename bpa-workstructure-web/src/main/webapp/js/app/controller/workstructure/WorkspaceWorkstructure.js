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
		
		$.subscribe("viewPositionListEvent", function(e, data){
			
			var _gridContainer = $('<div></div>');
        	
			require(['./composer/workstructure/PositionComposer'], function (PositionComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _positionComposer = new PositionComposer(_gridContainer);
            });
		});
		
		$.subscribe("viewLocationListEvent", function(e, data){
			
			var _gridContainer = $('<div></div>');
        	
			require(['./composer/workstructure/LocationComposer'], function (LocationComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _locationComposer = new LocationComposer(_gridContainer);
            });
		});
		
		$.subscribe("viewStructureViewEvent", function(e, data){
			
			var _gridContainer = $('<div></div>');
        	
			require(['./view/workstructure/StructureView'], function (StructureView) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _structureView = new StructureView(_gridContainer);
            });
		});
		
	};
	
	return WorkspaceWorkstructure;
});