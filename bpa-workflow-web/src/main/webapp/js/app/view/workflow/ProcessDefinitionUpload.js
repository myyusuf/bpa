define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var ProcessDefinitionUpload = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _randomId = BPA.Util.getRandomId("processDefinitionUpload");
		
		var _editWindow = $('<div id="workflowAddDiagramWindow"></div>');
		var _windowHeader = "";
		_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Add Diagram</span></td></tr></table></div>');
		
		var _windowContent = $('<div></div>');
		
		_windowHeader.appendTo(_editWindow);
		_windowContent.appendTo(_editWindow);
        _editWindow.appendTo(container);
        
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _codeLabel = $('<td>Code</td>');
		_codeLabel.appendTo(_newRow);
		var _codeInputColumn = $('<td></td>');
		var _codeInput = $('<input type="text" class="text-input" maxlength="8" />');
		_codeInput.attr("id", "codeInput" + _randomId);
		
		_codeInput.appendTo(_codeInputColumn);
		_codeInputColumn.appendTo(_newRow);
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _fileLabel = $('<td>BPMN File</td>');
		_fileLabel.appendTo(_newRow);
		var _fileInputColumn = $('<td></td>');
		var _fileInput = $('<input type="file" class="text-input" />');
		_fileInput.attr("id", "fileInput" + _randomId);
		
		_fileInput.appendTo(_fileInputColumn);
		_fileInputColumn.appendTo(_newRow);
        
        
        _editWindow.jqxWindow('resizable', true);
        _editWindow.jqxWindow('draggable', true);
        
        _editWindow.jqxWindow({
        	autoOpen: false,
            showCollapseButton: false, 
            isModal: true,
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 270, width: 375,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
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
	
	inheritPrototype(ProcessDefinitionUpload, Observable);

    return ProcessDefinitionUpload;
    
});

