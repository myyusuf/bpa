define(["jQuery", "jqxcore"], function () {
	
	var TaskList = function(container){
		
		var url = BPA.Constant.workflow.tasksUrl;
        
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' }
            ],
            id: 'code',
            beforeprocessing: function (data) {
                source.totalrecords = data.num;
            },
            url: url
        };
        
        var dataAdapter = new $.jqx.dataAdapter(source, {
            downloadComplete: function (data, status, xhr) { 
            },
            loadComplete: function (data) { 
            	//console.log('data : ' + data);
            	
            },
            loadError: function (xhr, status, error) { }
        });
        
        var initrowdetails = function (index, parentElement, gridElement, record) {
        	
        	var grid = $($(parentElement).children()[0]);
        	
        	grid.html('<div style="height: 100%;" id="myslider"></div><div style="height: 100%;" id="diagram"></div>');
        	require(["bpmn/Bpmn", "dojo/domReady!"], function(Bpmn) {
        	      new Bpmn().renderUrl("sample/bpmn/SampleWorkflow.bpmn", {
        	        diagramElement : "diagram",
        	        overlayHtml : '<div style="position: relative; top:100%"></div>'
        	      }).then(function (bpmn){
        	        //bpmn.zoom(0.8);
        	        bpmn.annotation("usertask1").addClasses(["highlight"]);
        			
        	        $('div[data-activity-id="usertask1"]').click(function(){
        				console.log("userTask clicked..");
        			});
        	        
        	        var mySlider = $('#myslider').jqxSlider({ min: 1, max: 10, ticksFrequency: 1, value: 10, step: 1});
        	        $('#myslider').on('change', function (event) {
                        bpmn.zoom(mySlider.jqxSlider('value') /10);
                    });
        			
        	      });
        	    });
        	
           
        }
        
        container.jqxGrid(
        {
            width: '100%',
            height: '100%',
            source: dataAdapter,                
            pageable: true,
            autoheight: false,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: false,
            selectionmode: 'multiplerows',
            columns: [
              { text: 'Code', datafield: 'code', width: '50%' },
              { text: 'Name', datafield: 'name', width: '50%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return dataAdapter.records;
            },
            rowdetails: true,
            initrowdetails: initrowdetails,
            rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailshidden: false }
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return TaskList;
    
});

