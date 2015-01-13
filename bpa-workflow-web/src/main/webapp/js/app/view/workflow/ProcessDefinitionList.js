define(["jQuery", "jqxcore"], function () {
	
	var ProcessDefinitionList = function(container){
		
		var url = BPA.Constant.workflow.processDefinitionsUrl;
        
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'processDefinitionKey', type: 'string' }
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
              { text: 'Process Definition Key', datafield: 'processDefinitionKey', width: '100%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return dataAdapter.records;
            },
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
        		var _addButton = $('<div style="margin-left: 2px;">New BPMN Diagram</div>');
        		_addButton.appendTo(_newColumn);
        		
                toolbar.append(_searchContainer);
                
                _addButton.jqxButton({ width: '116', height: '16', theme: 'metro' });
                           
                _addButton.click(function(event){
                	_showEditPage();
                });
            }
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return ProcessDefinitionList;
    
});

