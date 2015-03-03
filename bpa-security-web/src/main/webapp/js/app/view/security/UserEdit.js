define(["bpaObservable", "component/base/SimpleEditForm", "view/security/GroupSelect", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm, GroupSelect) {
	
	var UserEdit = function(container, user){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(user.userId){
			_isEditForm = true;
			_options.caption = "Edit User";
		}else{
			_options.caption = "Add New User";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "securityUserEdit";
		
		var _groupListContainer = $('<div></div>');
		_groupListContainer.appendTo(container);
		
		var _groups = user.groups || [];
//		_groups.push({id:'1', name: 'abc'});
		
		var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'code',
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
		              { text: 'Code', datafield: 'code', width: '50%' },
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
		                		
		                		var _result = $.grep(_groups, function(e){ return e.code == selectedGroup.code; });
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
		                		if(_groups[i].code == _rowData.code){
		                			_resultIndex = i;
		                		}
		                	}
		                	
		                	_groups.splice(_resultIndex, 1);
		                	_groupListGrid.jqxGrid('updatebounddata');
		                });
		            },
		        });
		
		_options.formFields = [
		                       {name: "userId", label: "UserId", value: user.userId, required: true, maxLength: 30},
		                       {name: "password", label: "Password", value: user.password, type: 'password', required: true, maxLength: 100},
		                       {name: "firstName", label: "First Name", value: user.firstName, required: true, maxLength: 100},
		                       {name: "lastName", label: "Last Name", value: user.lastName, maxLength: 100},
		                       {name: "email", label: "Email", value: user.email, required: true, maxLength: 100},
		                       {name: "groups", label: "Groups", type: 'custom', customField : _groupListGrid}
		                       ];
		
		_options.validationRules = [
		        { fieldName: "userId", message: 'UserId is required', action: 'keyup, blur', rule: 'required' },
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
		
        
	}
	
	inheritPrototype(UserEdit, Observable);

    return UserEdit;
    
});

