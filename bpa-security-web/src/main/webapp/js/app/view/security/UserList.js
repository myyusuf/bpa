define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var UserList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'userId', type: 'string' },
		                       { name: 'password', type: 'string' },
		                       { name: 'firstName', type: 'string' },
		                       { name: 'lastName', type: 'string' },
		                       { name: 'email', type: 'string' }
		                   ];
		_options.dataFieldId = "userId";
		
		_options.url = BPA.Constant.security.usersUrl;
		
		_options.columns = [
		                   { text: 'UserId', datafield: 'userId', width: '25%' },
		                   { text: 'First Name', datafield: 'firstName', width: '25%' },
		                   { text: 'Last Name', datafield: 'lastName', width: '25%' },
		                   { text: 'Email', datafield: 'email', width: '25%' },
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New User</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddUser");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddUser";
			}else if(_command == "edit"){
				_eventName = "onEditUser";
			}else if(_command == "delete"){
				_eventName = "onDeleteUser";
			}
			Observable.prototype.publish.call(_self, _getUserFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getUserFromRowData = function(rowData){
        	var _user = {};
        	
        	if(rowData){
        		_user.userId = rowData.userId;
        		_user.password = rowData.password;
            	_user.firstName = rowData.firstName;
            	_user.lastName = rowData.lastName;
            	_user.email = rowData.email;
        	}
        	
        	return _user;
        }
		
		this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
		
	}
	
	inheritPrototype(UserList, Observable);

    return UserList;
    
});

