define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var StructureView = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'code', type: 'string' },
		                       { name: 'name', type: 'string' }
		                   ];
		_options.dataFieldId = "code";
		
		_options.url = url || BPA.Constant.workstructure.positionsUrl;
		
		_options.columns = [
		                   { text: 'Code', datafield: 'code', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Position</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddPosition");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddPosition";
			}else if(_command == "edit"){
				_eventName = "onEditPosition";
			}else if(_command == "delete"){
				_eventName = "onDeletePosition";
			}
			Observable.prototype.publish.call(_self, _getPositionFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getPositionFromRowData = function(rowData){
        	var _position = {};
        	
        	if(rowData){
        		_position.code = rowData.code;
            	_position.name = rowData.name;
        	}
        	
        	return _position;
        }
        
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
        
	}
	
	inheritPrototype(StructureView, Observable);

    return StructureView;
    
});

