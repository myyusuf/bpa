define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var LocationList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { address: 'code', type: 'string' },
		                       { address: 'address', type: 'string' }
		                   ];
		_options.dataFieldId = "code";
		
		_options.url = url || BPA.Constant.workstructure.locationsUrl;
		
		_options.columns = [
		                   { text: 'Code', datafield: 'code', width: '50%' },
		                   { text: 'Address', datafield: 'address', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Location</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddLocation");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddLocation";
			}else if(_command == "edit"){
				_eventName = "onEditLocation";
			}else if(_command == "delete"){
				_eventName = "onDeleteLocation";
			}
			Observable.prototype.publish.call(_self, _getLocationFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getLocationFromRowData = function(rowData){
        	var _location = {};
        	
        	if(rowData){
        		_location.code = rowData.code;
            	_location.address = rowData.address;
        	}
        	
        	return _location;
        }
        
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
	}
	
	inheritPrototype(LocationList, Observable);

    return LocationList;
    
});

