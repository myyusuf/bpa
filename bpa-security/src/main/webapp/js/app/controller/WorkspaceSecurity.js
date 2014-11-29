define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceSecurity = function(container){
		
		$.subscribe("viewUserListEvent", function(e, data){
			console.log("data.name : " + data.name);
			
			require(['./view/security/UserList'], function (UserList) {
            	var userListPage = new UserList(container);
            });
		});
		
		$.subscribe("viewRoleListEvent", function(e, data){
			console.log("data.name : " + data.name);
			
			require(['./view/security/RoleList'], function (RoleList) {
            	var roleListPage = new RoleList(container);
            });
		});
		
	};
	
	return WorkspaceSecurity;
});