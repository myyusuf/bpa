define(["bpaObservable", "component/base/SimpleEditForm", "view/workflow/identity/GroupSelect", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm, GroupSelect) {
	
	var UserEdit = function(container, user){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(user.id){
			_isEditForm = true;
			_options.caption = "Edit User";
		}else{
			_options.caption = "Add New User";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "workflowUserEdit";
		
		var _groupListContainer = $('<div></div>');
		_groupListContainer.appendTo(container);
		
		var _groups = user.groups || [];
//		_groups.push({id:'1', name: 'abc'});
		
		var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'id',
            localdata: _groups
        };
        
        var _dataAdapter = new $.jqx.dataAdapter(_source);
		
		var _groupListGrid = _groupListContainer.jqxGrid(
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
//		        	virtualmode: true,
//		        	rendergridrows: function () {
//		                return _dataAdapter.records;
//		            },
		            showtoolbar: true,
		            toolbarheight: 40,
		            rendertoolbar: function(toolbar)
		            {
		            	toolbar.empty();
		            	
		                var _searchContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
		                var _searchTable = $('<table></table>');
		                _searchTable.appendTo(_searchContainer);
		                toolbar.append(_searchContainer);
		        		
		        		var _newRow = $('<tr></tr>');
		        		_newRow.appendTo(_searchTable);
		        		var _newColumn = $('<td></td>');
		        		_newColumn.appendTo(_newRow);
		        		var _addButton = $('<div style="margin-left: 2px;">Add Group</div>');
		        		_addButton.appendTo(_newColumn);
		                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		                _addButton.click(function(event){
//		                	_groups.push({id:'2', name: 'def'});
//		                	_groupListGrid.jqxGrid('updatebounddata');
		                	
		                	var _groupSelect = new GroupSelect(container);
		                	_groupSelect.subscribe(function(selectedGroup){
		                		
		                		var _result = $.grep(_groups, function(e){ return e.id == selectedGroup.id; });
		                		if(_result.length == 0){
		                			_groups.push(selectedGroup);
				                	_groupListGrid.jqxGrid('updatebounddata');
		                		}
		                		
		                	}, "onSelectGroup");
		                	_groupSelect.open();
		                });
		                
		                _newColumn = $('<td></td>');
		        		_newColumn.appendTo(_newRow);
		        		var _deleteButton = $('<div style="margin-left: 2px;">Delete</div>');
		        		_deleteButton.appendTo(_newColumn);
		                _deleteButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
		                _deleteButton.click(function(event){
		                	
		                	var _rowIndex = _groupListGrid.jqxGrid('getselectedrowindex');
		                	var _rowData = _groupListGrid.jqxGrid('getrowdata', _rowIndex);
		                	var _resultIndex = -1;
		                	for(i=0;i<_groups.length;i++){
		                		if(_groups[i].id == _rowData.id){
		                			_resultIndex = i;
		                		}
		                	}
		                	
		                	_groups.splice(_resultIndex, 1);
		                	_groupListGrid.jqxGrid('updatebounddata');
		                });
		            },
		        });
		
		_options.formFields = [{name: "id", label: "Id", value: user.id, isKey: true, required: true, maxLength: 30},
		                       {name: "password", label: "Password", value: user.lastName, type: 'password', required: true, maxLength: 100},
		                       {name: "firstName", label: "First Name", value: user.firstName, required: true, maxLength: 100},
		                       {name: "lastName", label: "Last Name", value: user.lastName, maxLength: 100},
		                       {name: "email", label: "Email", value: user.email, required: true, maxLength: 100},
		                       {name: "groups", label: "Groups", type: 'custom', customField : _groupListGrid}
		                       ];
		
		_options.validationRules = [
                { fieldName: "id", message: 'Id is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "password", message: 'Password is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "firstName", message: 'First Name is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "email", message: 'Email is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "email", message: 'Invalid email format', action: 'keyup, blur', rule: 'email' }
               ]

		_options.width = 423;
		_options.height = 440;
		
		var _simpleEditForm = new SimpleEditForm(container, _options);
		
		var _onSaveForm = function(data){
			
			data.groups = _groups;
			if(_isEditForm){
        		Observable.prototype.publish.call(_self, data, "onSaveUser");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewUser");
        	}
		}
		_simpleEditForm.subscribe(_onSaveForm, "onSaveForm");
		
		this.open = function(){
			_simpleEditForm.open();
        }
        
        this.close = function(){
        	_simpleEditForm.close();
        }
		
		/*var _self = this;
		
		var _options = options || {};
		
		var _editedUser = _options.editedUser || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _isEditForm = _editedUser.userId != undefined && _editedUser.userId != null;
		
		var _randomId = BPA.Util.getRandomId("workflow_userEdit");
        
		var _editWindow = $('<div id="workflow_userEditWindow"></div>');
		var _windowHeader = "";
		if(_isEditForm){
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">Account Group Edit</span></td></tr></table></div>');
		}else{
			_windowHeader = $('<div style="height: 18px; padding: 5px; padding-top: 3px; padding-bottom: 7px;"><table><tr><td><img src="resources/images/application-dialog.png" alt="" style="margin-right: 1px" /></td><td valign="center"><span style="font-weight: bold">New Account Group</span></td></tr></table></div>');
		}
		
		var _windowContent = $('<div></div>');
		
		var _editForm = $('<form></form>');
		_editForm.appendTo(_windowContent);
		var _editTable = $('<table class="edit-table"></table>');
		_editTable.appendTo(_editForm);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _userIdLabel = $('<td>User Id</td>');
		_userIdLabel.appendTo(_newRow);
		var _userIdInputColumn = $('<td></td>');
		var _userIdInput = $('<input type="text" class="text-input" maxlength="8" style="width: 233px; float: left;"/>');
		_userIdInput.attr("id", "userIdInput" + _randomId);
		
		if(_isEditForm){
			_userIdInput.val(_editedUser.userId);
			_userIdInput.jqxInput({disabled: true});
		}
		_userIdInput.appendTo(_userIdInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_userIdInputColumn);
		_userIdInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _passwordLabel = $('<td>Password</td>');
		_passwordLabel.appendTo(_newRow);
		var _passwordInputColumn = $('<td></td>');
		var _passwordInput = $('<input type="text" class="text-input" maxlength="20" style="width: 233px; float: left;"/>');
		_passwordInput.attr("id", "passwordInput" + _randomId);
		if(_isEditForm){
			_passwordInput.val(_editedUser.password);
		}
		_passwordInput.appendTo(_passwordInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_passwordInputColumn);
		_passwordInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _firstNameLabel = $('<td>First Name</td>');
		_firstNameLabel.appendTo(_newRow);
		var _firstNameInputColumn = $('<td></td>');
		var _firstNameInput = $('<input type="text" class="text-input" maxlength="30" style="width: 233px; float: left;"/>');
		_firstNameInput.attr("id", "firstNameInput" + _randomId);
		if(_isEditForm){
			_firstNameInput.val(_editedUser.firstName);
		}
		_firstNameInput.appendTo(_firstNameInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_firstNameInputColumn);
		_firstNameInputColumn.appendTo(_newRow);
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _lastNameLabel = $('<td>Last Name</td>');
		_lastNameLabel.appendTo(_newRow);
		var _lastNameInputColumn = $('<td></td>');
		var _lastNameInput = $('<input type="text" class="text-input" maxlength="30" style="width: 233px;"/>');
		_lastNameInput.attr("id", "lastNameInput" + _randomId);
		if(_isEditForm){
			_lastNameInput.val(_editedUser.lastName);
		}
		_lastNameInput.appendTo(_lastNameInputColumn);
		_lastNameInputColumn.appendTo(_newRow);
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		var _emailLabel = $('<td>Email</td>');
		_emailLabel.appendTo(_newRow);
		var _emailInputColumn = $('<td></td>');
		var _emailInput = $('<input type="text" class="text-input" maxlength="30" style="width: 233px; float: left;"/>');
		_emailInput.attr("id", "emailInput" + _randomId);
		if(_isEditForm){
			_emailInput.val(_editedUser.email);
		}
		_emailInput.appendTo(_emailInputColumn);
		$(BPA.Constant.requiredFieldSymbol).appendTo(_emailInputColumn);
		_emailInputColumn.appendTo(_newRow);
		
		
		_newRow = $('<tr></tr>');
		_newRow.appendTo(_editTable);
		
		var _saveButtonLabel = $('<td></td>');
		_saveButtonLabel.appendTo(_newRow);
		var _buttonColumn = $('<td colspan="2"></td>');
		var _saveButton = $('<input type="button" value="Save" style="margin-right: 5px; margin-top: 5px;"/>');
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
            maxHeight: 400, maxWidth: 700, minHeight: 150, minWidth: 200, height: 236, width: 346,
            initContent: function () {
            	_editWindow.jqxWindow('focus');
            },
            theme: 'metro'
        });
        
        _editWindow.on('close', function (event) { 
        	_editWindow.jqxWindow('destroy');
        });
        
        _userIdInput.jqxInput({ theme: 'metro' });
        _passwordInput.jqxInput({ theme: 'metro' });
        _firstNameInput.jqxInput({ theme: 'metro' });
        _lastNameInput.jqxInput({ theme: 'metro' });
        _emailInput.jqxInput({ theme: 'metro' });
        
        _editForm.jqxValidator({
        	closeOnClick: true,
        	arrow: false,
            rules: [
                    { input: "#" + _userIdInput.attr("id"), message: 'User Id is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _passwordInput.attr("id"), message: 'Password is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _firstNameInput.attr("id"), message: 'First Name is required', action: 'keyup, blur', rule: 'required' },
                    { input: "#" + _emailInput.attr("id"), message: 'Email is required', action: 'keyup, blur', rule: 'required' }
                   
                   ]
        	});
        
        _editForm.on('validationSuccess', function (event) { 
        	_saveUser();
        }); 
        
        _saveButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        _cancelButton.jqxButton({ width: 60, height: 25, theme: 'metro'});
        
        _saveButton.click(function(event){
        	_editForm.jqxValidator('validate');
		});
        
        _cancelButton.click(function(event){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        });
        
        var _saveUser = function(){
        	
        	var _savedData = {};
        	
        	if(_isEditForm){
        		_savedData.userId = _editedUser.userId;
        	}else{
        		_savedData.userId = _userIdInput.val().replace(/-/g, "");
        	}
        	_savedData.password = _passwordInput.val();
        	_savedData.firstName = _firstNameInput.val();
        	_savedData.lastName = _lastNameInput.val();
        	_savedData.email = _emailInput.val();
        	
        	if(_isEditForm){
        		Observable.prototype.publish.call(_self, _savedData, "updateuser");
        	}else{
        		Observable.prototype.publish.call(_self, _savedData, "addnewuser");
        	}
        }
        
        this.open = function(){
        	_editWindow.jqxWindow('open');
        }
        
        this.close = function(){
        	_editWindow.jqxWindow('close');
        	_editWindow.jqxWindow('destroy');
        }*/
        
	}
	
	inheritPrototype(UserEdit, Observable);

    return UserEdit;
    
});

