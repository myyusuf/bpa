define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceSecurity = function(container){
		
		$.subscribe("viewUserListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/security/UserComposer'], function (UserComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var _userComposer = new UserComposer(gridContainer);
            });
		});
		
		$.subscribe("viewRoleListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./composer/security/RoleComposer'], function (RoleComposer) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var _roleComposer = new RoleComposer(gridContainer);
            });
		});
		
	};
	
	return WorkspaceSecurity;
});