define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var GroupList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'id', type: 'string' },
		                       { name: 'name', type: 'string' }
		                   ];
		_options.dataFieldId = "id";
		
		_options.url = BPA.Constant.workflow.identity.groupsUrl;
		
		_options.columns = [
		                   { text: 'Id', datafield: 'id', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Group</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddGroup");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddGroup";
			}else if(_command == "edit"){
				_eventName = "onEditGroup";
			}else if(_command == "delete"){
				_eventName = "onDeleteGroup";
			}
			Observable.prototype.publish.call(_self, _getGroupFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getGroupFromRowData = function(rowData){
        	var _group = {};
        	
        	if(rowData){
        		_group.id = rowData.id;
            	_group.name = rowData.name;
        	}
        	
        	return _group;
        }
		
        /*var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'id',
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
        });*/
        
        /*var _groupListGrid = container.jqxGrid(
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
              { text: 'Id', datafield: 'id', width: '25%' },
              { text: 'Name', datafield: 'name', width: '25%' }
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
        		var _addButton = $('<div style="margin-left: 2px;">New Group</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _addButton.click(function(event){
                	_showEditPage();
                });
            },
        });
        
        _groupListGrid.on('rowdoubleclick', function (event){ 
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _groupListGrid.jqxGrid('getrowdata', _rowindex);
            _showEditPage(_rowData);
        });
        
        var _gridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
        _gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        _gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	
        	var _rowData = "";
        	
        	var _rowIndex = _groupListGrid.jqxGrid('getselectedrowindex');
        	var _rowData = _groupListGrid.jqxGrid('getrowdata', _rowIndex);
        	
	 		if("add" == _menuKey){
	 			_showEditPage();
	 		}else if("edit" == _menuKey){
	 			_showEditPage(_rowData);
	 		}else if("delete" == _menuKey){
	 			_deleteRow(_rowData);
	 		}
        });
        
        _groupListGrid.on('rowclick', function (event) {
        	
        	var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = args.rowindex;
        	
        	var _rightClick = _isRightClick(_clickEvent);
            if (_rightClick) {
            	if(_groupListGrid.jqxGrid('getselectedrowindex') === -1){
            		_groupListGrid.jqxGrid('selectrow', _rowIndex);
            	}
            	
                var _scrollTop = $(window).scrollTop();
                var _scrollLeft = $(window).scrollLeft();
                _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                return false;
            }else{
            	_gridContextMenu.jqxMenu('close');
            }
        });
        
        _groupListGrid.on('contextmenu', function (e) {
            return false;
        });
        
        var _showEditPage = function(rowData){
        	Observable.prototype.publish.call(_self, _getGroupFromRowData(rowData), "editrow");
        }
        
        var _deleteRow = function(rowData){
        	Observable.prototype.publish.call(_self, _getGroupFromRowData(rowData), "deleterow");
        }
        
        var _getGroupFromRowData = function(rowData){
        	var _group = {};
        	
        	if(rowData){
        		_group.id = rowData.id;
            	_group.name = rowData.name;
        	}
        	
        	return _group;
        }*/
        
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
	}
	
	inheritPrototype(GroupList, Observable);

    return GroupList;
    
});

