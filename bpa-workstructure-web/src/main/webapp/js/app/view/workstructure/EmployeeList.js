define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var EmployeeList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'employeeId', type: 'string' },
		                       { name: 'name', type: 'string' },
		                       { name: 'photoFileName', type: 'string' }
		                   ];
		_options.dataFieldId = "employeeId";
		
		_options.url = url || BPA.Constant.workstructure.employeesUrl;
		
		_options.columns = [
		                   { text: 'Employee Id', datafield: 'employeeId', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Employee</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddEmployee");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddEmployee";
			}else if(_command == "edit"){
				_eventName = "onEditEmployee";
			}else if(_command == "delete"){
				_eventName = "onDeleteEmployee";
			}
			Observable.prototype.publish.call(_self, _getEmployeeFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getEmployeeFromRowData = function(rowData){
        	var _employee = {};
        	
        	if(rowData){
        		_employee.employeeId = rowData.employeeId;
            	_employee.name = rowData.name;
            	_employee.photoFileName = rowData.photoFileName;
        	}
        	
        	return _employee;
        }
        
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
        
	}
	
	inheritPrototype(EmployeeList, Observable);

    return EmployeeList;
    
});

