define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable) {
	
	var AccountGroupList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.accounting.accountGroupUrl;
		
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
                { name: 'defaultBalance'},
                { name: 'description', type: 'string' },
                { name: 'defaultBalanceCode', type: 'string', map: "defaultBalance>code" },
                { name: 'defaultBalanceName', type: 'string', map: "defaultBalance>name" }
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
        
        var _accountGroupListGrid = container.jqxGrid(
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
              { text: 'Code', datafield: 'code', width: '25%' },
              { text: 'Name', datafield: 'name', width: '25%' },
              { text: 'Default Balance', datafield: 'defaultBalanceName', width: '25%' },
              { text: 'Description', datafield: 'description', width: '25%' }
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
        		var _addButton = $('<div style="margin-left: 7px;">New Account Group</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _addButton.click(function(event){
                	_showEditPage();
                });
            },
        });
        
        _accountGroupListGrid.on('rowdoubleclick', function (event){ 
        	var _args = event.args, _rowindex = _args.rowindex;
        	var _rowData = _accountGroupListGrid.jqxGrid('getrowdata', _rowindex);
            _showEditPage(_rowData);
        });
        
        var _gridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
        _gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        _gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	
        	var _rowData = "";
        	
        	var _rowIndex = _accountGroupListGrid.jqxGrid('getselectedrowindex');
        	var _rowData = _accountGroupListGrid.jqxGrid('getrowdata', _rowIndex);
        	
	 		if("add" == _menuKey){
	 			_showEditPage();
	 		}else if("edit" == _menuKey){
	 			_showEditPage(_rowData);
	 		}else if("delete" == _menuKey){
	 			_deleteRow(_rowData);
	 		}
        });
        
        _accountGroupListGrid.on('rowclick', function (event) {
        	
        	var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = args.rowindex;
        	
        	var _rightClick = _isRightClick(_clickEvent);
            if (_rightClick) {
            	if(_accountGroupListGrid.jqxGrid('getselectedrowindex') === -1){
            		_accountGroupListGrid.jqxGrid('selectrow', _rowIndex);
            	}
            	
                var _scrollTop = $(window).scrollTop();
                var _scrollLeft = $(window).scrollLeft();
                _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                return false;
            }else{
            	_gridContextMenu.jqxMenu('close');
            }
        });
        
        _accountGroupListGrid.on('contextmenu', function (e) {
            return false;
        });
        
        var _showEditPage = function(rowData){
        	Observable.prototype.publish.call(_self, _getAccountGroupFromRowData(rowData), "editrow");
        }
        
        var _deleteRow = function(rowData){
        	Observable.prototype.publish.call(_self, _getAccountGroupFromRowData(rowData), "deleterow");
        }
        
        var _getAccountGroupFromRowData = function(rowData){
        	var _accountGroup = {};
        	
        	if(rowData){
        		_accountGroup.code = rowData.code;
            	_accountGroup.name = rowData.name;
            	_accountGroup.description = rowData.description;
            	if(rowData.defaultBalance){
            		_accountGroup.defaultBalance = {};
            		_accountGroup.defaultBalance.code = rowData.defaultBalance.code;
            	}
        	}
        	
        	return _accountGroup;
        }
        
        this.refreshGrid = function(){
        	_accountGroupListGrid.jqxGrid('updatebounddata');
        }
        
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }
        
	}
	
	inheritPrototype(AccountGroupList, Observable);

    return AccountGroupList;
    
});

