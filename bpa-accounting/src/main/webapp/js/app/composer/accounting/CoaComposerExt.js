define(["composer/accounting/CoaComposer"], function (CoaComposer) {
	
	var CoaComposerExt = function(container){
		
		var _self = this;
		
		CoaComposer.call(_self, container);
	}
	
	inheritPrototype(CoaComposer, CoaComposer);
	
	CoaComposerExt.prototype.buildOnUpdateCoa = function(coaList, coaEdit){
		var _onUpdateCoa = function(updatedCoa){
			coaEdit.close();
//			coaList.refreshGrid();
		}
		
		return _onUpdateCoa;
	}
	
    return CoaComposerExt;
    
});