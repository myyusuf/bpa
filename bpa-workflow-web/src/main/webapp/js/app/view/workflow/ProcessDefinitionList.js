define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxslider"
        ], function (Observable) {
	
	var ProcessDefinitionList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.workflow.processDefinitionsUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
		var _randomId = BPA.Util.getRandomId("processDefinitionList");
		
        var _source =
        {
            datatype: "json",
            datafields: [
                { name: 'id', type: 'string' },
                { name: 'key', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'resourceName', type: 'string' },
                { name: 'deploymentId', type: 'string' }
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
        	var _id = record.deploymentId;
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

        
        var _processDefinitionListGrid = container.jqxGrid(
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
            selectionmode: 'singlerow',
            columns: [
              { text: 'Id', datafield: 'id', width: '20%' },
              { text: 'Key', datafield: 'key', width: '20%' },
              { text: 'Name', datafield: 'name', width: '20%' },
              { text: 'Resource Name', datafield: 'resourceName', width: '20%' },
              { text: 'Deployment Id', datafield: 'deploymentId', width: '20%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return _dataAdapter.records;
            },
            
            rowdetails: true,
            initrowdetails: _initRowDetails,
            rowdetailstemplate: { rowdetails: "<div style='margin: 10px; overflow: scroll; width: calc(100% - 30px); height: calc(100% - 10px); background-color: #fefefe;'></div>", rowdetailshidden: true, rowdetailsheight: 350 },
            
            showtoolbar: true,
            toolbarheight: 40,
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
        		var _startProcessButton = $('<div style="margin-left: 2px;">Start Process</div>');
        		_startProcessButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _startProcessButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _startProcessButton.click(function(event){
                	_showStartProcessPage();
                });
            }
        });
        
        var _showStartProcessPage = function(){
        	Observable.prototype.publish.call(_self, {}, "startprocess");
        }
        
        this.refreshGrid = function(){
        	_processDefinitionListGrid.jqxGrid('updatebounddata');
        }
        
	}
	
	inheritPrototype(ProcessDefinitionList, Observable);

    return ProcessDefinitionList;
    
});

