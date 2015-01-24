define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable) {
	
	var ProcessDefinitionList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.workflow.processDefinitionsUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
        var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'key', type: 'string' }
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
        });
        
        var _processDefinitionListGrid = container.jqxGrid(
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
              { text: 'Process Definition Id', datafield: 'id', width: '50%' },
              { text: 'Process Definition Key', datafield: 'key', width: '50%' }
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
        		var _startProcessButton = $('<div style="margin-left: 2px;">Start Process</div>');
        		_startProcessButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _startProcessButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _startProcessButton.click(function(event){
                	_showStartProcessPage();
                });
            }
        });
        
        var _showStartProcessPage = function(){
        	Observable.prototype.publish.call(_self, {}, "startprocess");
        }
        
        this.refreshGrid = function(){
        	_processDefinitionListGrid.jqxGrid('updatebounddata');
        }
        
	}
	
	inheritPrototype(ProcessDefinitionList, Observable);

    return ProcessDefinitionList;
    
});

