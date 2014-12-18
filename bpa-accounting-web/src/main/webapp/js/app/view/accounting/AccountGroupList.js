define(["jQuery", "jqxcore"], function () {
	
	var AccountGroupList = function(container){
		
		var url = BPA.Constant.accounting.accountGroupUrl;
        
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'code', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'normal', type: 'string' },
                { name: 'description', type: 'string' }
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
        
        var accountGroupListGrid = container.jqxGrid(
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
              { text: 'Code', datafield: 'code', width: '25%' },
              { text: 'Name', datafield: 'name', width: '25%' },
              { text: 'normal', datafield: 'normal', width: '25%' },
              { text: 'Description', datafield: 'description', width: '25%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return dataAdapter.records;
            }
        });
        
        accountGroupListGrid.on('rowdoubleclick', function (event){ 
//        	require(['./view/accounting/CoaEdit'], function (CoaEdit) {
//            	var coaEdit = new CoaEdit(container);
//            });   
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return AccountGroupList;
    
});

