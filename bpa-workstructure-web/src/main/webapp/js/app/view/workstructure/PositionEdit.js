define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm) {
	
	var PositionEdit = function(container, position){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(position.id){
			_isEditForm = true;
			_options.caption = "Edit Position";
		}else{
			_options.caption = "Add New Position";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "workstructurePositionEdit";
		
		_options.formFields = [{name: "code", label: "Code", value: position.code, isKey: true, required: true, maxLength: 30},
		                       {name: "name", label: "Name", value: position.name, required: true, maxLength: 100},
		                       {name: "description", label: "Description", value: position.name, maxLength: 150}
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
        		Observable.prototype.publish.call(_self, data, "onSavePosition");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewPosition");
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
	
	inheritPrototype(PositionEdit, Observable);

    return PositionEdit;
    
});

