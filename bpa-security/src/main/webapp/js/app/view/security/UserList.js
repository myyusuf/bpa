define(["jQuery", "jqxcore", "jqxbuttons", "jqxtree", "jqxpanel", "jqxscrollbar", "jqxexpander", 
        "jqxsplitter", "jqxmenu", "jqxnavigationbar", 
        "jqxgrid.pager", "jqxgrid.sort", "jqxgrid.edit", "jqxgrid.selection", "jqxlistbox", "jqxdropdownlist", "jqxgrid", "jqxdata"], function () {
	
	var UserList = function(container){
		
		var url = "service/security/users";
        
        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'username', type: 'string' },
                { name: 'firstName', type: 'string' },
                { name: 'lastName', type: 'string' },
                { name: 'email', type: 'string' }
            ],
            id: 'username',
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
              { text: 'Username', datafield: 'username', width: '25%' },
              { text: 'First Name', datafield: 'firstName', width: '25%' },
              { text: 'Last Name', datafield: 'lastName', width: '25%' },
              { text: 'Email', datafield: 'email', width: '25%' }
            ],
        	theme: 'metro',
        	pagesizeoptions: ['5', '10', '20', '100'],
        	virtualmode: true,
        	rendergridrows: function () {
                return dataAdapter.records;
            }
        });
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return UserList;
    
});

