define(["jQuery", "jqxcore"], function () {
	
	var WorkspaceMain = function(container){
		
		var _tabPosition = {};
		
		// It is needed to fix bug for jqxtree
		var changeWidth = function(){
			var innerWidth = $("#jqxNavigationBar").innerWidth() - 2 + 'px';
        	$('#financeTreeMenu').jqxTree({width: innerWidth});
        	$('#securityTreeMenu').jqxTree({width: innerWidth});
        	$('#workflowTreeMenu').jqxTree({width: innerWidth});
        	$('#purchasingTreeMenu').jqxTree({width: innerWidth});
		}
		
		var _addTab = function(tabId, tabCaption, onContentLoad){
			var _tabsCount = 0;
			
			var _positionIndex = _tabPosition[tabId];
			if(_positionIndex){
				tabs.jqxTabs('select', _positionIndex);
			}else{
				_positionIndex = tabs.jqxTabs('length');
				tabs.jqxTabs('addLast', tabCaption , tabId + "_content");
				tabs.jqxTabs('setContentAt', _positionIndex , '<div id="' + tabId + '" >Loading content...</div>');
				_tabPosition[tabId] = _positionIndex;
				
				tabs.on('removed', function (event) { 
					delete _tabPosition[tabId];
				}); 
				
				var _parentContainer = $('#' + tabId).parent();
				var _children = _parentContainer.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				
				onContentLoad(_parentContainer);
				
				changeWidth();
			}
			
		}
		
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
			
			changeWidth();
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
			
			changeWidth();
		});
		
		$.subscribe("viewAccountGroupListEvent", function(e, data){
			var tabsCount = tabs.jqxTabs('length');
			
			tabs.jqxTabs('addLast', 'Account Group' , 'accountGroupListGrid');
			tabs.jqxTabs('setContentAt', tabsCount , '<div id="accountGroupListGrid">Account Group Grid : [Loading]</div>');
			
			require(['./composer/accounting/AccountGroupComposer'], function (AccountGroupComposer) {
				
				var parentContainer = $('#accountGroupListGrid').parent();
            	var accountGroupComposer = new AccountGroupComposer(parentContainer);
            });
			
			changeWidth();
		});
		$.subscribe("viewCoaListEvent", function(e, data){
			var tabsCount = tabs.jqxTabs('length');
			
			tabs.jqxTabs('addLast', 'Chart of Account' , 'coaListGrid');
			tabs.jqxTabs('setContentAt', tabsCount , '<div id="coaListGrid">Coa Grid : [Loading]</div>');
			
			require(['./composer/accounting/AccountComposer'], function (AccountComposer) {
				
				var parentContainer = $('#coaListGrid').parent();
            	var accountComposer = new AccountComposer(parentContainer);
            });
			
			changeWidth();
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
			
			changeWidth();
		});
		
		$.subscribe("viewProcessListListEvent", function(e, data){
			
			var tabsCount = tabs.jqxTabs('length');
			
			tabs.jqxTabs('addLast', 'Process List' , 'processListListGrid');
			tabs.jqxTabs('setContentAt', tabsCount , '<div id="processListListGrid" >Process List Grid : [Loading]</div>');
			
			
//			require(['./view/workflow/TaskList'], function (TaskList) {
//				var parentContainer = $('#processListListGrid').parent();
//            	var taskList = new TaskList(parentContainer);
//            });
			
			require(['./composer/workflow/administration/RunningProcessInstanceComposer'], function (RunningProcessInstanceList) {
				var parentContainer = $('#processListListGrid').parent();
				var _children = parentContainer.children();
				for(var i=0; i<_children.length; i++){
					_children[i].remove();
				}
				
            	var runningProcessInstanceList = new RunningProcessInstanceList(parentContainer);
            });
			
			changeWidth();
		});
		
		$.subscribe("viewStructureListEvent", function(e, data){
			
			var _onContentLoad = function(container){
				require(['./view/workstructure/StructureView'], function (StructureView) {
	            	var _structureView = new StructureView(container);
	            });
			};
			
			_addTab("workstructure_structure", "Structure", _onContentLoad);
		});
		
		$.subscribe("viewEmployeeListEvent", function(e, data){
			
			var _onContentLoad = function(container){
				require(['./composer/workstructure/EmployeeComposer'], function (EmployeeComposer) {
	            	var _employeeComposer = new EmployeeComposer(container);
	            });
			}
			
			_addTab("workstructure_employee", "Employee List", _onContentLoad);
		});
		
		$.subscribe("viewPositionListEvent", function(e, data){
			
			var _onContentLoad = function(container){
				require(['./composer/workstructure/PositionComposer'], function (PositionComposer) {
	            	var _positionComposer = new PositionComposer(container);
	            });
			}
			
			_addTab("workstructure_position", "Position List", _onContentLoad);
			
		});
		
		$.subscribe("viewLocationListEvent", function(e, data){
			
			var _onContentLoad = function(container){
				require(['./composer/workstructure/LocationComposer'], function (LocationComposer) {
	            	var _locationComposer = new LocationComposer(container);
	            });
			}
			
			_addTab("workstructure_location", "Location List", _onContentLoad);
			
		});
		
	};
	
	return WorkspaceMain;
});