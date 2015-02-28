define(["notificationWindow", "view/security/UserList", "view/security/UserEdit", "jqxnotification"], function (NotificationWindow, UserList, UserEdit) {
	
	var UserComposer = function(container){
		
		var _self = this;
		
		var _userListUrl = BPA.Constant.security.usersUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _userList = new UserList(container, _userListUrl);
		
		var _onAddUser = function(){
			//Consider always new instance
			var _userEdit = new UserEdit(container, {});
			
			var _onSaveNewUser = function(newUser){
				
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
				
				_sendData(_userListUrl, newUser, _requestType, _onSuccess, _onError);
			}
			_userEdit.subscribe(_onSaveNewUser, "onSaveNewUser");
			_userEdit.open();
		}
		_userList.subscribe(_onAddUser, "onAddUser");
		
		UserComposer.prototype.buildOnEditUser = function(subClassRefUserList){
			var _onEditUser = function(userToBeEdited){
				
				var _userGroupUrl = BPA.Constant.security.identity.usersUrl + "/" + userToBeEdited.id + "/groups";
				_sendData(_userGroupUrl, {}, "GET", function(result){
					
					console.log(result.data);
					userToBeEdited.groups = result.data;
					
					//Consider always new instance
					var _userEdit = new UserEdit(container, userToBeEdited);
					
					var _onSaveUser = function(editedUser){
						
						var _requestType = "PUT";
						
						var _onSuccess = function(result){// Depends on new _userEdit instance
							_userEdit.close();//new _userEdit instance
							_userList.refreshGrid();
							_successNotification.jqxNotification("open");
						}
						
						var _onError = function(status, error){
							var _errorWindow = new NotificationWindow(container, {title:'Error Saving User', 
								content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
						}
						
						_sendData(_userListUrl, editedUser, _requestType, _onSuccess, _onError);
					}
					_userEdit.subscribe(_onSaveUser, "onSaveUser");
					_userEdit.open();
					
				}, null);
				
				
				
			}
			
			return _onEditUser;
		}
		
		_userList.subscribe(_self.buildOnEditUser(_userList), "onEditUser");
		
		var _onDeleteUser = function(deletedUser){
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
				
				_sendData(_userListUrl, deletedUser, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete User', 
			content: "Are you sure want to delete this user : " + deletedUser.id + " (" + deletedUser.firstName + ") ?", type: 'info', onOk: _onOk});
		}
		_userList.subscribe(_onDeleteUser, "onDeleteUser");
		
		
		var _sendData = function(url, data, requestType, onSuccess, onError){
			$.ajax({
			    url: url,
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