define(["composer/accounting/AccountComposer"], function (AccountComposer) {
	
	var AccountComposerExt = function(container){
		
		var _self = this;
		
		this.successNotification = $('<div>Request successfully sent to workflow for approval</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		
		AccountComposer.call(_self, container);
	}
	
	inheritPrototype(AccountComposer, AccountComposerExt);
	
	AccountComposerExt.prototype.buildOnUpdateAccount = function(accountList, accountEdit){
		
		var _self = this;
		
		var _onUpdateAccount = function(updatedAccount){
			accountEdit.close();
//			accountList.refreshGrid();
			_self.successNotification.jqxNotification("open");
		}
		
		return _onUpdateAccount;
	}
	
    return AccountComposerExt;
    
});