define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var QueuedDetail = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _queuedTask = _options.queuedTask || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		
		var _randomId = BPA.Util.getRandomId("queuedDetail");
        
		var _editWindow = $('<div id="queuedDetailWindow"></div>');
		var _windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Queued Task Detail</span></td></tr></table></div>');
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _idLabel = $('<td>Id</td>');
		_idLabel.appendTo(_newRow);
		var _idInputColumn = $('<td></td>');
		var _idInput = $('<span style="font-weight: bold;">'+ _queuedTask.id +'</span>');
		_idInput.appendTo(_idInputColumn);
		_idInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _nameLabel = $('<td>Name</td>');
		_nameLabel.appendTo(_newRow);
		var _nameInputColumn = $('<td></td>');
		var _nameInput = $('<span style="font-weight: bold;">'+ _queuedTask.name +'</span>');
		_nameInput.appendTo(_nameInputColumn);
		_nameInputColumn.appendTo(_newRow);
		
		//-----------------------------------------------
		
		
		var _variableListContainer = $('<div></div>');
		_variableListContainer.appendTo(container);
		
		var _variables = _queuedTask.variables || [];
		_variables.push({name:'test', value: '123'});
		
		var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'name', type: 'string' },
                { name: 'value', type: 'string' }
            ],
            id: 'name',
            localdata: _variables
        };
        
        var _dataAdapter = new $.jqx.dataAdapter(_source);
		
		var _variableListGrid = _variableListContainer.jqxGrid(
		        {
		            width: '300',
		            height: '200',
		            source: _dataAdapter,                
		            autoheight: false,
		            sortable: true,
		            altrows: true,
		            enabletooltips: true,
		            editable: false,
		            selectionmode: 'singlerow',
		            columns: [
		              { text: 'Id', datafield: 'id', width: '50%' },
		              { text: 'Name', datafield: 'name', width: '50%' }
		            ],
		        	theme: 'metro',
		            showtoolbar: false
		        });
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _variableLabel = $('<td>Variables</td>');
		_variableLabel.appendTo(_newRow);
		var _variableInputColumn = $('<td></td>');
		_variableInputColumn.appendTo(_newRow);
		_variableListGrid.appendTo(_variableInputColumn);
		
		//-----------------------------------------------
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		
		var _saveButtonLabel = $('<td></td>');
		_saveButtonLabel.appendTo(_newRow);
		var _buttonColumn = $('<td colspan="2"></td>');
		var _saveButton = $('<input type="button" value="Claim" style="margin-right: 5px; margin-top: 5px;"/>');
		_saveButton.appendTo(_buttonColumn);
		
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
            minHeight: 150, minWidth: 200, height: 354, width: 407,
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
        	_assignTask();
		});
        
        _cancelButton.click(function(event){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        });
        
        var _assignTask = function(){
        	
        	var _savedData = {};
        	
        	_savedData.id = _queuedTask.id;
        	
        	Observable.prototype.publish.call(_self, _savedData, "onClaimTask");
        }
        
        this.open = function(){
        	_editWindow.jqxWindow('open');
        }
        
        this.close = function(){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        }
        
	}
	
	inheritPrototype(QueuedDetail, Observable);

    return QueuedDetail;
    
});

