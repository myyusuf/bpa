define(["notificationWindow", "view/accounting/AccountGroupList", "view/accounting/AccountGroupEdit", "jqxnotification"], function (NotificationWindow, AccountGroupList, AccountGroupEdit) {
	
	var AccountGroupComposer = function(container){
		
		var _self = this;
		
		var _accountGroupListUrl = BPA.Constant.accounting.accountGroupUrl;
		var _accountNormalUrl = BPA.Constant.accounting.accountNormalUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _accountGroupListUrl;
		
		var _accountGroupList = new AccountGroupList(container, _options);
		
		AccountGroupComposer.prototype.buildOnUpdateAccountGroup = function(accountGroupList, accountGroupEdit){
			var _onUpdateAccountGroup = function(updatedAccountGroup){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _accountGroupEdit instance
					accountGroupEdit.close();//new _accountGroupEdit instance
					accountGroupList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error saving chart of account', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(updatedAccountGroup, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateAccountGroup;
		}
		
		var _onEditRow = function(editedAccountGroup){
			
			//Consider always new instance
			var _accountGroupEdit = new AccountGroupEdit(container, {editedAccountGroup: editedAccountGroup, comboboxUrl: _accountNormalUrl});
			
			var _onUpdateAccountGroup = _self.buildOnUpdateAccountGroup(_accountGroupList, _accountGroupEdit);
			_accountGroupEdit.subscribe(_onUpdateAccountGroup, "updateaccountGroup");
			
			//Because this listener always depends on _accountGroupEdit new instance, it must also always defined again
			var _onAddNewAccountGroup = function(newAccountGroup){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _accountGroupEdit instance
					_accountGroupEdit.close();//new _accountGroupEdit instance
					_accountGroupList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error saving chart of account', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newAccountGroup, _requestType, _onSuccess, _onError);
			}
			_accountGroupEdit.subscribe(_onAddNewAccountGroup, "addnewaccountGroup");

			_accountGroupEdit.open();
		};
		_accountGroupList.subscribe(_onEditRow, "editrow");
		
		var _onDeleteRow = function(deletedAccountGroup){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_accountGroupList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Chart of Account', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedAccountGroup, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Chart of Account', 
			content: "Are you sure want to delete this account group : " + deletedAccountGroup.code + " (" + deletedAccountGroup.name + ") ?", type: 'info', onOk: _onOk});
			
			
		};
		_accountGroupList.subscribe(_onDeleteRow, "deleterow");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _accountGroupListUrl,
			    type: requestType,
			    data: data,
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
	
    return AccountGroupComposer;
    
});