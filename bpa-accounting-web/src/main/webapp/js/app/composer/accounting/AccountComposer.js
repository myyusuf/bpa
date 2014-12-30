define(["notificationWindow", "view/accounting/AccountList", "view/accounting/AccountEdit", "jqxnotification"], function (NotificationWindow, AccountList, AccountEdit) {
	
	var AccountComposer = function(container){
		
		var _self = this;
		
		var _accountListUrl = BPA.Constant.accounting.accountUrl;
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _accountListUrl;
		
		var _accountList = new AccountList(container, _options);
		
		AccountComposer.prototype.buildOnUpdateAccount = function(accountList, accountEdit){
			var _onUpdateAccount = function(updatedAccount){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _accountEdit instance
					accountEdit.close();//new _accountEdit instance
					accountList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error saving chart of account', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(updatedAccount, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateAccount;
		}
		
		var _onEditRow = function(editedAccount){
			
			//Consider always new instance
			var _accountEdit = new AccountEdit(container, {editedAccount: editedAccount, comboboxUrl: _accountListUrl});
			
			var _onUpdateAccount = _self.buildOnUpdateAccount(_accountList, _accountEdit);
			_accountEdit.subscribe(_onUpdateAccount, "updateaccount");
			
			//Because this listener always depends on _accountEdit new instance, it must also always defined again
			var _onAddNewAccount = function(newAccount){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _accountEdit instance
					_accountEdit.close();//new _accountEdit instance
					_accountList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error saving chart of account', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newAccount, _requestType, _onSuccess, _onError);
			}
			_accountEdit.subscribe(_onAddNewAccount, "addnewaccount");

			_accountEdit.open();
		};
		_accountList.subscribe(_onEditRow, "editrow");
		
		var _onDeleteRow = function(deletedAccount){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_accountList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Chart of Account', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedAccount, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Chart of Account', 
			content: "Are you sure want to delete this account : " + deletedAccount.code + " (" + deletedAccount.name + ") ?", type: 'info', onOk: _onOk});
			
			
		};
		_accountList.subscribe(_onDeleteRow, "deleterow");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _accountListUrl,
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
	
    return AccountComposer;
    
});