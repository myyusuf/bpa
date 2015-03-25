define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow", "jqxfileupload"], function (Observable, SimpleEditForm) {
	
	var EmployeeEdit = function(container, employee){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(employee.id){
			_isEditForm = true;
			_options.caption = "Edit Employee";
		}else{
			_options.caption = "Add New Employee";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "workstructureEmployeeEdit";
		var _uploadFileField = $('<div></div>').jqxFileUpload({ width: 250, multipleFilesUpload: false, autoUpload: true, uploadUrl: BPA.Constant.workstructure.employeesUrl + '/upload', fileInputName: 'name', theme: 'metro' });
		
		_options.formFields = [{name: "employeeId", label: "Employee Id", value: employee.employeeId, isKey: true, required: true, maxLength: 30},
		                       {name: "name", label: "Name", value: employee.name, required: true, maxLength: 100},
		                       {name: "photo", label: "Photo", type: "custom", customField: _uploadFileField}
		                       ];
		
		_options.validationRules = [
                { fieldName: "employeeId", message: 'EmployeeId is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "name", message: 'Name is required', action: 'keyup, blur', rule: 'required' }
               ];
		
		_options.width = "auto";
		_options.height = 187;

		
		var _simpleEditForm = new SimpleEditForm(container, _options);
		
		
		
		var _onSaveForm = function(data){
			if(_isEditForm){
        		Observable.prototype.publish.call(_self, data, "onSaveEmployee");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewEmployee");
        	}
		}
		_simpleEditForm.subscribe(_onSaveForm, "onSaveForm");
		
		_uploadFileField.on('select', function(event){
			_simpleEditForm.resizeHeight(265);
		});
		_uploadFileField.on('uploadEnd', function(event){
			_simpleEditForm.resizeHeight(190);
		});
		
		this.open = function(){
			_simpleEditForm.open();
        }
        
        this.close = function(){
        	_simpleEditForm.close();
        }
        
	}
	
	inheritPrototype(EmployeeEdit, Observable);

    return EmployeeEdit;
    
});

