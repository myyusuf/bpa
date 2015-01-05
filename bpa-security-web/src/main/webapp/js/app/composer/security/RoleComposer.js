define(["notificationWindow", "view/security/RoleList", "view/security/RoleEdit", "jqxnotification"], function (NotificationWindow, RoleList, RoleEdit) {
	
	var RoleComposer = function(container){
		
		var _self = this;
		
		var _roleListUrl = BPA.Constant.security.rolesUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _roleListUrl;
		
		var _roleList = new RoleList(container, _options);
		
		RoleComposer.prototype.buildOnUpdateRole = function(roleList, roleEdit){
			var _onUpdateRole = function(updatedRole){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _roleEdit instance
					roleEdit.close();//new _roleEdit instance
					roleList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Role', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(updatedRole, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateRole;
		}
		
		var _onEditRow = function(editedRole){
			
			//Consider always new instance
			var _roleEdit = new RoleEdit(container, {editedRole: editedRole});
			
			var _onUpdateRole = _self.buildOnUpdateRole(_roleList, _roleEdit);
			_roleEdit.subscribe(_onUpdateRole, "updaterole");
			
			//Because this listener always depends on _roleEdit new instance, it must also always defined again
			var _onAddNewRole = function(newRole){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _roleEdit instance
					_roleEdit.close();//new _roleEdit instance
					_roleList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Role', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newRole, _requestType, _onSuccess, _onError);
			}
			_roleEdit.subscribe(_onAddNewRole, "addnewrole");

			_roleEdit.open();
		};
		_roleList.subscribe(_onEditRow, "editrow");
		
		var _onDeleteRow = function(deletedRole){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_roleList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Role', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedRole, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Role', 
			content: "Are you sure want to delete this role : " + deletedRole.code + " (" + deletedRole.name + ") ?", type: 'info', onOk: _onOk});
			
			
		};
		_roleList.subscribe(_onDeleteRow, "deleterow");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _roleListUrl,
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
	
    return RoleComposer;
    
});