define(["notificationWindow", "view/workflow/ProcessDefinitionList", "view/workflow/ProcessDefinitionUpload", "jqxnotification"], function (NotificationWindow, ProcessDefinitonList, ProcessDefinitonEdit) {
	
	var ProcessDefinitonComposer = function(container){
		
		var _self = this;
		
		var _processDefinitionUrl = BPA.Constant.workflow.processDefinitionsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successUnDeployNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _processDefinitionUrl;
		
		var _processDefinitionList = new ProcessDefinitionList(container, _options);
		
		ProcessDefinitonComposer.prototype.buildOnUpdateProcessDefiniton = function(processDefinitonList, processDefinitonEdit){
			var _onUpdateProcessDefiniton = function(updatedProcessDefiniton){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _processDefinitonEdit instance
					processDefinitonEdit.close();//new _processDefinitonEdit instance
					processDefinitonList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Account Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(updatedProcessDefiniton, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateProcessDefiniton;
		}
		
		var _onEditRow = function(editedProcessDefiniton){
			
			//Consider always new instance
			var _processDefinitonEdit = new ProcessDefinitonEdit(container, {editedProcessDefiniton: editedProcessDefiniton, comboboxUrl: _accountNormalUrl});
			
			var _onUpdateProcessDefiniton = _self.buildOnUpdateProcessDefiniton(_processDefinitonList, _processDefinitonEdit);
			_processDefinitonEdit.subscribe(_onUpdateProcessDefiniton, "updateaccountgroup");
			
			//Because this listener always depends on _processDefinitonEdit new instance, it must also always defined again
			var _onAddNewProcessDefiniton = function(newProcessDefiniton){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _processDefinitonEdit instance
					_processDefinitonEdit.close();//new _processDefinitonEdit instance
					_processDefinitonList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Account Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newProcessDefiniton, _requestType, _onSuccess, _onError);
			}
			_processDefinitonEdit.subscribe(_onAddNewProcessDefiniton, "addnewaccountgroup");

			_processDefinitonEdit.open();
		};
		_processDefinitonList.subscribe(_onEditRow, "editrow");
		
		var _onDeleteRow = function(deletedProcessDefiniton){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_processDefinitonList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Account Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedProcessDefiniton, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Account Group', 
			content: "Are you sure want to delete this account group : " + deletedProcessDefiniton.code + " (" + deletedProcessDefiniton.name + ") ?", type: 'info', onOk: _onOk});
			
			
		};
		_processDefinitonList.subscribe(_onDeleteRow, "deleterow");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _processDefinitonListUrl,
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
	
    return ProcessDefinitonComposer;
    
});