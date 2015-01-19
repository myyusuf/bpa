define(["notificationWindow", "view/workflow/DeploymentList", "view/workflow/DeploymentUpload", "jqxnotification"], function (NotificationWindow, DeploymentList, DeploymentUpload) {
	
	var DeploymentComposer = function(container){
		
		var _self = this;
		
		var _deploymentUrl = BPA.Constant.workflow.deploymentsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successUnDeployNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _deploymentUrl;
		
		var _deploymentList = new DeploymentList(container, _options);
		
		
		var _onAddDiagram = function(){
			
			//Consider always new instance
			var _deploymentUpload = new DeploymentUpload(container, {});
			_deploymentUpload.open();
		};
		_deploymentList.subscribe(_onAddDiagram, "adddiagram");
		
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _processDefinitonListUrl,
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
	
    return DeploymentComposer;
    
});