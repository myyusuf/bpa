define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxtreegrid", "jqxinput"], function (Observable) {
	
	var CoaList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = _options.url || BPA.Constant.accounting.coaUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
        var _source =
        {
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'parentCode', type: 'string' },
                { name: 'accountGroup'}
            ],
            hierarchy:
            {
                keyDataField: { name: 'code' },
                parentDataField: { name: 'parentCode' }
            },
            id: 'code',
            beforeprocessing: function (data) {
                _source.totalrecords = data.num;
            },
            url: _url
        };
        
        var _searchInput = $('<input type="text" class="text-input" style="width: 250px;"/>');
        var _dataAdapter = new $.jqx.dataAdapter(_source, {
        	
        	formatData: function (data) {
                data.codeOrNameStartsWith = _searchInput.val();
                return data;
            },
        
            downloadComplete: function (data, status, xhr) { 
            },
            loadComplete: function (data) { 
            },
            loadError: function (xhr, status, error) { }
        });
        
        var _coaListGrid = container.jqxTreeGrid(
        {
            width: '100%',
            height: '100%',
            source: _dataAdapter,                
            pageable: true,
            pagerMode: 'advanced',
            showToolbar: true,
            toolbarheight: 40,
            renderToolbar: function(toolbar)
            {
            	toolbar.empty();
            	
                var _searchContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                var _searchTable = $('<table></table>');
                _searchTable.appendTo(_searchContainer);
        		
        		var _newRow = $('<tr></tr>');
        		_newRow.appendTo(_searchTable);
        		var _newColumn = $('<td></td>');
        		_newColumn.appendTo(_newRow);
        		_searchInput.appendTo(_newColumn);
        		
        		_newColumn = $('<td></td>');
        		_newColumn.appendTo(_newRow);
        		var _searchButton = $('<div><img src="resources/images/magnifier-medium.png"/></div>');
        		_searchButton.appendTo(_newColumn);
        		
        		_newColumn = $('<td></td>');
        		_newColumn.appendTo(_newRow);
        		var _addButton = $('<div style="margin-left: 7px;">New Account</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _searchInput.jqxInput({placeHolder: " Search Chart of Account", theme: 'metro' });
                _searchButton.jqxButton({ width: '14', height: '14', theme: 'metro' });
                _addButton.jqxButton({ width: '80', height: '16', theme: 'metro' });
                
                _searchButton.click(function(event){
                	_coaListGrid.jqxTreeGrid('updateBoundData');
                });
                _searchInput.on('keypress', function(event){
                	if(13 == event.charCode){
                		_coaListGrid.jqxTreeGrid('updateBoundData');
                	}
                });
                
                _addButton.click(function(event){
                	_showEditPage();
                });
            },
            ready: function()
            {
            },
            columns: [
              { text: 'Code', datafield: 'code', width: '33.3%', 
            	  cellsRenderer: function (row, dataField, cellValue, rowData, cellText) {
            		  if(rowData.parent){
            			  return '<span>'+ cellValue +'</span>';
            		  }else{
            			  return '<span style="font-weight: bold;">'+ cellValue +'</span>';
            		  }
            		  
            	  } 
              },
              { text: 'Name', datafield: 'name', width: '33.3%' },
              { text: 'Description', datafield: 'description', width: '33.3%' }
            ],
        	theme: 'metro'
        	
        });
        
        _coaListGrid.on('bindingComplete', function (event) { 
        	_searchInput.focus();
        	
        	var rows = _coaListGrid.jqxTreeGrid('getRows');
        	var traverseTree = function(rows) {
        		for(var i = 0; i < rows.length; i++){
        			if (rows[i].records){
        				idValue = rows[i][idColumn];
        				_coaListGrid.jqxTreeGrid('expandRow', idValue);
        				traverseTree(rows[i].records);
        			}
        		}
        	};
        	var idColumn = _coaListGrid.jqxTreeGrid('source')._source.id;
        	traverseTree(rows);
        });
        
        _coaListGrid.on('rowDoubleClick', function (event){ 
        	var _args = event.args, _row = _args.row, _key = _args.key, _dataField = _args.dataField;
            _showEditPage(_row);
        });
        
        var _gridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
        _gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        _gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	
        	var _rowData = "";
        	
        	if("edit" == _menuKey || "delete" == _menuKey){
        		var _selection = _coaListGrid.jqxTreeGrid('getSelection');
        		for (var i = 0; i < _selection.length; i++) {
            		_rowData = _selection[i];
            	}
        	}
        	
	 		if("add" == _menuKey){
	 			_showEditPage();
	 		}else if("edit" == _menuKey){
	 			_showEditPage(_rowData);
	 		}else if("delete" == _menuKey){
	 			_deleteRow(_rowData);
	 		}
        });
        
        _coaListGrid.on('rowClick', function (event) {
        	
        	var _clickEvent = event.args.originalEvent;
//            var rightClick = isRightClick(event) || $.jqx.mobile.isTouchDevice();
        	var _rightClick = _isRightClick(_clickEvent);
            if (_rightClick) {
                var _scrollTop = $(window).scrollTop();
                var _scrollLeft = $(window).scrollLeft();
                _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                return false;
            }else{
            	_gridContextMenu.jqxMenu('close');
            }
        });
        
        _coaListGrid.on('contextmenu', function (e) {
            return false;
        });
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }
        
        var _showEditPage = function(rowData){
        	Observable.prototype.publish.call(_self, _getCoaFromRowData(rowData), "editrow");
        }
        
        var _deleteRow = function(rowData){
        	Observable.prototype.publish.call(_self, _getCoaFromRowData(rowData), "deleterow");
        }
        
        var _getCoaFromRowData = function(rowData){
        	var _coa = {};
        	
        	if(rowData){
        		_coa.code = rowData.code;
            	_coa.name = rowData.name;
            	_coa.description = rowData.description;
            	
            	if(rowData.accountGroup){
            		_coa.accountGroup = {};
            		_coa.accountGroup.code = rowData.accountGroup.code;
            		_coa.accountGroup.name = rowData.accountGroup.name;
            	}
            	
            	if(rowData.parent){
            		_coa.parent = {};
            		_coa.parent.code = rowData.parent.code;
            		_coa.parent.name = rowData.parent.name;
            	}
            	_coa.parentCode = rowData.parentCode;
        	}
        	
        	return _coa;
        }
        
        this.refreshGrid = function(){
        	_coaListGrid.jqxTreeGrid('updateBoundData');
        }
        
	}
	
	inheritPrototype(CoaList, Observable);

    return CoaList;
    
});

