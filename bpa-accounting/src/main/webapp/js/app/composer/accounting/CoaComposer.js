define(["bpaErrorWindow", "view/accounting/CoaList", "view/accounting/CoaEdit", "jqxnotification"], function (ErrorWindow, CoaList, CoaEdit) {
	
	var CoaComposer = function(container){
		
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
		_options.onEditRow = function(coa, coaList){
			var _onSaveCoa = function(savedData, coaEdit){
				
				var _requestType = "";
				if(coaEdit.isEditForm){
					_requestType = "POST";
	        	}else{
	        		_requestType = "PUT";
	        	}
				
				var _onSuccess = function(result){
					coaEdit.close();
					coaList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new ErrorWindow(container, 'Error Updating Chart of Account', 'Error status : '+ status + '<br>Error message : '+ error);
				}
				
				_sendData(savedData, _requestType, _onSuccess, _onError);
			}
			var _coaEdit = new CoaEdit(container, {editedCoa: coa, onSaveCoa: _onSaveCoa, comboboxUrl: _coaListUrl});
			_coaEdit.open();
		};
		
		_options.onDeleteRow = function(row, coaList){
			var _requestType = "DELETE";
			var _onSuccess = function(result){
				coaList.refreshGrid();
				_successDeleteNotification.jqxNotification("open");
			}
			
			var _onError = function(status, error){
				var _errorWindow = new ErrorWindow(container, 'Error Deleting Chart of Account', 'Error status : '+ status + '<br>Error message : '+ error);
			}
			
			_sendData({code: row.code}, _requestType, _onSuccess, _onError);
		};
		
		var _coaList = new CoaList(container, _options);
		container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
		
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
        
	}
	
    return CoaComposer;
    
});