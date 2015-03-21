define(["bpaObservable", "notificationWindow", "component/base/SimpleListGrid", "view/workstructure/StructureEdit", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxnotification", "jQueryUi", "primitives"
        ], function (Observable, NotificationWindow, SimpleListGrid, StructureEdit) {
	
	var StructureView = function(container, url){
		
		var _self = this;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _successNotification = $('<div>Data successfully saved</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		var _successDeleteNotification = $('<div>Data successfully deleted</div>').jqxNotification({
            width: 250, position: "top-right", opacity: 0.9,
            autoOpen: false, animationOpenDelay: 800, autoClose: true, autoCloseDelay: 3000, template: "info"
        });
		
		var _randomId = BPA.Util.getRandomId("workstructureStructureView");
		
		var _sendData = function(url, data, requestType, onSuccess, onError){
			$.ajax({
			    url: url,
			    type: requestType,
			    data: data,
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
		
		function _getSubItemsForParent(items, parentItem) {
            var _children = {},
                _itemsById = {},
                _index, _len, _item;
            for (_index = 0, _len = items.length; _index < _len; _index += 1) {
                var _item = _items[_index];
                if (_children[_item.parent] == null) {
                    _children[_item.parent] = [];
                }
                _children[_item.parent].push(_item);
            }
            var _newChildren = _children[parentItem.id];
            var _result = {};
            if (_newChildren != null) {
                while (_newChildren.length > 0) {
                    var _tempChildren = [];
                    for (var _index = 0; _index < _newChildren.length; _index++) {
                        var _item = _newChildren[_index];
                        _result[_item.id] = _item;
                        if (_children[_item.id] != null) {
                            _tempChildren = _tempChildren.concat(_children[_item.id]);
                        }
                    }
                    _newChildren = _tempChildren;
                }
            }
            return _result;
        };

        //-------
        
        var _toolbarContainer = $('<div style="width: 100%; background-color: #f4f4f4; height: 35px; padding-left: 15px;"></div>');
        _toolbarContainer.appendTo(container);
        
        var _toolbarTable = $('<table></table>');
        _toolbarTable.appendTo(_toolbarContainer);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_toolbarTable);
		var _firstColumn = $('<td style="width: 95px;"></td>');
		_firstColumn.appendTo(_newRow);
		var _secondColumn = $('<td></td>');
		_secondColumn.appendTo(_newRow);
        
    	var _addButton = $('<div>Add Root</div>');
    	_addButton.appendTo(_secondColumn);
    	_addButton.jqxButton({ width: 80, height: 15, theme: 'metro' });
    	
    	var _saveButton = $('<div>Save</div>');
    	_saveButton.appendTo(_firstColumn);
    	_saveButton.jqxButton({ width: 80, height: 15, theme: 'metro', template: "success" });
            	
		//-------
		
		var _options = new primitives.orgdiagram.Config();
		var _items = [];
		var _buttons = [];
		_buttons.push(new primitives.orgdiagram.ButtonConfig("add", "ui-icon-person", "Add"));
        _buttons.push(new primitives.orgdiagram.ButtonConfig("edit", "ui-icon-pencil", "Edit"));
        _buttons.push(new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-close", "Delete"));
        
        var _chartContainerId = "orgchart_" + _randomId;
		var _chartContainer = $('<div id="' + _chartContainerId + '" style="height: 700px;">[Loading Organizational Chart...]</div>');
		_chartContainer.appendTo(container);
        
		var _maximumId = 0;
		
		var _onSuccessGetStructuresData = function(result){
			var _structures = result.data;
			for(var _i = 0; _i<_structures.length; _i++){
				
				var _structure = _structures[_i];
				var _item = 
		            new primitives.orgdiagram.ItemConfig({
		                id: _structure.structureId,
		                parent: _structure.parentId,
		                title: _structure.employee.name,
		                description: _structure.position.name,
		                context: _structure,
		                image: "service/workstructure/employee/image/" + _structure.employee.employeeId
		            });
				
				_items.push(_item);
				
			}
			
			_options.items = _items;
			_options.cursorItem = 0;
			_options.hasSelectorCheckbox = primitives.common.Enabled.True;
			_options.buttons = _buttons;
			_options.hasButtons = primitives.common.Enabled.Auto;
			_options.leavesPlacementType = primitives.orgdiagram.ChildrenPlacementType.Matrix;
			_options.onButtonClick = function (e, /*primitives.orgdiagram.EventArgs*/ data) {
                switch (data.name) {
                    case "delete":
                        if (/*parentItem: primitives.orgdiagram.ItemConfig*/data.parentItem == null) {
                            alert("You are trying to delete root item!");
                        }
                        else {
                            var _items = $('#' + _chartContainerId).orgDiagram("option", "items");
                            var _newItems = [];
                            /* collect all children of deleted items, we are going to delete them as well. */
                            var _itemsToBeDeleted = _getSubItemsForParent(_items, /*context: primitives.orgdiagram.ItemConfig*/data.context);
                            /* add deleted item to that collection*/
                            _itemsToBeDeleted[data.context.context.structureId] = true;

                            /* copy to newItems collection only remaining items */
                            for (var _index = 0, _len = _items.length; _index < _len; _index += 1) {
                                var _item = _items[_index];
                                if (!_itemsToBeDeleted.hasOwnProperty(_item.id)) {
                                    _newItems.push(_item);
                                }
                            }
                            /* update items list in chart */
                            $('#' + _chartContainerId).orgDiagram({
                                items: _newItems,
                                cursorItem: data.parentItem.id
                            });
                            $('#' + _chartContainerId).orgDiagram("update", /*Refresh: use fast refresh to update chart*/ primitives.orgdiagram.UpdateMode.Refresh);

                        }
                        
                        break;
                        
                    case "add":
                    	
                    	var _structureEdit = new StructureEdit(container, {});
                    	
                    	var _parentId = data.context.context.structureId;
                    	
                    	var _onSaveNewStructure = function(editedStructure){
                    		
                    		console.log("_parentId : " + _parentId);
                    		var _items = $('#' + _chartContainerId).orgDiagram("option", "items");
        					
                    		var _item = 
            		            new primitives.orgdiagram.ItemConfig({
            		                id: editedStructure.structureId,
            		                parent: _parentId,
            		                title: editedStructure.employee.name,
            		                description: editedStructure.position.name,
            		                context: editedStructure,
            		                image: "service/workstructure/employee/image/" + editedStructure.employee.employeeId
            		            });
            				
            				_items.push(_item);
            				
            				$('#' + _chartContainerId).orgDiagram({
            		            items: _items,
            		            cursorItem: editedStructure.structureId
            		        });
            				$('#' + _chartContainerId).orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
            				
            				_structureEdit.close();
                    		
        				}
                    	_structureEdit.subscribe(_onSaveNewStructure, "onSaveNewStructure");
        				
                    	_structureEdit.open();
                		console.log("add structure");
                		
                        break;
                    case "edit":
                    	
                		console.log("edit");
                		
                        break;
                }
            };
			
			$('#' + _chartContainerId).empty();
			$('#' + _chartContainerId).orgDiagram(_options);
			$('#' + _chartContainerId).orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
		}
		
		var _onErrorGetStructuresData = function(result){
			console.log("result : " + result);
		}
		
		_sendData(BPA.Constant.workstructure.structuresUrl, {}, "GET", _onSuccessGetStructuresData, _onErrorGetStructuresData);
		
		
		
//		var _item = 
//            new primitives.orgdiagram.ItemConfig({
//                id: _id,
//                parent: null,
//                title: 'firstName',
//                description: 'positionName',
//                context: {data: 'test'},
//                image: "service/workstructure/employee/loadimage/"
//            });
//		
//		_items.push(_item);
		
		
//		var _newItem = new primitives.orgdiagram.ItemConfig({
//            id: ++_maximumId,
//            parent: _id,
//            title: 'employeeName',
//            description: 'positionName',
//            context: {data: 'test'},
//            image: "service/workstructure/employee/loadimage/"
//        });
//
//    	_items.push(_newItem);
//        $("#orgchart").orgDiagram({
//            items: _items,
//            cursorItem: _newItem.id
//        });
//        $('#orgchart').orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
	        
		
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

