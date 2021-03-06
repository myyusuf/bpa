define(["bpaObservable", "component/base/SimpleListGrid", "view/workflow/administration/ProcessInstanceTaskList", "bpmn/Bpmn", "dojo/domReady!", 
        "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxsplitter",
        "jqxtabs"
        ], function (Observable, SimpleListGrid, ProcessInstanceTaskList, Bpmn) {
	
	var RunningProcessInstanceList = function(container, url){
		
		var _self = this;
		
		var _options = {};
		
		var _subscribers = {
			any:[]
		};
		
		var _randomId = BPA.Util.getRandomId("runningProcessInstanceList");
		
		Observable.call(_self, _subscribers);
		
		_options.dataFields = [
		                       { name: 'id', type: 'string' },
		                       { name: 'businessKey', type: 'string' },
		                       { name: 'startedBy', type: 'string' },
		                       { name: 'startActivityId', type: 'string' },
		                       { name: 'started', type: 'string' },
		                       { name: 'processDefinitionId', type: 'string' }
		                       
		                   ];
		_options.dataFieldId = "id";
		
		_options.url = url || BPA.Constant.workflow.administration.runningProcessInstancesUrl;
		
		_options.columns = [
		                   { text: 'Id', datafield: 'id', width: '20%' },
		                   { text: 'Business Key', datafield: 'businessKey', width: '20%' },
		                   { text: 'Started By', datafield: 'startedBy', width: '20%' },
		                   { text: 'Start Activity Id', datafield: 'startActivityId', width: '20%' },
		                   { text: 'Started', datafield: 'started', width: '20%' }
		                 ];
		
		var _searchInput = $('<input type="text" class="text-input" style="width: 250px;"/>');
		_options.formatData = function (data) {
            data.processDefinitionId = _searchInput.val();
            return data;
        };
        
		_options.renderToolbar = function(toolbar)
        {
        	toolbar.empty();
        	
            var _searchContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
            var _searchTable = $('<table></table>');
            _searchTable.appendTo(_searchContainer);
    		
    		var _newRow = $('<tr></tr>');
    		_newRow.appendTo(_searchTable);
    		var _newColumn = $('<td></td>');
    		_newColumn.appendTo(_newRow);
    		_searchInput.appendTo(_newColumn);
    		
    		_newColumn = $('<td></td>');
    		_newColumn.appendTo(_newRow);
    		var _searchButton = $('<div><img src="resources/images/magnifier-medium.png"/></div>');
    		_searchButton.appendTo(_newColumn);
    		
            toolbar.append(_searchContainer);
            
            _searchInput.jqxInput({placeHolder: " Search by Process Definition Id", theme: 'metro' });
            _searchButton.jqxButton({ width: '14', height: '14', theme: 'metro' });
            
            _searchButton.click(function(event){
            	_simpleListGrid.refreshGrid();
            });
            _searchInput.on('keypress', function(event){
            	if(13 == event.charCode){
            		_simpleListGrid.refreshGrid();
            	}
            });
            
        };
        
        container.css({height: '100%'});
        var _parentContainer = $('<div style="overflow: hidden; height: 100%; background-color: blue;"></div>');
        _parentContainer.appendTo(container);
        
        var _processInstanceContainer = $('<div style="height: 100%;"></div>');
        _processInstanceContainer.appendTo(_parentContainer);
        
        var _processInstanceContainer2 = $('<div style="height: 100%;"></div>');
        _processInstanceContainer2.appendTo(_processInstanceContainer);
        
        var _taskContainer = $('<div style="height: 100%;"></div>');
        _taskContainer.appendTo(_parentContainer);
        
//        var _taskContainer2 = $('<div style="height: 100%;"></div>');
//        _taskContainer2.appendTo(_taskContainer);
        
        _parentContainer.jqxSplitter({ width: '100%', height: '100%',  orientation: 'horizontal', 
        	panels: [{ size: '55%', min: 100, collapsible: false }, { min: 100, collapsible: true}], theme: 'metro' });
		
        
        var tabs = $('<div id="tabs"><ul><li>Tasks</li><li>Workflow Diagram</li></ul></div>');
        tabs.appendTo(_taskContainer);
        
        
        var _processInstanceTasksContainer = $('<div style="height: 100%;"></div>');
        _processInstanceTasksContainer.appendTo(tabs);
        
        var _diagramContainer = $('<div style="height: 100%;"></div>');
        _diagramContainer.appendTo(tabs);
        
        
        var _processInstanceId = "";
        var _processDefinitionId = "";
        var isDiagramTabSelected = false;
        
        tabs.jqxTabs({ width: '100%', height: '100%', position: 'top', showCloseButtons: false, scrollPosition: 'both', theme: 'metro'});
        tabs.css({marginTop: "0px", borderTop: "0px"});
        tabs.on('selected', function (event) { 
        	var selectedTabIndex = event.args.item;
        	if(selectedTabIndex == 1){
        		isDiagramTabSelected = true;
        		_renderDiagram();
        	}
        }); 
        
        tabs.on('unselected', function (event) { 
        	var selectedTabIndex = event.args.item;
        	if(selectedTabIndex == 1){
        		isDiagramTabSelected = false;
        	}
        });
        
        var _processInstanceTaskList = new ProcessInstanceTaskList(_processInstanceTasksContainer, null);
        
        var _renderDiagram = function(){
        	
        	if(!isDiagramTabSelected){
        		return;
        	}
        	
        	if(_processDefinitionId == ""){
        		return;
        	}
        	
        	//remove diagram container children
        	var _children = _diagramContainer.children();
			for(var i=0; i<_children.length; i++){
				_children[i].remove();
			}
			
			
        	var _diagramId = _randomId;// + '_' + _processDefinitionId;
        	var _diagramElement = $('<div style="height: 100%;" id="diagram_' + _diagramId + '"></div>');
        	_diagramElement.appendTo(_diagramContainer);
        	
        	new Bpmn().renderUrl("service/workflow/diagram/definition?processDefinitionId=" + _processDefinitionId, {
    	        diagramElement : "diagram_" + _diagramId,
    	        overlayHtml : '<div style="position: relative; top:100%"></div>'
    	      }).then(function (bpmn){
    	        //bpmn.zoom(0.8);
    	        /*bpmn.annotation("usertask1").addClasses(["highlight"]);
    			
    	        $('div[id="diagram_'+ _diagramId + '"] div[data-activity-id="usertask1"]').click(function(){
    				console.log("userTask clicked..");
    			});*/
    	    	  
    	    	  _sendData("service/workflow/diagram/highlighted", {processInstanceId : _processInstanceId}, "GET", function(result){
  					
  					console.log(result.data);
  					var _highLightedActivities = result.data;
  					for(var i=0; i<_highLightedActivities.length; i++){
  						bpmn.annotation(_highLightedActivities[i]).addClasses(["highlight"]);
  					}
    	    	  });
    	        
    	      });
        	
        }
        
        _options.onRowClick = function(rowData){
        	
        	_processInstanceId = rowData.id;
        	_processDefinitionId = rowData.processDefinitionId;
        	
        	_processInstanceTaskList.refreshGridWithProcessInstanceId(_processInstanceId);
        	_renderDiagram();
        	
        }
        
        
		var _simpleListGrid = new SimpleListGrid(_processInstanceContainer2, _options);
		
		var _onContextMenuClick = function(commandObject){
			var _command = commandObject.command;
			var _rowData = commandObject.rowData;
			console.log(_command);
			
			var _eventName = "";
			if(_command == "add"){
				_eventName = "onAddRunningProcessInstance";
			}else if(_command == "edit"){
				_eventName = "onEditRunningProcessInstance";
			}else if(_command == "delete"){
				_eventName = "onDeleteRunningProcessInstance";
			}
			Observable.prototype.publish.call(_self, _getRunningProcessInstanceFromRowData(_rowData), _eventName);
		}
		_simpleListGrid.subscribe(_onContextMenuClick, "onContextMenuClick");
		
		
        this.refreshGrid = function(){
        	_simpleListGrid.refreshGrid();
        }
        
        this.getComponent = function(){
        	return _simpleListGrid.getComponent();
        }
        
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
        
        
	}
	
	inheritPrototype(RunningProcessInstanceList, Observable);

    return RunningProcessInstanceList;
    
});

