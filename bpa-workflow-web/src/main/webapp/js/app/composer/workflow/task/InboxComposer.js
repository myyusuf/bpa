define(["notificationWindow", "view/workflow/task/InboxList", "view/workflow/task/InboxDetail", "jqxnotification"], function (NotificationWindow, InboxList, InboxDetail) {
	
	var InboxComposer = function(container){
		
		var _self = this;
		
		var _inboxListUrl = BPA.Constant.workflow.task.inboxesUrl;
		
		var _successNotification = $('<div>Task successfully Completed</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _inboxList = new InboxList(container, _inboxListUrl);
		
		InboxComposer.prototype.buildOnOpenTaskDetail = function(subClassRefInboxList){
			var _onOpenTaskDetail = function(inboxTask){
				//Consider always new instance
				var _inboxDetail = new InboxDetail(container, {inboxTask: inboxTask});
				
				var _OnCompleteTask = function(inbox){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _inboxEdit instance
						_inboxDetail.close();//new _inboxEdit instance
						_inboxList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Complete Task', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(BPA.Constant.workflow.task.inboxesCompleteUrl, inbox, _requestType, _onSuccess, _onError);
				}
				_inboxDetail.subscribe(_OnCompleteTask, "onCompleteTask");
				_inboxDetail.open();
			}
			
			return _onOpenTaskDetail;
		}
		_inboxList.subscribe(_self.buildOnOpenTaskDetail(_inboxList), "onOpenTaskDetail");
		
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
	
    return InboxComposer;
    
});