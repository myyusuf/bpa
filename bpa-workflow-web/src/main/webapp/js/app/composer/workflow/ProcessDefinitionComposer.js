define(["notificationWindow", "view/workflow/ProcessDefinitionList", "view/workflow/ProcessDefinitionUpload", "jqxnotification"], function (NotificationWindow, ProcessDefinitionList, ProcessDefinitionUpload) {
	
	var ProcessDefinitonComposer = function(container){
		
		var _self = this;
		
		var _processDefinitonListUrl = BPA.Constant.workflow.processDefinitionsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successStartProcessNotification = $('<div>Process successfully started</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _options = {};
		_options.url = _processDefinitonListUrl;
		
		var _processDefinitionList = new ProcessDefinitionList(container, _options);
		
		
		var _onStartProcess = function(data){
			
			var _onOk = function(){
				var _requestType = "PUT";
				var _onSuccess = function(result){
					_processDefinitionList.refreshGrid();
					_successStartProcessNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Starting Process', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_startProcessRequest({processDefinitionKey: data.processDefinitionKey}, _requestType, _onSuccess, _onError);
			}
			
			var _startProcessConfirmationWindow = new NotificationWindow(container, {title:'Start Process', 
			content: "Are you sure want start this process : " + data.processDefinitionKey + " ?", type: 'info', onOk: _onOk});
		};
		_processDefinitionList.subscribe(_onStartProcess, "startprocess");
		
		
		var _startProcessRequest = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: BPA.Constant.workflow.startProcessUrl,
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