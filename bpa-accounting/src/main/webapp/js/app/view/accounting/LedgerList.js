define(["jQuery", "jqxcore"], function () {
	
	var LedgerList = function(container){
		
		var url = BPA.Constant.accounting.ledgerUrl;
        
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'accountCode', type: 'string' },
                { name: 'accountName', type: 'string' },
                { name: 'details'},
            ],
            id: 'accountCode',
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
        
        //-----------------------------
        
        var initrowdetails = function (index, parentElement, gridElement, record) {
        	
        	var grid = $($(parentElement).children()[0]);
        	
        	var temparray = [];
        	
        	for (var i = 0; i < record.details.length; i++) {
        		temparray.push(record.details[i][0]);
            }
            
            var ledgerDetailsSource =
            {
                datafields: [
                    { name: 'date', type: 'string' },
                    { name: 'accountName', type: 'string' },
                    { name: 'debit', type: 'string' },
                    { name: 'credit', type: 'string' }
                ],
                id: 'accountName',
                localdata: temparray
                
            };
            var nestedGridAdapter = new $.jqx.dataAdapter(ledgerDetailsSource);
            if (grid != null) {
                grid.jqxGrid({
                    source: nestedGridAdapter, width: 780, height: 200,
                    theme: 'metro',
                    columns: [
						{ text: 'Date', datafield: 'date', width: '25%' },
						{ text: 'Account Name', datafield: 'accountName', width: '25%' },
						{ text: 'Debit', datafield: 'debit', width: '25%' },
						{ text: 'Credit', datafield: 'credit', width: '25%' }
                   ]
                });
            }
        }
        
        
        //-----------------------------
        
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
              { text: 'Account Name', datafield: 'accountName', width: '50%' },
              { text: 'Account Code', datafield: 'accountCode', width: '50%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return dataAdapter.records;
            },
            rowdetails: true,
            initrowdetails: initrowdetails,
            rowdetailstemplate: { rowdetails: "<div id='grid' style='margin: 10px;'></div>", rowdetailsheight: 220, rowdetailshidden: false }
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return LedgerList;
    
});

