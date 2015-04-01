define(["notificationWindow", "view/workstructure/LocationList", "view/workstructure/LocationEdit", "jqxnotification"], function (NotificationWindow, LocationList, LocationEdit) {
	
	var LocationComposer = function(container){
		
		var _self = this;
		
		var _locationListUrl = BPA.Constant.workstructure.locationsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _locationList = new LocationList(container, _locationListUrl);
		
		var _onAddLocation = function(){
			//Consider always new instance
			var _locationEdit = new LocationEdit(container, {});
			
			var _onSaveNewLocation = function(newLocation){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _locationEdit instance
					_locationEdit.close();//new _locationEdit instance
					_locationList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Location', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newLocation, _requestType, _onSuccess, _onError);
			}
			_locationEdit.subscribe(_onSaveNewLocation, "onSaveNewLocation");
			_locationEdit.open();
		}
		_locationList.subscribe(_onAddLocation, "onAddLocation");
		
		LocationComposer.prototype.buildOnEditLocation = function(subClassRefLocationList){
			var _onEditLocation = function(locationToBeEdited){
				//Consider always new instance
				var _locationEdit = new LocationEdit(container, locationToBeEdited);
				
				var _onSaveLocation = function(editedLocation){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _locationEdit instance
						_locationEdit.close();//new _locationEdit instance
						_locationList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving Location', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedLocation, _requestType, _onSuccess, _onError);
				}
				_locationEdit.subscribe(_onSaveLocation, "onSaveLocation");
				_locationEdit.open();
			}
			
			return _onEditLocation;
		}
		
		_locationList.subscribe(_self.buildOnEditLocation(_locationList), "onEditLocation");
		
		var _onDeleteLocation = function(deletedLocation){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_locationList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Location', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedLocation, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Location', 
			content: "Are you sure want to delete this location : " + deletedLocation.code + " ?", type: 'info', onOk: _onOk});
		}
		_locationList.subscribe(_onDeleteLocation, "onDeleteLocation");
		
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _locationListUrl,
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
	
    return LocationComposer;
    
});