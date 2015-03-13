define(["bpaObservable", "component/base/SimpleListGrid", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jQueryUi", "primitives"
        ], function (Observable, SimpleListGrid) {
	
	var StructureView = function(container, url){
		
		var _self = this;
		
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
		
		var _id = ++_maximumId;
		console.log('_maximumId --> ' + _maximumId);
		
		var _item = 
            new primitives.orgdiagram.ItemConfig({
                id: _id,
                parent: null,
                title: 'firstName',
                description: 'positionName',
                context: {data: 'test'},
                image: "service/workstructure/employee/loadimage/"
            });
		
		_items.push(_item);
		
		_options.items = _items;
		_options.cursorItem = 0;
		_options.hasSelectorCheckbox = primitives.common.Enabled.True;
		_options.buttons = _buttons;
		_options.hasButtons = primitives.common.Enabled.Auto;
		_options.leavesPlacementType = primitives.orgdiagram.ChildrenPlacementType.Matrix;
		
		var _chartContainer = $('<div id="orgchart" style="height: 500px;">dd</div>');
		_chartContainer.appendTo(container);
		
		$('#orgchart').orgDiagram(_options);
		$('#orgchart').orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
		
		var _newItem = new primitives.orgdiagram.ItemConfig({
            id: ++_maximumId,
            parent: _id,
            title: 'employeeName',
            description: 'positionName',
            context: {data: 'test'},
            image: "service/workstructure/employee/loadimage/"
        });

    	_items.push(_newItem);
        $("#orgchart").orgDiagram({
            items: _items,
            cursorItem: _newItem.id
        });
        $('#orgchart').orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
	        
		
		/*var _chartContainer = $('<div id="orgchart" style="height: 500px; background-color: silver;">dd</div>');
		_chartContainer.appendTo(container);
		
		var options = new primitives.orgdiagram.Config();

        var items = [
            new primitives.orgdiagram.ItemConfig({
                id: 0,
                parent: null,
                title: "Scott Aasrud",
                description: "VP, Public Sector",
                image: "demo/images/photos/a.png"
            }),
            new primitives.orgdiagram.ItemConfig({
                id: 1,
                parent: 0,
                title: "Ted Lucas",
                description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            }),
            new primitives.orgdiagram.ItemConfig({
                id: 2,
                parent: 0,
                title: "Joao Stuger",
                description: "Business Solutions, US",
                image: "demo/images/photos/c.png"
            })
        ];

        options.items = items;
        options.cursorItem = 0;
        options.hasSelectorCheckbox = primitives.common.Enabled.True;

        jQuery("#orgchart").orgDiagram(options);*/
	}
	
	inheritPrototype(StructureView, Observable);

    return StructureView;
    
});

