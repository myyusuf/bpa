define(["notificationWindow", "view/workflow/identity/UserList", "view/workflow/identity/UserEdit", "jqxnotification"], function (NotificationWindow, UserList, UserEdit) {
	
	var UserComposer = function(container){
		
		var _self = this;
		
		var _userListUrl = BPA.Constant.workflow.identity.userUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _userListUrl;
		
		var _userList = new UserList(container, _options);
		
		UserComposer.prototype.buildOnUpdateUser = function(userList, userEdit){
			var _onUpdateUser = function(updatedUser){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _userEdit instance
					userEdit.close();//new _userEdit instance
					userList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving User', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(updatedUser, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateUser;
		}
		
		var _onEditRow = function(editedUser){
			
			//Consider always new instance
			var _userEdit = new UserEdit(container, {editedUser: editedUser});
			
			var _onUpdateUser = _self.buildOnUpdateUser(_userList, _userEdit);
			_userEdit.subscribe(_onUpdateUser, "updateuser");
			
			//Because this listener always depends on _userEdit new instance, it must also always defined again
			var _onAddNewUser = function(newUser){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _userEdit instance
					_userEdit.close();//new _userEdit instance
					_userList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving User', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newUser, _requestType, _onSuccess, _onError);
			}
			_userEdit.subscribe(_onAddNewUser, "addnewuser");

			_userEdit.open();
		};
		_userList.subscribe(_onEditRow, "editrow");
		
		var _onDeleteRow = function(deletedUser){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_userList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting User', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedUser, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete User', 
			content: "Are you sure want to delete this user : " + deletedUser.code + " (" + deletedUser.firstName + ") ?", type: 'info', onOk: _onOk});
			
			
		};
		_userList.subscribe(_onDeleteRow, "deleterow");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _userListUrl,
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
	
    return UserComposer;
    
});