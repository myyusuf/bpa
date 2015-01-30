define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable) {
	
	var SimpleListGrid = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = options.url || throw "url is required";
		var _dataFields = options.dataFields || throw "dataFields is required";
		var _dataFieldId = options.dataFieldId || throw "dataFieldId is required";
		var _selectionMode = options.selectionMode || "singlerow";
		var _columns = options.columns || throw "columns is required";
		var _theme = options.theme || "metro";
		var _pageSizeOptions = options.pageSizeOptions || ['5', '10', '20', '100'];
		var _toolbarButtons = options.toolbarButtons;
		var _gridContextMenu = options.gridContextMenu; 
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
        var _source =
        {
            datatype: "json",
            datafields: _dataFields,
            id: _dataFieldId,
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
        
        var _groupListGrid = container.jqxGrid(
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
            selectionmode: _selectionMode,
            columns: _columns,
        	theme: _theme,
        	pagesizeoptions: _pageSizeOptions,
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
        		
        		if(_toolbarButtons){
        			for(i=0; i<_toolbarButtons.length; i++){
        				var _newColumn = $('<td></td>');
                		_newColumn.appendTo(_newRow);
                		_toolbarButtons[i].appendTo(_newColumn);
        			}
        		}
        		
                toolbar.append(_searchContainer);
                
            },
        });
        
        _groupListGrid.on('rowdoubleclick', function (event){ 
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _groupListGrid.jqxGrid('getrowdata', _rowindex);
        	Observable.prototype.publish.call(_self, _rowData, "onRowDoubleClick");
        });
        
        if(!_gridContextMenu){
        	var _defaultGridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
            _defaultGridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
            _defaultGridContextMenu.on('itemclick', function (event){
            	
            	var _menuKey = $(event.target).data("menukey");
            	
            	var _rowData = "";
            	
            	var _rowIndex = _groupListGrid.jqxGrid('getselectedrowindex');
            	var _rowData = _groupListGrid.jqxGrid('getrowdata', _rowIndex);
            	
            	var _command = "";
    	 		Observable.prototype.publish.call(_self, {command: _menuKey, rowData: _rowData}, "onContextMenuClick");
            });
            
            _gridContextMenu = _defaultGridContextMenu;
        }
        
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
        
        this.refreshGrid = function(){
        	_groupListGrid.jqxGrid('updatebounddata');
        }
        
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }
        
	}
	
	inheritPrototype(SimpleListGrid, Observable);

    return SimpleListGrid;
    
});

