define(["bpaObservable", "jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxinput", "jqxmenu",
        "jqxgrid", "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection"
        ], function (Observable) {
	
	var DeploymentList = function(container, options){
		
		var _self = this;
		
		var _options = options || {};
		
		var _url = BPA.Constant.workflow.deploymentsUrl;
		
		var _subscribers = {
			any:[]
		};
		
		Observable.call(_self, _subscribers);
		
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
        	
//        	_grid.html('<div style="height: 100%;" id="myslider_'+ _id + '"></div><div style="height: 100%;" id="diagram_' + _id + '"></div>');
        	
        	_grid.html('<div style="height: 100%;" id="diagram_' + _id + '"></div>');
        	
        	require(["bpmn/Bpmn", "dojo/domReady!"], function(Bpmn) {
        	      new Bpmn().renderUrl("service/workflow/diagram?deploymentId=1", {
        	        diagramElement : "diagram_" + _id,
        	        overlayHtml : '<div style="position: relative; top:100%"></div>'
        	      }).then(function (bpmn){
        	        //bpmn.zoom(0.8);
        	        bpmn.annotation("usertask1").addClasses(["highlight"]);
        			
        	        $('div[id="diagram_'+ _id + '"] div[data-activity-id="usertask1"]').click(function(){
        				console.log("userTask clicked..");
        			});
        	        
//        	        var mySlider = $('#myslider_' + _id).jqxSlider({ min: 1, max: 10, ticksFrequency: 1, value: 10, step: 1});
//        	        $('#myslider_' + _id).on('change', function (event) {
//                        bpmn.zoom(mySlider.jqxSlider('value') /10);
//                    });
        			
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
            rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px; overflow: scroll; width: calc(100% - 30px); height: calc(100% - 10px); background-color: silver;'></div>", rowdetailshidden: false },
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
        
        var _showAddDiagramPage = function(){
        	Observable.prototype.publish.call(_self, {}, "adddiagram");
        }
        
        this.refreshGrid = function(){
        	_deploymentListGrid.jqxGrid('updatebounddata');
        }
        
	}
	
	inheritPrototype(DeploymentList, Observable);

    return DeploymentList;
    
});

