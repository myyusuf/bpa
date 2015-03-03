define(["bpaObservable", "component/base/SimpleListGrid", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleListGrid) {
	
	var GroupSelect = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _randomId = BPA.Util.getRandomId("securityGroupSelect");
        
		var _editWindow = $('<div id="window_'+_randomId+'"></div>');
		var _windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Select Group</span></td></tr></table></div>');
		
		var _windowContent = $('<div></div>');
		
		// Grid
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
		
		_options.url = BPA.Constant.security.groupsUrl;
		
		_options.columns = [
		                   { text: 'Code', datafield: 'code', width: '50%' },
		                   { text: 'Name', datafield: 'name', width: '50%' }
		                 ];
		
		_options.width = '400';
		_options.height = '200';
		
		_options.showToolbar = false;
		_options.disableContextMenu = true;
		
		var _groupListContainer = $('<div></div>');
		_groupListContainer.appendTo(container);
		
		var _simpleListGrid = new SimpleListGrid(_groupListContainer, _options);
		
		//-------------------------------------
		
		
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_windowContent);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _gridColumn = $('<td colspan="2"></td>');
		_gridColumn.appendTo(_newRow);
		_groupListContainer.appendTo(_gridColumn);
		
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		
		var _buttonColumn = $('<td colspan="2"></td>');
		var _saveButton = $('<input type="button" value="Select" style="margin-right: 5px; margin-top: 5px;"/>');
		_saveButton.appendTo(_buttonColumn);
		_saveButton.click(function(event){
			var _selectedData = _simpleListGrid.getSelectedData();
			Observable.prototype.publish.call(_self, {code: _selectedData.code, name: _selectedData.name}, "onSelectGroup");
			_self.close();
        });
		
		var _cancelButton = $('<input type="button" value="Cancel"/>');
		_cancelButton.appendTo(_buttonColumn);
		
		_buttonColumn.appendTo(_newRow);
		
		_windowHeader.appendTo(_editWindow);
		_windowContent.appendTo(_editWindow);
        _editWindow.appendTo(container);
        
        _editWindow.jqxWindow('resizable', true);
        _editWindow.jqxWindow('draggable', true);
        
        _editWindow.jqxWindow({
        	autoOpen: false,
            showCollapseButton: false, 
            isModal: true,
            minHeight: 150, minWidth: 200, height: 300, width: 421,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
        	_editWindow.jqxWindow('destroy');
        });
        
        _saveButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        _cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        
        _saveButton.click(function(event){
		});
        
        _cancelButton.click(function(event){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        });
        
        this.open = function(){
        	_editWindow.jqxWindow('open');
        }
        
        this.close = function(){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        }
        
	}
	
	inheritPrototype(GroupSelect, Observable);

    return GroupSelect;
    
});

