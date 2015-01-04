define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable) {
	
	var RoleList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.security.rolesUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
        var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' }
            ],
            id: 'code',
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
        
        var _roleListGrid = container.jqxGrid(
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
              { text: 'Code', datafield: 'code', width: '33.3%' },
              { text: 'Name', datafield: 'name', width: '33.3%' },
              { text: 'Description', datafield: 'description', width: '33.3%' }
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
        		var _addButton = $('<div style="margin-left: 2px;">New Role</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _addButton.click(function(event){
                	_showEditPage();
                });
            },
        });
        
        _roleListGrid.on('rowdoubleclick', function (event){ 
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _roleListGrid.jqxGrid('getrowdata', _rowindex);
            _showEditPage(_rowData);
        });
        
        var _gridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
        _gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        _gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	
        	var _rowData = "";
        	
        	var _rowIndex = _roleListGrid.jqxGrid('getselectedrowindex');
        	var _rowData = _roleListGrid.jqxGrid('getrowdata', _rowIndex);
        	
	 		if("add" == _menuKey){
	 			_showEditPage();
	 		}else if("edit" == _menuKey){
	 			_showEditPage(_rowData);
	 		}else if("delete" == _menuKey){
	 			_deleteRow(_rowData);
	 		}
        });
        
        _roleListGrid.on('rowclick', function (event) {
        	
        	var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = args.rowindex;
        	
        	var _rightClick = _isRightClick(_clickEvent);
            if (_rightClick) {
            	if(_roleListGrid.jqxGrid('getselectedrowindex') === -1){
            		_roleListGrid.jqxGrid('selectrow', _rowIndex);
            	}
            	
                var _scrollTop = $(window).scrollTop();
                var _scrollLeft = $(window).scrollLeft();
                _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                return false;
            }else{
            	_gridContextMenu.jqxMenu('close');
            }
        });
        
        _roleListGrid.on('contextmenu', function (e) {
            return false;
        });
        
        var _showEditPage = function(rowData){
        	Observable.prototype.publish.call(_self, _getRoleFromRowData(rowData), "editrow");
        }
        
        var _deleteRow = function(rowData){
        	Observable.prototype.publish.call(_self, _getRoleFromRowData(rowData), "deleterow");
        }
        
        var _getRoleFromRowData = function(rowData){
        	var _role = {};
        	
        	if(rowData){
        		_role.code = rowData.code;
            	_role.name = rowData.name;
            	_role.description = rowData.description;
        	}
        	
        	return _role;
        }
        
        this.refreshGrid = function(){
        	_roleListGrid.jqxGrid('updatebounddata');
        }
        
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }
        
	}
	
	inheritPrototype(RoleList, Observable);

    return RoleList;
    
});

