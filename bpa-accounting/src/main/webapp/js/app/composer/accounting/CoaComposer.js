define(["bpaErrorWindow", "view/accounting/CoaList", "view/accounting/CoaEdit", "jqxnotification"], function (ErrorWindow, CoaList, CoaEdit) {
	
	var CoaComposer = function(container){
		
		var coaListUrl = BPA.Constant.accounting.coaUrl;
		var onSaveCoa = function(savedData, coaEditWindow){
			sendData(savedData, coaEditWindow);
		}
			
		var options = {};
		options.url = coaListUrl;
		options.onEditRow = function(coa){
			var coaEdit = new CoaEdit(container, {editedCoa: coa, onSaveCoa: onSaveCoa, comboboxUrl: coaListUrl});
		}
		
		var coaList = new CoaList(container, options);
		
		var refreshGrid = function(){
			coaList.refreshGrid();
		}
		
		var sendData = function(savedData, coaEditWindow){
			var requestType = "";
			if(coaEditWindow.isEditForm){
        		requestType = "POST";
        	}else{
        		requestType = "PUT";
        	}
        	
			$.ajax({
			    url: BPA.Constant.accounting.coaUrl,
			    type: requestType,
			    data: savedData,
			    success: function(result) {
			    	var successNotification = $('<div>Data successfully saved</div>');
			        successNotification.jqxNotification({
			            width: 250, position: "top-right", opacity: 0.9,
			            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
			        });
			        refreshGrid();
					coaEditWindow.close();
		        	successNotification.jqxNotification("open");
			    },
			    error: function(jqXHR, status, error){
			    	var errorWindow = new ErrorWindow(container, 'Error Updating Chart of Account', 'Error status : '+ jqXHR.status + '<br>Error message : '+ error);
			    }
			});
		};
        
	}
	
    return CoaComposer;
    
});