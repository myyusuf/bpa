define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceSecurity = function(container){
		
		
		$.subscribe("viewUserListEvent", function(e, data){
			var _gridContainer = $('<div></div>');
        	
			require(['./composer/security/UserComposer'], function (UserComposer) {
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
			
			require(['./composer/security/GroupComposer'], function (GroupComposer) {
				var _children = container.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				_gridContainer.appendTo(container);
				
            	var _groupComposer = new GroupComposer(_gridContainer);
            });
		});
		
		
	};
	
	return WorkspaceSecurity;
});