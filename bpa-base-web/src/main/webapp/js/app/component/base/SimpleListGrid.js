define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable) {
	
	var SimpleListGrid = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = _options.url; 
		if(!_url) throw "url is required";
		
		var _urlData = _options.urlData || {};
		
		var _dataFields = _options.dataFields;
		if(!_dataFields) throw "dataFields is required";
		
		var _dataFieldId = _options.dataFieldId;
		if(!_dataFieldId) throw "dataFieldId is required";
		
		var _selectionMode = _options.selectionMode || "singlerow";
		
		var _columns = _options.columns;
		if(!_columns) throw "columns is required";
		
		var _theme = _options.theme || "metro";
		var _pageSizeOptions = _options.pageSizeOptions || ['5', '10', '20', '100'];
		var _toolbarButtons = _options.toolbarButtons;
		var _gridContextMenu = _options.gridContextMenu; 
		
		var _pageable = _options.pageable || true;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
        var _source =
        {
        	data: _urlData,
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
        
        var _listGrid = container.jqxGrid(
        {
            width: '100%',
            height: '100%',
            source: _dataAdapter,                
            pageable: _pageable,
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
        
        _listGrid.on('rowdoubleclick', function (event){ 
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _listGrid.jqxGrid('getrowdata', _rowindex);
        	Observable.prototype.publish.call(_self, _rowData, "onRowDoubleClick");
        });
        
        if(!_gridContextMenu){
        	var _defaultGridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
            _defaultGridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
            _defaultGridContextMenu.on('itemclick', function (event){
            	
            	var _menuKey = $(event.target).data("menukey");
            	
            	var _rowData = "";
            	
            	var _rowIndex = _listGrid.jqxGrid('getselectedrowindex');
            	var _rowData = _listGrid.jqxGrid('getrowdata', _rowIndex);
            	
    	 		Observable.prototype.publish.call(_self, {command: _menuKey, rowData: _rowData}, "onContextMenuClick");
            });
            
            _gridContextMenu = _defaultGridContextMenu;
        }else{
        	_gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        	_gridContextMenu.on('itemclick', function (event){
            	
            	var _menuKey = $(event.target).data("menukey");
            	
            	var _rowData = "";
            	
            	var _rowIndex = _listGrid.jqxGrid('getselectedrowindex');
            	var _rowData = _listGrid.jqxGrid('getrowdata', _rowIndex);
            	
    	 		Observable.prototype.publish.call(_self, {command: _menuKey, rowData: _rowData}, "onContextMenuClick");
            });
        }
        
        var _onRowClick = _options.onRowClick;
        if(_onRowClick){
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _listGrid.jqxGrid('getrowdata', _rowindex);
//        	Observable.prototype.publish.call(_self, _rowData, "onRowClick");
        	onRowClick(_rowData);
        }else{
        	_listGrid.on('rowclick', function (event) {
            	
            	var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = args.rowindex;
            	
            	var _rightClick = _isRightClick(_clickEvent);
                if (_rightClick) {
                	if(_listGrid.jqxGrid('getselectedrowindex') === -1){
                		_listGrid.jqxGrid('selectrow', _rowIndex);
                	}
                	
                    var _scrollTop = $(window).scrollTop();
                    var _scrollLeft = $(window).scrollLeft();
                    _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                    return false;
                }else{
                	_gridContextMenu.jqxMenu('close');
                }
            });
        }
        
        
        
        _listGrid.on('contextmenu', function (e) {
            return false;
        });
        
        this.refreshGrid = function(){
        	_listGrid.jqxGrid('updatebounddata');
        }
        
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }
        
        this.getComponent = function(){
        	return _listGrid;
        }
        
	}
	
	inheritPrototype(SimpleListGrid, Observable);

    return SimpleListGrid;
    
});

