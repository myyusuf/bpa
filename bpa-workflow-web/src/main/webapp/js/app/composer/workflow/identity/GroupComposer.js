define(["notificationWindow", "view/workflow/identity/GroupList", "view/workflow/identity/GroupEdit", "jqxnotification"], function (NotificationWindow, GroupList, GroupEdit) {
	
	var GroupComposer = function(container){
		
		var _self = this;
		
		var _groupListUrl = BPA.Constant.workflow.identity.groupsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _groupList = new GroupList(container, _groupListUrl);
		
		var _onAddGroup = function(){
			//Consider always new instance
			var _groupEdit = new GroupEdit(container, {});
			
			var _onSaveNewGroup = function(newGroup){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _groupEdit instance
					_groupEdit.close();//new _groupEdit instance
					_groupList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newGroup, _requestType, _onSuccess, _onError);
			}
			_groupEdit.subscribe(_onSaveNewGroup, "onSaveNewGroup");
			_groupEdit.open();
		}
		_groupList.subscribe(_onAddGroup, "onAddGroup");
		
		GroupComposer.prototype.buildOnEditGroup = function(subClassRefGroupList){
			var _onEditGroup = function(editedGroup){
				//Consider always new instance
				var _groupEdit = new GroupEdit(container, editedGroup);
				
				var _onSaveGroup = function(group){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _groupEdit instance
						_groupEdit.close();//new _groupEdit instance
						_groupList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving Group', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedGroup, _requestType, _onSuccess, _onError);
				}
				_groupEdit.subscribe(_onSaveGroup, "onSaveGroup");
				_groupEdit.open();
			}
			
			return _onEditGroup;
		}
		
		_groupList.subscribe(_self.buildOnEditGroup(_groupList), "onEditGroup");
		
		var _onDeleteGroup = function(deletedGroup){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_groupList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedGroup, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Group', 
			content: "Are you sure want to delete this group : " + deletedGroup.code + " (" + deletedGroup.firstName + ") ?", type: 'info', onOk: _onOk});
		}
		_groupList.subscribe(_onDeleteGroup, "onDeleteGroup");
		
		
		
		/*GroupComposer.prototype.buildOnUpdateGroup = function(groupList, groupEdit){
			var _onUpdateGroup = function(updatedGroup){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _groupEdit instance
					groupEdit.close();//new _groupEdit instance
					groupList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(updatedGroup, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateGroup;
		}
		
		var _onEditRow = function(editedGroup){
			
			//Consider always new instance
			var _groupEdit = new GroupEdit(container, {editedGroup: editedGroup});
			
			var _onUpdateGroup = _self.buildOnUpdateGroup(_groupList, _groupEdit);
			_groupEdit.subscribe(_onUpdateGroup, "updategroup");
			
			//Because this listener always depends on _groupEdit new instance, it must also always defined again
			var _onAddNewGroup = function(newGroup){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _groupEdit instance
					_groupEdit.close();//new _groupEdit instance
					_groupList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newGroup, _requestType, _onSuccess, _onError);
			}
			_groupEdit.subscribe(_onAddNewGroup, "addnewgroup");

			_groupEdit.open();
		};
		_groupList.subscribe(_onEditRow, "editrow");
		
		
		var _onDeleteRow = function(deletedGroup){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_groupList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Group', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedGroup, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Group', 
			content: "Are you sure want to delete this group : " + deletedGroup.code + " (" + deletedGroup.firstName + ") ?", type: 'info', onOk: _onOk});
			
			
		};
		_groupList.subscribe(_onDeleteRow, "deleterow");*/
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _groupListUrl,
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
	
    return GroupComposer;
    
});