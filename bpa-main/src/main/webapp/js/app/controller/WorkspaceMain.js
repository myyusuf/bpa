define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceMain = function(container){
		
		var tabs = $('<div id="tabs"><ul><li>Dashboard</li></ul><div></div></div>');
		
		tabs.appendTo(container);
		tabs.jqxTabs({ width: '100%', height: '100%', position: 'top', showCloseButtons: true, scrollPosition: 'both', theme: 'metro'});
		tabs.css({marginLeft: "-1px", marginTop: "0px", borderTop: "0px"});
		
		
		$.subscribe("viewUserListEvent", function(e, data){
			var userListGrid = $('<div id="userListGrid"></div>');
			
			var tabsCount = tabs.jqxTabs('length');
			
			tabs.jqxTabs('addLast', 'User List' , 'userListGrid');
			tabs.jqxTabs('setContentAt', tabsCount , '<div id="userListGrid">User Grid : [Loading]</div>');
			
			
			require(['./view/security/UserList'], function (UserList) {
				var parentContainer = $('#userListGrid').parent();
            	var userList = new UserList(parentContainer);
            	tabs.on('removed', function (event) {
            		console.log('removed...');
            	}); 
            });
		});
		
		$.subscribe("viewRoleListEvent", function(e, data){
			var roleListGrid = $('<div id="roleListGrid"></div>');
			
			var tabsCount = tabs.jqxTabs('length');
			
			tabs.jqxTabs('addLast', 'Role List' , 'roleListGrid');
			tabs.jqxTabs('setContentAt', tabsCount , '<div id="roleListGrid">Role Grid : [Loading]</div>');
			
			
			require(['./view/security/RoleList'], function (RoleList) {
				var parentContainer = $('#roleListGrid').parent();
            	var roleList = new RoleList(parentContainer);
            });
		});
		
		$.subscribe("viewLedgerListEvent", function(e, data){
			var roleListGrid = $('<div id="ledgerListGrid"></div>');
			
			var tabsCount = tabs.jqxTabs('length');
			
			tabs.jqxTabs('addLast', 'Ledger' , 'ledgerListGrid');
			tabs.jqxTabs('setContentAt', tabsCount , '<div id="ledgerListGrid">Ledger Grid : [Loading]</div>');
			
			
			require(['./view/accounting/LedgerList'], function (LedgerList) {
				var parentContainer = $('#ledgerListGrid').parent();
            	var ledgerList = new LedgerList(parentContainer);
            });
		});
			
	};
	
	return WorkspaceMain;
});