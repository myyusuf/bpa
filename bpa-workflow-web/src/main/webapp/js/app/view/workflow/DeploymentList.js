define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxslider"
        ], function (Observable) {
	
	var DeploymentList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.workflow.deploymentsUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _randomId = BPA.Util.getRandomId("deploymentList");
		
        var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },         
                { name: 'name', type: 'string' }
            ],
            id: 'id',
            beforeprocessing: function (data) {
                _source.totalrecords = data.num;
            },
            url: _url
        };
        
        var _dataAdapter = new $.jqx.dataAdapter(_source, {
            downloadComplete: function (data, status, xhr) { 
            },
            loadComplete: function (data) { 
            	//console.log('data : ' + data);
            	
            },
            loadError: function (xhr, status, error) { }
        });
        
        
        var _initRowDetails = function (index, parentElement, gridElement, record) {
        	
        	var _grid = $($(parentElement).children()[0]);
        	var _id = record.id;
        	var _diagramId = (_randomId + '_' + _id);
        	
//        	_grid.html('<div style="height: 100%;" id="myslider_'+ _id + '"></div><div style="height: 100%;" id="diagram_' + _id + '"></div>');
        	
        	_grid.html('<table style="width: calc(100% - 2px); border: 1px solid silver; padding: 0px;"><tr><td><div style="height: 30px; width: 100%;" id="myslider_'+ _diagramId + '"></div></td></tr><tr><td><div style="height: 100%;" id="diagram_' + _diagramId + '"></div></td></tr></table>');
        	
        	require(["bpmn/Bpmn", "dojo/domReady!"], function(Bpmn) {
        	      new Bpmn().renderUrl("service/workflow/diagram?deploymentId=" + _id, {
        	        diagramElement : "diagram_" + _diagramId,
        	        overlayHtml : '<div style="position: relative; top:100%"></div>'
        	      }).then(function (bpmn){
        	        //bpmn.zoom(0.8);
        	        bpmn.annotation("usertask1").addClasses(["highlight"]);
        			
        	        $('div[id="diagram_'+ _diagramId + '"] div[data-activity-id="usertask1"]').click(function(){
        				console.log("userTask clicked..");
        			});
        	        
        	        var mySlider = $('#myslider_' + _diagramId).jqxSlider({ min: 1, max: 10, ticksFrequency: 1, value: 10, step: 1});
        	        $('#myslider_' + _diagramId).on('change', function (event) {
                        bpmn.zoom(mySlider.jqxSlider('value') /10);
                    });
        			
        	      });
        	});
        	
        }
        
        
        var _deploymentListGrid = container.jqxGrid(
        {
            width: '100%',
            height: '100%',
            source: _dataAdapter,                
            pageable: true,
            autoheight: false,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: false,
            selectionmode: 'multiplerows',
            columns: [
              { text: 'Id', datafield: 'id', width: '50%' },
              { text: 'Name', datafield: 'name', width: '50%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return _dataAdapter.records;
            },
            showtoolbar: true,
            toolbarheight: 40,
            
            rowdetails: true,
            initrowdetails: _initRowDetails,
            rowdetailstemplate: { rowdetails: "<div style='margin: 10px; overflow: scroll; width: calc(100% - 30px); height: calc(100% - 10px); background-color: #fefefe;'></div>", rowdetailshidden: true, rowdetailsheight: 400 },
//            rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailshidden: false },
            
            rendertoolbar: function(toolbar)
            {
            	toolbar.empty();
            	
                var _searchContainer = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                var _searchTable = $('<table></table>');
                _searchTable.appendTo(_searchContainer);
        		
        		var _newRow = $('<tr></tr>');
        		_newRow.appendTo(_searchTable);
        		var _newColumn = $('<td></td>');
        		_newColumn.appendTo(_newRow);
        		var _addButton = $('<div style="margin-left: 2px;">New BPMN Diagram</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _addButton.click(function(event){
                	_showAddDiagramPage();
                });
            }
        });
        
        var _gridContextMenu = $('<div><ul><li data-menukey="delete">Delete</li></ul></div>');
        _gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        _gridContextMenu.on('itemclick', function (event){
        	
        	var _menuKey = $(event.target).data("menukey");
        	
        	var _rowData = "";
        	
        	var _rowIndex = _deploymentListGrid.jqxGrid('getselectedrowindex');
        	var _rowData = _deploymentListGrid.jqxGrid('getrowdata', _rowIndex);
        	
	 		_deleteRow(_rowData);
        });
        
        _deploymentListGrid.on('rowclick', function (event) {
        	
        	var _args = event.args, _clickEvent = _args.originalEvent, _rowIndex = args.rowindex;
        	
        	var _rightClick = _isRightClick(_clickEvent);
            if (_rightClick) {
            	if(_deploymentListGrid.jqxGrid('getselectedrowindex') === -1){
            		_deploymentListGrid.jqxGrid('selectrow', _rowIndex);
            	}
            	
                var _scrollTop = $(window).scrollTop();
                var _scrollLeft = $(window).scrollLeft();
                _gridContextMenu.jqxMenu('open', parseInt(_clickEvent.clientX) + 5 + _scrollLeft, parseInt(_clickEvent.clientY) + 5 + _scrollTop);
                return false;
            }else{
            	_gridContextMenu.jqxMenu('close');
            }
        });
        
        var _showAddDiagramPage = function(){
        	Observable.prototype.publish.call(_self, {}, "adddiagram");
        }
        
        this.refreshGrid = function(){
        	_deploymentListGrid.jqxGrid('updatebounddata');
        }
        
        var _deleteRow = function(rowData){
        	Observable.prototype.publish.call(_self, _getDeploymentFromRowData(rowData), "deleterow");
        }
        
        var _getDeploymentFromRowData = function(rowData){
        	var _deployment = {};
        	
        	if(rowData){
        		_deployment.id = rowData.id;
        		_deployment.name = rowData.name;
        	}
        	
        	return _deployment;
        }
        
        _deploymentListGrid.on('contextmenu', function (e) {
            return false;
        });
        var _isRightClick = function(event) {
            var _rightclick;
            if (!event) var event = window.event;
            if (event.which) _rightclick = (event.which == 3);
            else if (event.button) _rightclick = (event.button == 2);
            return _rightclick;
        }
        
	}
	
	inheritPrototype(DeploymentList, Observable);

    return DeploymentList;
    
});

