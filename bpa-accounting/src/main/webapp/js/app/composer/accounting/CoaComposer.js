define(["bpaErrorWindow", "notificationWindow", "view/accounting/CoaList", "view/accounting/CoaEdit", "jqxnotification"], function (ErrorWindow, NotificationWindow, CoaList, CoaEdit) {
	
	var CoaComposer = function(container){
		
		var _self = this;
		
		var _coaListUrl = BPA.Constant.accounting.coaUrl;
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _coaListUrl;
		
		var _coaList = new CoaList(container, _options);
		
		CoaComposer.prototype.buildOnUpdateCoa = function(coaList, coaEdit){
			var _onUpdateCoa = function(updatedCoa){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _coaEdit instance
					coaEdit.close();//new _coaEdit instance
					coaList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new ErrorWindow(container, 'Error saving chart of account', 'Error status : '+ status + '<br>Error message : '+ error);
				}
				
				_sendData(updatedCoa, _requestType, _onSuccess, _onError);
			}
			
			return _onUpdateCoa;
		}
		
		var _onEditRow = function(editedCoa){
			
			//Consider always new instance
			var _coaEdit = new CoaEdit(container, {editedCoa: editedCoa, comboboxUrl: _coaListUrl});
			
			var _onUpdateCoa = _self.buildOnUpdateCoa(_coaList, _coaEdit);
			_coaEdit.subscribe(_onUpdateCoa, "updatecoa");
			
			//Because this listener always depends on _coaEdit new instance, it must also always defined again
			var _onAddNewCoa = function(newCoa){
				
				var _requestType = "PUT";
				
				var _onSuccess = function(result){// Depends on new _coaEdit instance
					_coaEdit.close();//new _coaEdit instance
					_coaList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new ErrorWindow(container, 'Error saving chart of account', 'Error status : '+ status + '<br>Error message : '+ error);
				}
				
				_sendData(newCoa, _requestType, _onSuccess, _onError);
			}
			_coaEdit.subscribe(_onAddNewCoa, "addnewcoa");

			_coaEdit.open();
		};
		_coaList.subscribe(_onEditRow, "editrow");
		
		var _onDeleteRow = function(deletedCoa){
			
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_coaList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new ErrorWindow(container, 'Error Deleting Chart of Account', 'Error status : '+ status + '<br>Error message : '+ error);
				}
				
				_sendData(deletedCoa, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Chart of Account', 
			content: "Are you sure want to delete?", type: 'info', onOk: _onOk});
			
			
		};
		_coaList.subscribe(_onDeleteRow, "deleterow");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _coaListUrl,
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
	
    return CoaComposer;
    
});