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
        
        $(container).css('position', 'relative');
        $(container).css('height', '100%');
        $(container).css('z-index', '2');
        
        var _pageTable = $('<table style="margin-top: 2px; border: 0; border-spacing: 0px; background-color: #f4f4f4 border-collapse: collapse; width: 100%; height: 100%;"></table>');
        _pageTable.appendTo(container);
        
        var _firstRow = $('<tr></tr>');
        _firstRow.appendTo(_pageTable);
        
        var _firstRowColumn = $('<td style="height: 35px;"></td>');
        _firstRowColumn.appendTo(_firstRow);
        
        var _secondRow = $('<tr></tr>');
        _secondRow.appendTo(_pageTable);
        
        var _secondRowColumn = $('<td></td>');
        _secondRowColumn.appendTo(_secondRow);
        

        //-------
        
        var _toolbarContainer = $('<div style="width: 100%; background-color: #f4f4f4; height: 35px; padding-left: 15px; padding-top: 3px;"></div>');
        _toolbarContainer.appendTo(_firstRowColumn);
        
        var _toolbarTable = $('<table></table>');
        _toolbarTable.appendTo(_toolbarContainer);
		
		var _newRow = $('<tr></tr>');
		_newRow.appendTo(_toolbarTable);
		var _firstColumn = $('<td style="width: 95px;"></td>');
		_firstColumn.appendTo(_newRow);
		var _secondColumn = $('<td></td>');
		_secondColumn.appendTo(_newRow);
		
		var _thirdColumn = $('<td></td>');
		_thirdColumn.appendTo(_newRow);
        
    	var _addButton = $('<div>Add Root</div>');
    	_addButton.appendTo(_secondColumn);
    	_addButton.jqxButton({ width: 80, height: 15, theme: 'metro' });
    	
    	var _saveButton = $('<div>Save</div>');
    	_saveButton.appendTo(_firstColumn);
    	_saveButton.jqxButton({ width: 80, height: 15, theme: 'metro', template: "success" });
    	
    	var _refreshButton = $('<div><img src="resources/images/arrow_refresh.png"/></div>');
    	_refreshButton.appendTo(_thirdColumn);
    	_refreshButton.jqxButton({ height: 15, theme: 'metro' });
            	
		//-------
		
		var _options = new primitives.orgdiagram.Config();
		var _items = [];
		var _buttons = [];
		_buttons.push(new primitives.orgdiagram.ButtonConfig("add", "ui-icon-person", "Add"));
        _buttons.push(new primitives.orgdiagram.ButtonConfig("edit", "ui-icon-pencil", "Edit"));
        _buttons.push(new primitives.orgdiagram.ButtonConfig("delete", "ui-icon-close", "Delete"));
        
        var _overflowContainer = $('<div style="overflow-y: auto; height: 100%;"></div>');
        _overflowContainer.appendTo(_secondRowColumn);
        
        var _chartContainerId = "orgchart_" + _randomId;
		var _chartContainer = $('<div id="' + _chartContainerId + '" style="height: 1100px; overflow-y: auto;">[Loading Organizational Chart...]</div>');
		_chartContainer.appendTo(_overflowContainer);
        
		var _maximumId = 0;
		
		//------------------------------------------------------------------------------------------------------------------------
		
		var fromValue = null; 
		var toValue = null;
		var items = {};
		
		function getContactTemplate() {
            var result = new primitives.orgdiagram.TemplateConfig();
            result.name = "contactTemplate";

            result.itemSize = new primitives.common.Size(140, 100);
            result.minimizedItemSize = new primitives.common.Size(4, 4);
            result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


            var itemTemplate = jQuery(
              '<div class="bp-item bp-corner-all bt-item-frame">'
                + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 136px; height: 20px;">'
                    + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 128px; height: 18px;">'
                    + '</div>'
                + '</div>'
                + '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
                    + '<img name="photo" style="height:60px; width:50px;" />'
                + '</div>'
                + '<div name="description" class="bp-item" style="top: 26px; left: 56px; width: 82px; height: 52px; font-size: 10px;"></div>'
            + '</div>'
            ).css({
                width: result.itemSize.width + "px",
                height: result.itemSize.height + "px"
            }).addClass("bp-item bp-corner-all bt-item-frame");
            result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

            return result;
        }
		
		function onOrgDiagramTemplateRender(event, data) {
			
			console.log('item render..');
			
            switch (data.renderingMode) {
                case primitives.common.RenderingMode.Create:
                    data.element.draggable({
                        revert: "invalid",
                        containment: "document",
                        appendTo: "body",
                        helper: "clone",
                        cursor: "move",
                        "zIndex": 10000,
                        delay: 300,
                        distance: 10,
                        start: function (event, ui) {
                            fromValue = jQuery(this).attr("data-value");
                        }
                    });
                    data.element.droppable({
                        /* this option is supposed to suppress event propogation from nested droppable to its parent
                        *  but it does not work
                        */
                        greedy: true,
                        drop: function (event, ui) {
                            if (!event.cancelBubble) {
                                console.log("Drop accepted!");
                                toValue = jQuery(this).attr("data-value");

                                Reparent("orgdiagram", fromValue, "orgdiagram", toValue);

                                primitives.common.stopPropagation(event);
                            } else {
                                console.log("Drop ignored!");
                            }
                        },
                        over: function (event, ui) {
                            toValue = jQuery(this).attr("data-value");

                            /* this is needed in order to update highlighted item in chart, 
                            * so this creates consistent mouse over feed back  
                            */
                            $('#' + _chartContainerId).orgDiagram({ "highlightItem": toValue });
                            $('#' + _chartContainerId).orgDiagram("update", primitives.common.UpdateMode.PositonHighlight);
                        },
                        accept: function (draggable) {
                            /* be carefull with this event it is called for every available droppable including invisible items on every drag start event.
                            * don't varify parent child relationship between draggable & droppable here it is too expensive.
                            */
                            return (jQuery(this).css("visibility") == "visible");
                        }
                    });
                    /* Initialize widgets here */
                    break;
                case primitives.common.RenderingMode.Update:
                    /* Update widgets here */
                    break;
            }
	            var itemConfig = data.context;
	
	            /* Set item id as custom data attribute here */
	            data.element.attr("data-value", itemConfig.id);
	
	            RenderField(data, itemConfig);
	        }
            
            
			function RenderField(data, itemConfig) {
	            if (data.templateName == "contactTemplate") {
	                data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
	                data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
	
	                var fields = ["title", "description", "phone", "email"];
	                for (var index = 0; index < fields.length; index++) {
	                    var field = fields[index];
	
	                    var element = data.element.find("[name=" + field + "]");
	                    if (element.text() != itemConfig[field]) {
	                        element.text(itemConfig[field]);
	                    }
	                }
	            }
	        }
            
            
            function Reparent(fromChart, value, toChart, toParent) {
                /* following verification needed in order to avoid conflict with jQuery Layout widget */
                if (fromChart != null && value != null && toChart != null) {
                    console.log("Reparent fromChart:" + fromChart + ", value:" + value + ", toChart:" + toChart + ", toParent:" + toParent);
                    var item = items[value];
                    var fromItems = $('#' + _chartContainerId).orgDiagram("option", "items");
                    var toItems = $('#' + _chartContainerId).orgDiagram("option", "items");
                    if (toParent != null) {
                        var toParentItem = items[toParent];
                        if (!isParentOf(item, toParentItem)) {

                            var children = getChildrenForParent(item);
                            children.push(item);
                            for (var index = 0; index < children.length; index++) {
                                var child = children[index];
                                fromItems.splice(primitives.common.indexOf(fromItems, child), 1);
                                toItems.push(child);
                            }
                            item.parent = toParent;
                        } else {
                            console.log("Droped to own child!");
                        }
                    } else {
                        var children = getChildrenForParent(item);
                        children.push(item);
                        for (var index = 0; index < children.length; index++) {
                            var child = children[index];
                            fromItems.splice(primitives.common.indexOf(fromItems, child), 1);
                            toItems.push(child);
                        }
                        item.parent = null;
                    }
                    $('#' + _chartContainerId).orgDiagram("update", primitives.common.UpdateMode.Refresh);
                }
            }
            
            function getChildrenForParent(parentItem) {
                var children = {};
                for (var id in items) {
                    var item = items[id];
                    if (children[item.parent] == null) {
                        children[item.parent] = [];
                    }
                    children[item.parent].push(id);
                }
                var newChildren = children[parentItem.id];
                var result = [];
                if (newChildren != null) {
                    while (newChildren.length > 0) {
                        var tempChildren = [];
                        for (var index = 0; index < newChildren.length; index++) {
                            var item = items[newChildren[index]];
                            result.push(item);
                            if (children[item.id] != null) {
                                tempChildren = tempChildren.concat(children[item.id]);
                            }
                        }
                        newChildren = tempChildren;
                    }
                }
                return result;
            }

            function isParentOf(parentItem, childItem) {
                var result = false,
                    index,
                    len,
                    itemConfig;
                if (parentItem.id == childItem.id) {
                    result = true;
                } else {
                    while (childItem.parent != null) {
                        childItem = items[childItem.parent];
                        if (childItem.id == parentItem.id) {
                            result = true;
                            break;
                        }
                    }
                }
                return result;
            };
            
		//------------------------------------------------------------------------------------------------------------------------
		
		var _onSuccessGetStructuresData = function(result){
			
			var _imageRandomVersion = (new Date()).getTime(); //to disable browser image cache
			
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
		                image: "service/workstructure/employee/image/" + _structure.employee.employeeId  + "?ver=" + _imageRandomVersion
		            });
				
				_items.push(_item);
				
				items[_item.id] = _item;
				
			}
			
			_options.items = _items;
			_options.cursorItem = 0;
			_options.hasSelectorCheckbox = primitives.common.Enabled.True;
			_options.buttons = _buttons;
			_options.hasButtons = primitives.common.Enabled.Auto;
			_options.leavesPlacementType = primitives.orgdiagram.ChildrenPlacementType.Matrix;
			
			 _options.normalLevelShift = 20;
            _options.dotLevelShift = 10;
            _options.lineLevelShift = 10;
            _options.normalItemsInterval = 20;
            _options.dotItemsInterval = 10;
            _options.lineItemsInterval = 5;
            _options.buttonsPanelSize = 48;

            _options.pageFitMode = primitives.common.PageFitMode.Auto;
            _options.graphicsType = primitives.common.GraphicsType.Auto;
            _options.hasSelectorCheckbox = primitives.common.Enabled.True;
            _options.templates = [getContactTemplate()];
            _options.defaultTemplateName = "contactTemplate";
            _options.onItemRender = onOrgDiagramTemplateRender;
            /* chart uses mouse drag to pan items, disable it in order to avoid conflict with drag & drop */
            _options.enablePanning = false;
			
			_options.onButtonClick = function (e, /*primitives.orgdiagram.EventArgs*/ data) {
                switch (data.name) {
                    case "delete":
//                        if (/*parentItem: primitives.orgdiagram.ItemConfig*/data.parentItem == null) {
//                            alert("You are trying to delete root item!");
//                        }
//                        else {
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
//                                cursorItem: data.parentItem.id
                            });
                            $('#' + _chartContainerId).orgDiagram("update", /*Refresh: use fast refresh to update chart*/ primitives.orgdiagram.UpdateMode.Refresh);

//                        }
                        
                        break;
                        
                    case "add":
                    	
                    	var _structureEdit = new StructureEdit(container, {});
                    	
                    	var _parentId = data.context.context.structureId;
                    	
                    	var _onSaveNewStructure = function(editedStructure){
                    		
                    		console.log("_parentId : " + _parentId);
                    		var _items = $('#' + _chartContainerId).orgDiagram("option", "items");
                    		
                    		var _imageRandomVersion = (new Date()).getTime(); //to disable browser image cache
        					
                    		var _item = 
            		            new primitives.orgdiagram.ItemConfig({
            		                id: editedStructure.structureId,
            		                parent: _parentId,
            		                title: editedStructure.employee.name,
            		                description: editedStructure.position.name,
            		                context: editedStructure,
            		                image: "service/workstructure/employee/image/" + editedStructure.employee.employeeId  + "?ver=" + _imageRandomVersion
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
                    	
                    	var _structureId = data.context.context.structureId;
                    	var _employeeId = null;
                    	if(data.context.context.employee != null && data.context.context.employee != undefined ){
                    		_employeeId = data.context.context.employee.employeeId
                    	}
                    	var _positionCode = null;
                    	if(data.context.context.position != null && data.context.context.position != undefined ){
                    		_positionCode = data.context.context.position.code;
                    	}
                    	var _locationCode = null;
                    	if(data.context.context.location != null && data.context.context.location != undefined ){
                    		_locationCode = data.context.context.location.code;
                    	}
                    	
                    	var _editPageOtions = {editedStructure : {structureId : _structureId, employeeId: _employeeId, positionCode: _positionCode, locationCode: _locationCode}};
                    	var _structureEdit = new StructureEdit(container, _editPageOtions);
                    	
                    	var _onSaveStructure = function(editedStructure){
                    		
                    		console.log("_parentId : " + _parentId);
                    		var _imageRandomVersion = (new Date()).getTime(); //to disable browser image cache
                    		
                    		var _items = $('#' + _chartContainerId).orgDiagram("option", "items");
                    		for(var _i = 0; _i<_items.length; _i++){
                    			var _item = _items[_i];
                    			if(_item.id == _structureId){
                    				_item.title = editedStructure.employee.name;
                    				_item.description = editedStructure.position.name;
                    				_item.context = editedStructure;
                    				_item.image = "service/workstructure/employee/image/" + editedStructure.employee.employeeId  + "?ver=" + _imageRandomVersion;
                    				
                    				items[_item.id] = _item;
                    			}
                    		}
        					
            				$('#' + _chartContainerId).orgDiagram({
            		            items: _items,
            		            cursorItem: editedStructure.structureId
            		        });
            				$('#' + _chartContainerId).orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
            				
            				_structureEdit.close();
                    		
        				}
                    	_structureEdit.subscribe(_onSaveStructure, "onSaveStructure");
        				
                    	_structureEdit.open();
                        break;
                }
            };
			
			$('#' + _chartContainerId).empty();
			
			$('#' + _chartContainerId).orgDiagram(_options);
			$('#' + _chartContainerId).droppable({
                greedy: true,
                drop: function (event, ui) {
                    /* Check drop event cancelation flag
			        * This fixes following issues:
			        * 1. The same event can be received again by updated chart
			        * so you changed hierarchy, updated chart and at the same drop position absolutly 
			        * irrelevant item receives again drop event, so in order to avoid this use primitives.common.stopPropagation
                    * 2. This particlular example has nested drop zones, in order to 
                    * suppress drop event processing by nested droppable and its parent we have to set "greedy" to false,
                    * but it does not work.
                    * In this example items can be droped to other items (except immidiate children in order to avoid looping)
                    * and to any free space in order to make them rooted.
                    * So we need to cancel drop  event in order to avoid double reparenting operation.
                    */
                    if (!event.cancelBubble) {
                        toValue = null;
                        toChart = name;

                        Reparent("orgdiagram", fromValue, "orgdiagram", toValue);

                        primitives.common.stopPropagation(event);
                    }
                }
            });
			
			$('#' + _chartContainerId).orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
		}
		
		var _onErrorGetStructuresData = function(result){
			console.log("result : " + result);
		}
		
		var _loadDiagram = function(){
			_sendData(BPA.Constant.workstructure.structuresUrl, {}, "GET", _onSuccessGetStructuresData, _onErrorGetStructuresData);
		};
		
		_addButton.click(function(event){
			var _structureEdit = new StructureEdit(container, {});
        	
        	var _onSaveNewStructure = function(editedStructure){
        		
        		var _items = $('#' + _chartContainerId).orgDiagram("option", "items");
        		
        		var _imageRandomVersion = (new Date()).getTime(); //to disable browser image cache
				
        		var _item = 
		            new primitives.orgdiagram.ItemConfig({
		                id: editedStructure.structureId,
		                parent: null,
		                title: editedStructure.employee.name,
		                description: editedStructure.position.name,
		                context: editedStructure,
		                image: "service/workstructure/employee/image/" + editedStructure.employee.employeeId + "?ver=" + _imageRandomVersion
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
    		console.log("add parent structure");
		});
		
		_saveButton.click(function(event){
			
			var _structures = [];
			var _items = $('#' + _chartContainerId).orgDiagram("option", "items");
			for (var _i = 0, _len = _items.length; _i < _len; _i++) {
				var _item = _items[_i];
				
				var _employeeId = _item.context.employee.employeeId || '';
				var _positionCode = _item.context.position.code || '';
				
				var _locationCode = '';
				if (_item.context.location != undefined){
					_locationCode =_item.context.location.code || '';
				}
				
				
				var _structure = {
						structureId: _item.id, 
						parentId : _item.parent, 
						employeeId : _employeeId,
						positionCode : _positionCode,
						locationCode : _locationCode
				};
				
				_structures.push(_structure);
			}
			
			console.log(_structures);
			_sendData(BPA.Constant.workstructure.structuresUrl, {structures: _structures}, "POST", function(result){
				
				_sendData(BPA.Constant.workstructure.structuresUrl, {}, "GET", function(result){
					
					var _imageRandomVersion = (new Date()).getTime(); //to disable browser image cache
					
					_items = [];
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
				                image: "service/workstructure/employee/image/" + _structure.employee.employeeId  + "?ver=" + _imageRandomVersion
				            });
						
						_items.push(_item);
						
						items[_item.id] = _item;
						
					}
					
					$('#' + _chartContainerId).orgDiagram({
			            items: _items
			        });
					$('#' + _chartContainerId).orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
					
					_successNotification.jqxNotification("open");
					
				}, function(result){
					
				});
				
				
			}, function(result){
				
			});
			
		});
		
		_refreshButton.click(function(result){
			_sendData(BPA.Constant.workstructure.structuresUrl, {}, "GET", function(result){
				
				var _imageRandomVersion = (new Date()).getTime(); //to disable browser image cache
				
				_items = [];
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
			                image: "service/workstructure/employee/image/" + _structure.employee.employeeId + "?ver=" + _imageRandomVersion
			            });
					
					_items.push(_item);
					
					items[_item.id] = _item;
					
				}
				
				$('#' + _chartContainerId).orgDiagram({
		            items: _items
		        });
				$('#' + _chartContainerId).orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
			});
		});
		
		_loadDiagram();
		
	}
	
	inheritPrototype(StructureView, Observable);

    return StructureView;
    
});

