define(["bpaObservable", "component/base/SimpleEditForm", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow", "jqxfileupload"], function (Observable, SimpleEditForm) {
	
	var EmployeeEdit = function(container, employee){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _options = {};
		
		var _isEditForm = false;
		if(employee.employeeId){
			_isEditForm = true;
			_options.caption = "Edit Employee";
		}else{
			_options.caption = "Add New Employee";
		}
		_options.isEditForm = _isEditForm;
		
		_options.formName = "workstructureEmployeeEdit";
		
		var _uploadFileField = $('<div></div>').jqxFileUpload({ width: 250, multipleFilesUpload: false, autoUpload: true, uploadUrl: BPA.Constant.workstructure.employeesUrl + '/upload', fileInputName: 'name', theme: 'metro' });
		var _image = $('<img src="" style="border: 1px solid silver; width 100px; height: 100px;"/>');
		
		var _photoTable = $('<table></table>');
		var _photoRow1 = $('<tr></tr>');
		_photoRow1.appendTo(_photoTable);
		var _photoColumn1 = $('<td></td>');
		_photoColumn1.appendTo(_photoRow1);
		
		var _photoRow2 = $('<tr></tr>');
		_photoRow2.appendTo(_photoTable);
		var _photoColumn2 = $('<td></td>');
		_photoColumn2.appendTo(_photoRow2);
		
		_uploadFileField.appendTo(_photoColumn1);
		_image.appendTo(_photoColumn2);
		
		_options.formFields = [{name: "employeeId", label: "Employee Id", value: employee.employeeId, isKey: true, required: true, maxLength: 30},
		                       {name: "name", label: "Name", value: employee.name, required: true, maxLength: 100},
		                       {name: "photo", label: "Photo", type: "custom", customField: _photoTable}
		                       ];
		
		_options.validationRules = [
                { fieldName: "employeeId", message: 'EmployeeId is required', action: 'keyup, blur', rule: 'required' },
                { fieldName: "name", message: 'Name is required', action: 'keyup, blur', rule: 'required' }
               ];
		
		_options.width = "auto";
		_options.height = 227;

		
		var _simpleEditForm = new SimpleEditForm(container, _options);
		
		var _onSaveForm = function(data){
			if(_isEditForm){
        		Observable.prototype.publish.call(_self, data, "onSaveEmployee");
        	}else{
        		Observable.prototype.publish.call(_self, data, "onSaveNewEmployee");
        	}
		}
		_simpleEditForm.subscribe(_onSaveForm, "onSaveForm");
		
		if(_isEditForm){
			if(employee.photoFileName != undefined && employee.photoFileName != null && employee.photoFileName != ''){
				_image.attr('src', 'service/workstructure/employee/image/' + _fileName);
				_simpleEditForm.resizeHeight(310);
			}else{
				_image.hide();
			}
		}else{
			_image.hide();
		}
		
		_uploadFileField.on('select', function(event){
			_simpleEditForm.resizeHeight(310);
		});
		_uploadFileField.on('uploadEnd', function(event){
			var _response = event.args.response;
			
			var _startIndex = _response.indexOf('{');
			var _endIndex = _response.indexOf('}');
			var _jsonString = _response.slice(_startIndex, _endIndex + 1);
			var _json = JSON.parse(_jsonString);
			
			var _fileName = _json.tempFileName;
			var _fileRandomCode = _json.fileRandomCode;
			
			_image.attr('src', 'service/workstructure/employee/tempimage/' + _fileName);
			_image.show();
			console.log(_uploadFileField);
			
//			_simpleEditForm.resizeHeight(190);
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

