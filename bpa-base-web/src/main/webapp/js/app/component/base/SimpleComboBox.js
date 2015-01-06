define(["jqxcombobox"], function () {
	var SimpleComboBox = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _simpleComboBoxUrl = _options.simpleComboBoxUrl;
		if(_simpleComboBoxUrl){
			throw "Parameter simpleComboBoxUrl is required";
		}
		
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
                   data.selfAccountCode = data.code;
                   return data;
            }, 
          //this records.splice(0, 0, {code: '', name: '--Please Select--'}); placed here to prevent error max call exceed, because if _records.splice(0, 0, {code: '', name: '--Please Select--'}) is placed in 'bindingComplete' and then called when records length == 0, calling the 'insertAt : 0' will cause 'bindingComplete' recalled.
            beforeLoadComplete: function (records) {
            	records.splice(0, 0, {code: '', name: '--Please Select--'});
                return records;
            }
        	
        });
        var _simpleComboBox = container.jqxComboBox({ selectedIndex: 0, source: _simpleDataAdapter, displayMember: "code", valueMember: "code", width: 233, height: 21,
        	
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
            theme: 'metro'
        });
        
        return _simpleComboBox;
		
	}
	
	return SimpleComboBox;
});