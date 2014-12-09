define(["composer/accounting/CoaComposer"], function (CoaComposer) {
	
	var CoaComposerExt = function(container){
		
		var _self = this;
		
		this.successNotification = $('<div>Request successfully sent to workflow for approval</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		
		CoaComposer.call(_self, container);
	}
	
	inheritPrototype(CoaComposer, CoaComposer);
	
	CoaComposerExt.prototype.buildOnUpdateCoa = function(coaList, coaEdit){
		
		var _self = this;
		
		var _onUpdateCoa = function(updatedCoa){
			coaEdit.close();
//			coaList.refreshGrid();
			_self.successNotification.jqxNotification("open");
		}
		
		return _onUpdateCoa;
	}
	
    return CoaComposerExt;
    
});