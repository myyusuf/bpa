define(["notificationWindow", "view/workflow/identity/RunningProcessInstanceList", "view/workflow/identity/RunningProcessInstanceEdit", "jqxnotification"], function (NotificationWindow, RunningProcessInstanceList, RunningProcessInstanceEdit) {
	
	var RunningProcessInstanceComposer = function(container){
		
		var _self = this;
		
		var _runningProcessInstanceListUrl = BPA.Constant.workflow.identity.runningProcessInstancesUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _runningProcessInstanceList = new RunningProcessInstanceList(container, _runningProcessInstanceListUrl);
		
		var _onAddRunningProcessInstance = function(){
			//Consider always new instance
			var _runningProcessInstanceEdit = new RunningProcessInstanceEdit(container, {});
			
			var _onSaveNewRunningProcessInstance = function(newRunningProcessInstance){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _runningProcessInstanceEdit instance
					_runningProcessInstanceEdit.close();//new _runningProcessInstanceEdit instance
					_runningProcessInstanceList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving RunningProcessInstance', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newRunningProcessInstance, _requestType, _onSuccess, _onError);
			}
			_runningProcessInstanceEdit.subscribe(_onSaveNewRunningProcessInstance, "onSaveNewRunningProcessInstance");
			_runningProcessInstanceEdit.open();
		}
		_runningProcessInstanceList.subscribe(_onAddRunningProcessInstance, "onAddRunningProcessInstance");
		
		RunningProcessInstanceComposer.prototype.buildOnEditRunningProcessInstance = function(subClassRefRunningProcessInstanceList){
			var _onEditRunningProcessInstance = function(runningProcessInstanceToBeEdited){
				//Consider always new instance
				var _runningProcessInstanceEdit = new RunningProcessInstanceEdit(container, runningProcessInstanceToBeEdited);
				
				var _onSaveRunningProcessInstance = function(editedRunningProcessInstance){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _runningProcessInstanceEdit instance
						_runningProcessInstanceEdit.close();//new _runningProcessInstanceEdit instance
						_runningProcessInstanceList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving RunningProcessInstance', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedRunningProcessInstance, _requestType, _onSuccess, _onError);
				}
				_runningProcessInstanceEdit.subscribe(_onSaveRunningProcessInstance, "onSaveRunningProcessInstance");
				_runningProcessInstanceEdit.open();
			}
			
			return _onEditRunningProcessInstance;
		}
		
		_runningProcessInstanceList.subscribe(_self.buildOnEditRunningProcessInstance(_runningProcessInstanceList), "onEditRunningProcessInstance");
		
		var _onDeleteRunningProcessInstance = function(deletedRunningProcessInstance){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_runningProcessInstanceList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting RunningProcessInstance', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedRunningProcessInstance, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete RunningProcessInstance', 
			content: "Are you sure want to delete this runningProcessInstance : " + deletedRunningProcessInstance.id + " (" + deletedRunningProcessInstance.name + ") ?", type: 'info', onOk: _onOk});
		}
		_runningProcessInstanceList.subscribe(_onDeleteRunningProcessInstance, "onDeleteRunningProcessInstance");
		
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _runningProcessInstanceListUrl,
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
	
    return RunningProcessInstanceComposer;
    
});