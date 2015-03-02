define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var GroupList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'code', type: 'string' },
		                       { name: 'name', type: 'string' },
		                       { name: 'description', type: 'string' }
		                   ];
		_options.dataFieldId = "code";
		
		_options.url = url || BPA.Constant.security.groupsUrl;
		
		_options.columns = [
		                   { text: 'Code', datafield: 'code', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Group</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddGroup");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddGroup";
			}else if(_command == "edit"){
				_eventName = "onEditGroup";
			}else if(_command == "delete"){
				_eventName = "onDeleteGroup";
			}
			Observable.prototype.publish.call(_self, _getGroupFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getGroupFromRowData = function(rowData){
        	var _group = {};
        	
        	if(rowData){
        		_group.code = rowData.code;
            	_group.name = rowData.name;
            	_group.description = rowData.description;
        	}
        	
        	return _group;
        }
		
        
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
        
	}
	
	inheritPrototype(GroupList, Observable);

    return GroupList;
    
});

