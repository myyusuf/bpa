define(["notificationWindow", "view/workflow/task/QueuedList", "view/workflow/task/QueuedDetail", "jqxnotification"], function (NotificationWindow, QueuedList, QueuedDetail) {
	
	var QueuedComposer = function(container){
		
		var _self = this;
		
		var _queuedListUrl = BPA.Constant.workflow.task.queuedsUrl;
		
		var _successNotification = $('<div>Task successfully Claimed</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _queuedList = new QueuedList(container, _queuedListUrl);
		
		QueuedComposer.prototype.buildOnOpenTaskDetail = function(subClassRefQueuedList){
			var _onOpenTaskDetail = function(queuedTask){
				//Consider always new instance
				var _queuedDetail = new QueuedDetail(container, {queuedTask: queuedTask});
				
				var _OnClaimTask = function(queued){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _queuedEdit instance
						_queuedDetail.close();//new _queuedEdit instance
						_queuedList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Claim Task', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(BPA.Constant.workflow.task.queuedsClaimUrl, queued, _requestType, _onSuccess, _onError);
				}
				_queuedDetail.subscribe(_OnClaimTask, "onClaimTask");
				_queuedDetail.open();
			}
			
			return _onOpenTaskDetail;
		}
		_queuedList.subscribe(_self.buildOnOpenTaskDetail(_queuedList), "onOpenTaskDetail");
		
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
	
    return QueuedComposer;
    
});