define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceSecurity = function(container){
		
		$.subscribe("viewUserListEvent", function(e, data){
			console.log("data.name : " + data.name);
			
			require(['./view/security/UserList'], function (UserList) {
            	var userListPage = new UserList(container);
            });
			
			
		});
	};
	
	return WorkspaceSecurity;
});