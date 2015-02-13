define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable, SimpleEditForm) {
	
	var QueuedDetail = function(container, group){
		
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
		
		_options.formName = "workflowQueuedDetail";
		
		_options.formFields = [{name: "id", label: "Id", value: group.id, isKey: true, required: true, maxLength: 30},
		                       {name: "name", label: "Name", value: group.name, required: true, maxLength: 100}
		                       ];
		
		_options.validationRules = [
                { fieldName: "id", message: 'Id is required', action: 'keyup, blur', rule: 'required' },
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
	
	inheritPrototype(QueuedDetail, Observable);

    return QueuedDetail;
    
});

