define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable, SimpleListGrid) {
	
	var JournalList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'journalId', type: 'string' },
		                       { name: 'date', type: 'string' },
		                       { name: 'accountName', type: 'string' },
		                       { name: 'debit', type: 'string' },
		                       { name: 'credit', type: 'string' }
		                   ];
		_options.dataFieldId = "journalId";
		
		_options.url = url || BPA.Constant.workflow.identity.journalsUrl;
		
		_options.columns = [
		                   { text: 'Date', datafield: 'date', width: '25%' },
		                   { text: 'Account Name', datafield: 'name', width: '25%' },
		                   { text: 'Debit', datafield: 'date', width: '25%' },
		                   { text: 'Credit', datafield: 'name', width: '25%' }
		                 ];
		
		var _addButton = $('<div style="margin-left: 2px;">New Journal</div>');
		_addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		_addButton.click(function(event){
			Observable.prototype.publish.call(_self, {}, "onAddJournal");
        });
		
		_options.toolbarButtons = [_addButton];
		
		var _simpleListGrid = new SimpleListGrid(container, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddJournal";
			}else if(_command == "edit"){
				_eventName = "onEditJournal";
			}else if(_command == "delete"){
				_eventName = "onDeleteJournal";
			}
			Observable.prototype.publish.call(_self, _getJournalFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		var _getJournalFromRowData = function(rowData){
        	var _journal = {};
        	
        	if(rowData){
        		_journal.id = rowData.id;
            	_journal.name = rowData.name;
        	}
        	
        	return _journal;
        }
		
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
        
	}
	
	inheritPrototype(JournalList, Observable);

    return JournalList;
    
});

