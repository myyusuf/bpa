define(["jQuery", "jqxcore"], function () {
	
	var JournalList = function(container){
		
		var url = BPA.Constant.accounting.journalUrl;
        
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'date', type: 'string' },
                { name: 'accountName', type: 'string' },
                { name: 'debit', type: 'string' },
                { name: 'credit', type: 'string' }
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
        
        var journalListGrid = container.jqxGrid(
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
              { text: 'Date', datafield: 'date', width: '25%' },
              { text: 'Account Name', datafield: 'accountName', width: '25%' },
              { text: 'Debit', datafield: 'debit', width: '25%' },
              { text: 'Credit', datafield: 'credit', width: '25%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return dataAdapter.records;
            }
        });
        
        journalListGrid.on('rowdoubleclick', function (event){ 
        	console.log('test');
//        	require(['./view/accounting/CoaEdit'], function (CoaEdit) {
//            	var coaEdit = new CoaEdit(container);
//            });   
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return JournalList;
    
});

