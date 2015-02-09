define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var RunningProcessInstanceList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'id', type: 'string' },
		                       { name: 'businessKey', type: 'string' },
		                       { name: 'startedBy', type: 'string' },
		                       { name: 'startActivityId', type: 'string' },
		                       { name: 'started', type: 'string' }
		                       
		                   ];
		_options.dataFieldId = "id";
		
		_options.url = url || BPA.Constant.workflow.administration.runningProcessInstancesUrl;
		
		_options.columns = [
		                   { text: 'Id', datafield: 'id', width: '20%' },
		                   { text: 'Business Key', datafield: 'businessKey', width: '20%' },
		                   { text: 'Started By', datafield: 'startedBy', width: '20%' },
		                   { text: 'Start Activity Id', datafield: 'startActivityId', width: '20%' },
		                   { text: 'Started', datafield: 'started', width: '20%' }
		                 ];
		
		var _searchInput = $('<input type="text" class="text-input" style="width: 250px;"/>');
		_options.formatData = function (data) {
            data.processDefinitionId = _searchInput.val();
            return data;
        };
        
		_options.renderToolbar = function(toolbar)
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
    		
            toolbar.append(_searchContainer);
            
            _searchInput.jqxInput({placeHolder: " Search by Process Definition Id", theme: 'metro' });
            _searchButton.jqxButton({ width: '14', height: '14', theme: 'metro' });
            
            _searchButton.click(function(event){
            	_simpleListGrid.refreshGrid();
            });
            _searchInput.on('keypress', function(event){
            	if(13 == event.charCode){
            		_simpleListGrid.refreshGrid();
            	}
            });
            
        };
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddRunningProcessInstance";
			}else if(_command == "edit"){
				_eventName = "onEditRunningProcessInstance";
			}else if(_command == "delete"){
				_eventName = "onDeleteRunningProcessInstance";
			}
			Observable.prototype.publish.call(_self, _getRunningProcessInstanceFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getRunningProcessInstanceFromRowData = function(rowData){
        	var _runningProcessInstance = {};
        	
        	if(rowData){
        		_runningProcessInstance.id = rowData.id;
            	_runningProcessInstance.name = rowData.name;
        	}
        	
        	return _runningProcessInstance;
        }
		
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
        
	}
	
	inheritPrototype(RunningProcessInstanceList, Observable);

    return RunningProcessInstanceList;
    
});

