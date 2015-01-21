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
			
			var _onUploadDiagram = function(formData){
				_sendFile(formData, 'POST', function(result){
					_deploymentUpload.close();//new _accountGroupEdit instance
					_deploymentList.refreshGrid();
					_successNotification.jqxNotification("open");
				}, null);
			};
			_deploymentUpload.subscribe(_onUploadDiagram, "uploaddiagram");
			
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
		
		var _sendFile = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: BPA.Constant.workflow.deploymentsUrl,
			    type: requestType,
			    data: data,
			    cache: false,
		        dataType: 'json',
		        processData: false, // Don't process the files
		        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		        success: function(data, textStatus, jqXHR)
		        {
		            if(typeof data.error === 'undefined')
		            {
		                // Success so call function to process the form
		                //submitForm(event, data);
		            	onSuccess(data);
		            	console.log('success upload file');
		            }
		            else
		            {
		                // Handle errors here
		                console.log('ERRORS: ' + data.error);
		            }
		        },
		        error: function(jqXHR, textStatus, errorThrown)
		        {
		            // Handle errors here
		            console.log('ERRORS: ' + textStatus);
		        }
			});
		};
		
		container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}
	
    return DeploymentComposer;
    
});