define(["notificationWindow", "view/workflow/ProcessDefinitionList", "view/workflow/ProcessDefinitionUpload", "jqxnotification"], function (NotificationWindow, ProcessDefinitionList, ProcessDefinitionUpload) {
	
	var ProcessDefinitonComposer = function(container){
		
		var _self = this;
		
		var _processDefinitionUrl = BPA.Constant.workflow.processDefinitionsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successUnDeployNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _processDefinitionUrl;
		
		var _processDefinitionList = new ProcessDefinitionList(container, _options);
		
		
		var _onAddDiagram = function(){
			
			//Consider always new instance
			var _processDefinitionUpload = new ProcessDefinitionUpload(container, {});
			_processDefinitionUpload.open();
		};
		_processDefinitionList.subscribe(_onAddDiagram, "adddiagram");
		
		
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
	
    return ProcessDefinitonComposer;
    
});