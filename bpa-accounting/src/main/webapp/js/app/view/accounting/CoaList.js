define(["jQuery", "jqxcore", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxmenu", "jqxnavigationbar", 
        "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxlistbox", "jqxdropdownlist", "jqxgrid", "jqxdata", 
        "jqxtreegrid"], function () {
	
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
        
        container.jqxTreeGrid(
        {
            width: '100%',
            height: 200,
            source: dataAdapter,                
            pageable: true,
            pagerMode: 'advanced',
            ready: function()
            {
            },
            columns: [
              { text: 'Code', datafield: 'code', width: '33%' },
              { text: 'Name', datafield: 'name', width: '33%' },
              { text: 'Description', datafield: 'description', width: '33%' }
            ],
        	theme: 'metro'
        	
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return CoaList;
    
});

