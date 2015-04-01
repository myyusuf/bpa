define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm) {
	
	var LocationEdit = function(container, location){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(location.code){
			_isEditForm = true;
			_options.caption = "Edit Location";
		}else{
			_options.caption = "Add New Location";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formAddress = "workstructureLocationEdit";
		
		_options.formFields = [{address: "code", label: "Code", value: location.code, isKey: true, required: true, maxLength: 30},
		                       {address: "address", label: "Address", value: location.address, required: true, maxLength: 100},
		                       {address: "description", label: "Description", value: location.address, maxLength: 150}
		                       ];
		
		_options.validationRules = [
                { fieldAddress: "code", message: 'Code is required', action: 'keyup, blur', rule: 'required' },
                { fieldAddress: "address", message: 'Address is required', action: 'keyup, blur', rule: 'required' }
               ];
		
		_options.width = "auto";
		_options.height = "auto";

		
		var _simpleEditForm = new SimpleEditForm(container, _options);
		
		var _onSaveForm = function(data){
			if(_isEditForm){
        		Observable.prototype.publish.call(_self, data, "onSaveLocation");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewLocation");
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
	
	inheritPrototype(LocationEdit, Observable);

    return LocationEdit;
    
});

