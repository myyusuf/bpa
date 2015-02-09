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
		                       { name: 'name', type: 'string' }
		                   ];
		_options.dataFieldId = "id";
		
		_options.url = url || BPA.Constant.workflow.identity.runningProcessInstancesUrl;
		
		_options.columns = [
		                   { text: 'Idx', datafield: 'id', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New RunningProcessInstance</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddRunningProcessInstance");
        });
		
		_options.toolbarButtons = [_addButton];
		
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

