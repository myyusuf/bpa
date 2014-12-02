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
        	
        	grid.html('<div style="height: 400px;" id="diagram"></div>');
        	require(["bpmn/Bpmn", "dojo/domReady!"], function(Bpmn) {
        	      new Bpmn().renderUrl("sample/bpmn/SampleWorkflow.bpmn", {
        	        diagramElement : "diagram",
        	        overlayHtml : '<div style="position: relative; top:100%"></div>'
        	      }).then(function (bpmn){
        	        //bpmn.zoom(0.8);
        	        bpmn.annotation("usertask1").setHtml('<span class="bluebox"  style="position: relative; top:100%">New Text</span>').addClasses(["highlight"]);
        	        bpmn.annotation("sid-C7031B1A-7F7E-4846-B046-73C638547449").addDiv("<span>Test Div</span>", ["testDivClass"]);
        			
        			$("#" + "usertask1" + " .bpmnElement"),click(function(){
        				console.log("userTask clicked..");
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
            rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 420, rowdetailshidden: false }
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return TaskList;
    
});

