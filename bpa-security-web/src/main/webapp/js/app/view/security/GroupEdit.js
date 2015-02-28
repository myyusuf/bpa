define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm) {
	
	var GroupEdit = function(container, group){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(group.id){
			_isEditForm = true;
			_options.caption = "Edit Group";
		}else{
			_options.caption = "Add New Group";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "securityGroupEdit";
		
		_options.formFields = [{name: "code", label: "Code", value: group.code, isKey: true, required: true, maxLength: 30},
		                       {name: "name", label: "Name", value: group.name, required: true, maxLength: 100},
		                       {name: "description", label: "Description", value: group.description, required: true, maxLength: 100}
		                       ];
		
		_options.validationRules = [
                { fieldName: "code", message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "name", message: 'Name is required', action: 'keyup, blur', rule: 'required' }
               ];
		
		_options.width = 320;
		_options.height = 145;

		
		var _simpleEditForm = new SimpleEditForm(container, _options);
		
		var _onSaveForm = function(data){
			if(_isEditForm){
        		Observable.prototype.publish.call(_self, data, "onSaveGroup");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewGroup");
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
	
	inheritPrototype(GroupEdit, Observable);

    return GroupEdit;
    
});

