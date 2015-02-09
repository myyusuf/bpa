define(["notificationWindow", "view/workflow/administration/RunningProcessInstanceList", "jqxnotification"], function (NotificationWindow, RunningProcessInstanceList) {
	
	var RunningProcessInstanceComposer = function(container){
		
		var _self = this;
		
		var _runningProcessInstanceListUrl = BPA.Constant.workflow.administration.runningProcessInstancesUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _runningProcessInstanceList = new RunningProcessInstanceList(container, _runningProcessInstanceListUrl);
		
		var _onAddRunningProcessInstance = function(){
			
		}
		_runningProcessInstanceList.subscribe(_onAddRunningProcessInstance, "onAddRunningProcessInstance");
		
		
		container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}
	
    return RunningProcessInstanceComposer;
    
});