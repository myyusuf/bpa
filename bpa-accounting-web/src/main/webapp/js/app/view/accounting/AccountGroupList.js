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
                { name: 'accountNormal'},
                { name: 'accountNormalCode', type: 'string', map: "accountNormal>code" },
                { name: 'accountNormalName', type: 'string', map: "accountNormal>name" },
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
            selectionmode: 'multiplerows',
            columns: [
              { text: 'Code', datafield: 'code', width: '25%' },
              { text: 'Name', datafield: 'name', width: '25%' },
              { text: 'Normal', datafield: 'accountNormalName', width: '25%' },
              { text: 'Description', datafield: 'description', width: '25%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return _dataAdapter.records;
            }
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
        	
        	_accountGroupListGrid.jqxGrid('selectrow', _rowIndex);
        	
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
        
        _accountGroupListGrid.on('contextmenu', function (e) {
            return false;
        });
        
        var _showEditPage = function(rowData){
        	Observable.prototype.publish.call(_self, _getAccountGroupFromRowData(rowData), "editrow");
        }
        
        var _getAccountGroupFromRowData = function(rowData){
        	var _accountGroup = {};
        	
        	if(rowData){
        		_accountGroup.code = rowData.code;
            	_accountGroup.name = rowData.name;
            	_accountGroup.description = rowData.description;
            	if(rowData.accountNormal){
            		_accountGroup.accountNormal = {};
            		_accountGroup.accountNormal.code = rowData.accountNormal.code;
            	}
        	}
        	
        	return _accountGroup;
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

