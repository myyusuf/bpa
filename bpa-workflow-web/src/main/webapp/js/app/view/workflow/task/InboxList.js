define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var InboxList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'id', type: 'string' },
		                       { name: 'name', type: 'string' },
		                       { name: 'variables' }
		                   ];
		_options.dataFieldId = "id";
		
		_options.url = url || BPA.Constant.workflow.task.inboxesUrl;
		
		_options.columns = [
		                   { text: 'Id', datafield: 'id', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Inbox</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddInbox");
        });
		
		_options.toolbarButtons = [_addButton];
		
		_options.gridContextMenu = $('<div><ul><li data-menukey="complete">Complete</li></ul></div>');
		_options.gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
		_options.gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	var _rowData = _simpleListGrid.getSelectedData();
        	var _eventName = "onOpenTaskDetail";
			Observable.prototype.publish.call(_self, _getInboxFromRowData(_rowData), _eventName);
        });
		
		var _getInboxFromRowData = function(rowData){
        	var _inbox = {};
        	
        	if(rowData){
        		_inbox.id = rowData.id;
            	_inbox.name = rowData.name;
            	_inbox.variables = rowData.variables;
        	}
        	
        	return _inbox;
        }
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
	}
	
	inheritPrototype(InboxList, Observable);

    return InboxList;
    
});

