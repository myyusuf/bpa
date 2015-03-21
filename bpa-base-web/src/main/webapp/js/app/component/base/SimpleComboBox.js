define(["jqxcombobox"], function () {
	var SimpleComboBox = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _simpleComboBoxUrl = _options.url;
		if(!_simpleComboBoxUrl){
			throw "Parameter url is required";
		}
		
		var _promptText = _options.promptText || "Please Select...";
		var _theme = _options.theme || "metro";
		
		var _simpleComboSource =
        {
            datatype: "json",
            datafields: [
                { name: 'code' },
                { name: 'name' }
            ],
            url: _simpleComboBoxUrl
        };
        var _simpleDataAdapter = new $.jqx.dataAdapter(_simpleComboSource,{
        	
        	formatData: function (data) {
//                   data.selfAccountCode = data.code;
                   return data;
            }
        	
        });
        var _simpleComboBox = container.jqxComboBox({ source: _simpleDataAdapter, displayMember: "code", valueMember: "code", width: 233, height: 21,
        	promptText: _promptText, 
        	multiSelect: true,
        	renderer: function (index, label, value) {
                var _item = _simpleDataAdapter.records[index];
                if (_item != null) {
                	var _label = _item.name;
                	return _label;
                }
                
                return '';
            },
            
            renderSelectedItem: function(index, item){
                var _item = _simpleDataAdapter.records[index];
                if (_item != null) {
                	var _label = _item.name;
                	return _label;
                }
                
                return '';   
            },
            theme: _theme
        });
        
        return _simpleComboBox;
		
	}
	
	return SimpleComboBox;
});