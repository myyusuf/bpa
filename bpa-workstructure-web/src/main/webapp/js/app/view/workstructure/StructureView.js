define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jQueryUi", "primitives"
        ], function (Observable, SimpleListGrid) {
	
	var StructureView = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		//-------
		
		var _options = new primitives.orgdiagram.Config();
		var _items = [];
		var _buttons = [];
        _buttons.push(new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-close", "Delete"));
        _buttons.push(new primitives.orgdiagram.ButtonConfig("add", "ui-icon-person", "Add"));
        
		var _maximumId = 0;
		var id = ++_maximumId;
		console.log('id --> ' + id);
		
		var _item = 
            new primitives.orgdiagram.ItemConfig({
                id: id,
                parent: '',
                title: 'firstName',
                description: 'positionName',
                context: {data: 'test'}
            });
		
		_items.push(_item);
		
		_options.items = _items;
		_options.cursorItem = 0;
		_options.hasSelectorCheckbox = primitives.common.Enabled.True;
		_options.buttons = _buttons;
		_options.hasButtons = primitives.common.Enabled.Auto;
		_options.leavesPlacementType = primitives.orgdiagram.ChildrenPlacementType.Matrix;
		
		var _chartContainer = $('<div id="orgchart" style="height: 500px">dddd</div>');
		_chartContainer.appendTo(container);
		
		$('#orgchart').orgDiagram(_options);
		$('#orgchart').orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
	        
	}
	
	inheritPrototype(StructureView, Observable);

    return StructureView;
    
});

