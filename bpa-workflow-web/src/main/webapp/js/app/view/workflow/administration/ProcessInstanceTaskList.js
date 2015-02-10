define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var ProcessInstanceTaskList = function(container, url){
		
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
		
		_options.url = url || BPA.Constant.workflow.administration.processInstanceTasksUrl;
		
		_options.columns = [
		                   { text: 'Id', datafield: 'id', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		_options.showToolbar = false;
		
		var _processInstanceId = "";
		
		_options.formatData = function (data) {
            data.processInstanceId = _processInstanceId;
            return data;
        };
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
        
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.refreshGridWithProcessInstanceId = function(processInstanceId){
        	_processInstanceId = processInstanceId;
        	_simpleListGrid.refreshGrid();
        }
        
        
	}
	
	inheritPrototype(ProcessInstanceTaskList, Observable);

    return ProcessInstanceTaskList;
    
});

