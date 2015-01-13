define(["bpaObservable", "jqxbuttons", "jqxinput", "jqxvalidator", "jqxcombobox", "jqxwindow"], function (Observable) {
	
	var ProcessDefinitionUpload = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
	}
	
	inheritPrototype(ProcessDefinitionUpload, Observable);

    return ProcessDefinitionUpload;
    
});

