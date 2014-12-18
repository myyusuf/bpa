define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput",
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
        	var _args = event.args, _row = _args.row, _key = _args.key, _dataField = _args.dataField;
            _showEditPage(_row);
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
        
	}
	
	inheritPrototype(AccountGroupList, Observable);

    return AccountGroupList;
    
});

