define(["notificationWindow", "view/workflow/task/QueuedList", "view/workflow/task/QueuedDetail", "jqxnotification"], function (NotificationWindow, QueuedList, QueuedDetail) {
	
	var QueuedComposer = function(container){
		
		var _self = this;
		
		var _queuedListUrl = BPA.Constant.workflow.identity.queuedsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _queuedList = new QueuedList(container, _queuedListUrl);
		
		var _onAddQueued = function(){
			//Consider always new instance
			var _queuedEdit = new QueuedEdit(container, {});
			
			var _onSaveNewQueued = function(newQueued){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _queuedEdit instance
					_queuedEdit.close();//new _queuedEdit instance
					_queuedList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Queued', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newQueued, _requestType, _onSuccess, _onError);
			}
			_queuedEdit.subscribe(_onSaveNewQueued, "onSaveNewQueued");
			_queuedEdit.open();
		}
		_queuedList.subscribe(_onAddQueued, "onAddQueued");
		
		QueuedComposer.prototype.buildOnEditQueued = function(subClassRefQueuedList){
			var _onEditQueued = function(queuedToBeEdited){
				//Consider always new instance
				var _queuedEdit = new QueuedEdit(container, queuedToBeEdited);
				
				var _onSaveQueued = function(editedQueued){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _queuedEdit instance
						_queuedEdit.close();//new _queuedEdit instance
						_queuedList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving Queued', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedQueued, _requestType, _onSuccess, _onError);
				}
				_queuedEdit.subscribe(_onSaveQueued, "onSaveQueued");
				_queuedEdit.open();
			}
			
			return _onEditQueued;
		}
		
		_queuedList.subscribe(_self.buildOnEditQueued(_queuedList), "onEditQueued");
		
		var _onDeleteQueued = function(deletedQueued){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_queuedList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Queued', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedQueued, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Queued', 
			content: "Are you sure want to delete this queued : " + deletedQueued.id + " (" + deletedQueued.name + ") ?", type: 'info', onOk: _onOk});
		}
		_queuedList.subscribe(_onDeleteQueued, "onDeleteQueued");
		
		
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _queuedListUrl,
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
	
    return QueuedComposer;
    
});