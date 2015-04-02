define(["notificationWindow", "view/workflow/identity/JournalList", "view/workflow/identity/JournalEdit", "jqxnotification"], function (NotificationWindow, JournalList, JournalEdit) {
	
	var JournalComposer = function(container){
		
		var _self = this;
		
		var _journalListUrl = BPA.Constant.workflow.identity.journalsUrl;
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
			
		var _journalList = new JournalList(container, _journalListUrl);
		
		var _onAddJournal = function(){
			//Consider always new instance
			var _journalEdit = new JournalEdit(container, {});
			
			var _onSaveNewJournal = function(newJournal){
				
				var _requestType = "POST";
				
				var _onSuccess = function(result){// Depends on new _journalEdit instance
					_journalEdit.close();//new _journalEdit instance
					_journalList.refreshGrid();
					_successNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Saving Journal', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(newJournal, _requestType, _onSuccess, _onError);
			}
			_journalEdit.subscribe(_onSaveNewJournal, "onSaveNewJournal");
			_journalEdit.open();
		}
		_journalList.subscribe(_onAddJournal, "onAddJournal");
		
		JournalComposer.prototype.buildOnEditJournal = function(subClassRefJournalList){
			var _onEditJournal = function(journalToBeEdited){
				//Consider always new instance
				var _journalEdit = new JournalEdit(container, journalToBeEdited);
				
				var _onSaveJournal = function(editedJournal){
					
					var _requestType = "PUT";
					
					var _onSuccess = function(result){// Depends on new _journalEdit instance
						_journalEdit.close();//new _journalEdit instance
						_journalList.refreshGrid();
						_successNotification.jqxNotification("open");
					}
					
					var _onError = function(status, error){
						var _errorWindow = new NotificationWindow(container, {title:'Error Saving Journal', 
							content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
					}
					
					_sendData(editedJournal, _requestType, _onSuccess, _onError);
				}
				_journalEdit.subscribe(_onSaveJournal, "onSaveJournal");
				_journalEdit.open();
			}
			
			return _onEditJournal;
		}
		
		_journalList.subscribe(_self.buildOnEditJournal(_journalList), "onEditJournal");
		
		var _onDeleteJournal = function(deletedJournal){
			var _onOk = function(){
				var _requestType = "DELETE";
				var _onSuccess = function(result){
					_journalList.refreshGrid();
					_successDeleteNotification.jqxNotification("open");
				}
				
				var _onError = function(status, error){
					var _errorWindow = new NotificationWindow(container, {title:'Error Deleting Journal', 
						content: 'Error status : '+ status + '<br>Error message : '+ error, type: 'error'});
				}
				
				_sendData(deletedJournal, _requestType, _onSuccess, _onError);
			}
			
			var _deleteConfirmationWindow = new NotificationWindow(container, {title:'Delete Journal', 
			content: "Are you sure want to delete this journal : " + deletedJournal.id + " (" + deletedJournal.name + ") ?", type: 'info', onOk: _onOk});
		}
		_journalList.subscribe(_onDeleteJournal, "onDeleteJournal");
		
		var _sendData = function(data, requestType, onSuccess, onError){
			$.ajax({
			    url: _journalListUrl,
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
	
    return JournalComposer;
    
});