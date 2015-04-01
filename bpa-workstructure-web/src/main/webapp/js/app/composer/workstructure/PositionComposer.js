define(["notificationWindow", "view/workstructure/PositionList", "view/workstructure/PositionEdit", "jqxnotification"], function (NotificationWindow, PositionList, PositionEdit) {
	
	var PositionComposer = function(container){
		
		var _self = this;
		
		var _positionListUrl = BPA.Constant.workstructure.positionsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _positionList = new PositionList(container, _positionListUrl);
		
		var _onAddPosition = function(){
			//Consider always new instance
			var _positionEdit = new PositionEdit(container, {});
			
			var _onSaveNewPosition = function(newPosition){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _positionEdit instance
					_positionEdit.close();//new _positionEdit instance
					_positionList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Position', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newPosition, _requestType, _onSuccess, _onError);
			}
			_positionEdit.subscribe(_onSaveNewPosition, "onSaveNewPosition");
			_positionEdit.open();
		}
		_positionList.subscribe(_onAddPosition, "onAddPosition");
		
		PositionComposer.prototype.buildOnEditPosition = function(subClassRefPositionList){
			var _onEditPosition = function(positionToBeEdited){
				//Consider always new instance
				var _positionEdit = new PositionEdit(container, positionToBeEdited);
				
				var _onSavePosition = function(editedPosition){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _positionEdit instance
						_positionEdit.close();//new _positionEdit instance
						_positionList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving Position', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedPosition, _requestType, _onSuccess, _onError);
				}
				_positionEdit.subscribe(_onSavePosition, "onSavePosition");
				_positionEdit.open();
			}
			
			return _onEditPosition;
		}
		
		_positionList.subscribe(_self.buildOnEditPosition(_positionList), "onEditPosition");
		
		var _onDeletePosition = function(deletedPosition){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_positionList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Position', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedPosition, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Position', 
			content: "Are you sure want to delete this position : " + deletedPosition.code + " (" + deletedPosition.name + ") ?", type: 'info', onOk: _onOk});
		}
		_positionList.subscribe(_onDeletePosition, "onDeletePosition");
		
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _positionListUrl,
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
	
    return PositionComposer;
    
});