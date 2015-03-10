define(["notificationWindow", "view/workstructure/EmployeeList", "view/workstructure/EmployeeEdit", "jqxnotification"], function (NotificationWindow, EmployeeList, EmployeeEdit) {
	
	var EmployeeComposer = function(container){
		
		var _self = this;
		
		var _employeeListUrl = BPA.Constant.workstructure.employeesUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _employeeList = new EmployeeList(container, _employeeListUrl);
		
		var _onAddEmployee = function(){
			//Consider always new instance
			var _employeeEdit = new EmployeeEdit(container, {});
			
			var _onSaveNewEmployee = function(newEmployee){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _employeeEdit instance
					_employeeEdit.close();//new _employeeEdit instance
					_employeeList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Employee', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newEmployee, _requestType, _onSuccess, _onError);
			}
			_employeeEdit.subscribe(_onSaveNewEmployee, "onSaveNewEmployee");
			_employeeEdit.open();
		}
		_employeeList.subscribe(_onAddEmployee, "onAddEmployee");
		
		EmployeeComposer.prototype.buildOnEditEmployee = function(subClassRefEmployeeList){
			var _onEditEmployee = function(employeeToBeEdited){
				//Consider always new instance
				var _employeeEdit = new EmployeeEdit(container, employeeToBeEdited);
				
				var _onSaveEmployee = function(editedEmployee){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _employeeEdit instance
						_employeeEdit.close();//new _employeeEdit instance
						_employeeList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving Employee', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedEmployee, _requestType, _onSuccess, _onError);
				}
				_employeeEdit.subscribe(_onSaveEmployee, "onSaveEmployee");
				_employeeEdit.open();
			}
			
			return _onEditEmployee;
		}
		
		_employeeList.subscribe(_self.buildOnEditEmployee(_employeeList), "onEditEmployee");
		
		var _onDeleteEmployee = function(deletedEmployee){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_employeeList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Employee', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedEmployee, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Employee', 
			content: "Are you sure want to delete this employee : " + deletedEmployee.id + " (" + deletedEmployee.name + ") ?", type: 'info', onOk: _onOk});
		}
		_employeeList.subscribe(_onDeleteEmployee, "onDeleteEmployee");
		
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _employeeListUrl,
			    type: requestType,
			    data: JSON.stringify(data),
			    beforeSend: function(xhr) {
		            xhr.setRequestHeader("Accept", "application/json");
		            xhr.setRequestHeader("Content-Type", "application/json");
		        },
			    success: function(result) {
			    	onSuccess(result);
			    },
			    error: function(jqXHR, status, error){
			    	onError(jqXHR.status, error);
			    }
			});
		};
		
		container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}
	
    return EmployeeComposer;
    
});