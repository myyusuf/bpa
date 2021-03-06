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
		                       { name: 'id', type: 'string' },
		                       { name: 'password', type: 'string' },
		                       { name: 'firstName', type: 'string' },
		                       { name: 'lastName', type: 'string' },
		                       { name: 'email', type: 'string' }
		                   ];
		_options.dataFieldId = "id";
		
		_options.url = BPA.Constant.workflow.identity.usersUrl;
		
		_options.columns = [
		                   { text: 'Id', datafield: 'id', width: '25%' },
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
        		_user.id = rowData.id;
            	_user.firstName = rowData.firstName;
            	_user.lastName = rowData.lastName;
            	_user.email = rowData.email;
        	}
        	
        	return _user;
        }
		
		this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
		
		/*var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.workflow.identity.usersUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
        var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'userId', type: 'string' },
                { name: 'firstName', type: 'string' },
                { name: 'lastName', type: 'string' },
                { name: 'email', type: 'string' }
            ],
            id: 'userId',
            beforeprocessing: function (data) {
                _source.totalrecords = data.num;
            },
            url: _url
        };
        
        var _dataAdapter = new $.jqx.dataAdapter(_source, {
            downloadComplete: function (data, status, xhr) { 
            },
            loadComplete: function (data) { 
            	//console.log('data : ' + data);
            	
            },
            loadError: function (xhr, status, error) { }
        });
        
        var _userListGrid = container.jqxGrid(
        {
            width: '100%',
            height: '100%',
            source: _dataAdapter,                
            pageable: true,
            autoheight: false,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: false,
            selectionmode: 'singlerow',
            columns: [
              { text: 'User Id', datafield: 'userId', width: '25%' },
              { text: 'First Name', datafield: 'firstName', width: '25%' },
              { text: 'Last Name', datafield: 'lastName', width: '25%' },
              { text: 'Email', datafield: 'email', width: '25%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return _dataAdapter.records;
            },
            showtoolbar: true,
            toolbarheight: 40,
            rendertoolbar: function(toolbar)
            {
            	toolbar.empty();
            	
                var _searchContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                var _searchTable = $('<table></table>');
                _searchTable.appendTo(_searchContainer);
        		
        		var _newRow = $('<tr></tr>');
        		_newRow.appendTo(_searchTable);
        		var _newColumn = $('<td></td>');
        		_newColumn.appendTo(_newRow);
        		var _addButton = $('<div style="margin-left: 2px;">New User</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _addButton.click(function(event){
                	_showEditPage();
                });
            },
        });
        
        _userListGrid.on('rowdoubleclick', function (event){ 
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _userListGrid.jqxGrid('getrowdata', _rowindex);
            _showEditPage(_rowData);
        });
        
        var _gridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
        _gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        _gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	
        	var _rowData = "";
        	
        	var _rowIndex = _userListGrid.jqxGrid('getselectedrowindex');
        	var _rowData = _userListGrid.jqxGrid('getrowdata', _rowIndex);
        	
	 		if("add" == _menuKey){
	 			_showEditPage();
	 		}else if("edit" == _menuKey){
	 			_showEditPage(_rowData);
	 		}else if("delete" == _menuKey){
	 			_deleteRow(_rowData);
	 		}
        });
        
        _userListGrid.on('rowclick', function (event) {
        	
        	var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = args.rowindex;
        	
        	var _rightClick = _isRightClick(_clickEvent);
            if (_rightClick) {
            	if(_userListGrid.jqxGrid('getselectedrowindex') === -1){
            		_userListGrid.jqxGrid('selectrow', _rowIndex);
            	}
            	
                var _scrollTop = $(window).scrollTop();
                var _scrollLeft = $(window).scrollLeft();
                _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                return false;
            }else{
            	_gridContextMenu.jqxMenu('close');
            }
        });
        
        _userListGrid.on('contextmenu', function (e) {
            return false;
        });
        
        var _showEditPage = function(rowData){
        	Observable.prototype.publish.call(_self, _getUserFromRowData(rowData), "editrow");
        }
        
        var _deleteRow = function(rowData){
        	Observable.prototype.publish.call(_self, _getUserFromRowData(rowData), "deleterow");
        }
        
        var _getUserFromRowData = function(rowData){
        	var _user = {};
        	
        	if(rowData){
        		_user.userId = rowData.userId;
            	_user.firstName = rowData.firstName;
            	_user.lastName = rowData.lastName;
            	_user.email = rowData.email;
        	}
        	
        	return _user;
        }
        
        this.refreshGrid = function(){
        	_userListGrid.jqxGrid('updatebounddata');
        }
        
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }*/
        
	}
	
	inheritPrototype(UserList, Observable);

    return UserList;
    
});

