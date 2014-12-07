define(["jQuery", "jqxcore", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxmenu", "jqxnavigationbar", 
        "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxlistbox", "jqxdropdownlist", "jqxgrid", "jqxdata", 
        "jqxtreegrid", "jqxinput"], function () {
	
	var CoaList = function(container){
		
		var url = BPA.Constant.accounting.coaUrl;
        
        var source =
        {
            dataType: "json",
            dataFields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'parentCode', type: 'string' }
            ],
            hierarchy:
            {
                keyDataField: { name: 'code' },
                parentDataField: { name: 'parentCode' }
            },
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
        
        var coaListGrid = container.jqxTreeGrid(
        {
            width: '100%',
            height: '100%',
            source: dataAdapter,                
            pageable: true,
            pagerMode: 'advanced',
            showToolbar: true,
            renderToolbar: function(toolbar)
            {
                var container = $("<div style='margin: 5px; text-align: right;'></div>");
                var searchInput = $('<input type="text" class="text-input" style="width: 240px;"/>');
                toolbar.append(container);
                container.append(searchInput);
                searchInput.jqxInput({placeHolder: " Search Chart of Account", theme: 'metro' });
            },
            ready: function()
            {
            },
            columns: [
              { text: 'Code', datafield: 'code', width: '33.3%' },
              { text: 'Name', datafield: 'name', width: '33.3%' },
              { text: 'Description', datafield: 'description', width: '33.3%' }
            ],
        	theme: 'metro'
        	
        });
        
        coaListGrid.on('rowDoubleClick', function (event){ 
        	
        	var args = event.args;
            // row data.
            var row = args.row;
            // row key.
            var key = args.key;
            // data field
            var dataField = args.dataField;
            
        	require(['./view/accounting/CoaEdit'], function (CoaEdit) {
            	var coaEdit = new CoaEdit(container, row);
            });   
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return CoaList;
    
});

