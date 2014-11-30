define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceMain = function(container){
		
		$.subscribe("viewUserListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/security/UserList'], function (UserList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var userListPage = new UserList(gridContainer);
            });
		});
		
		$.subscribe("viewRoleListEvent", function(e, data){
			var gridContainer = $('<div></div>');
        	gridContainer.appendTo(container);
			
			require(['./view/security/RoleList'], function (RoleList) {
				if(container.children()[0] != undefined){
					$(container.children()[0]).jqxGrid('destroy');
				}
				
            	var roleListPage = new RoleList(gridContainer);
            });
		});
		
	};
	
	return WorkspaceMain;
});