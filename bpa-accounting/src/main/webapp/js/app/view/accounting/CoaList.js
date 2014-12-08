define(["jQuery", "jqxcore", "jqxbuttons", "jqxdata", "jqxtreegrid", "jqxinput"], function () {
	
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
        
        var searchInput = $('<input type="text" class="text-input" style="width: 250px;"/>');
        var dataAdapter = new $.jqx.dataAdapter(source, {
        	
        	formatData: function (data) {
                data.codeOrNameStartsWith = searchInput.val();
                return data;
            },
        
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
            toolbarheight: 40,
            renderToolbar: function(toolbar)
            {
            	toolbar.empty();
            	
                var container = $("<div style='float: left; margin: 5px; text-align: right;'></div>");
                var searchTable = $('<table></table>');
                searchTable.appendTo(container);
        		
        		var newRow = $('<tr></tr>');
        		newRow.appendTo(searchTable);
        		var newColumn = $('<td></td>');
        		newColumn.appendTo(newRow);
        		searchInput.appendTo(newColumn);
        		
        		newColumn = $('<td></td>');
        		newColumn.appendTo(newRow);
        		var searchButton = $('<div><img src="resources/images/magnifier-medium.png"/></div>');
        		searchButton.appendTo(newColumn);
        		
        		newColumn = $('<td></td>');
        		newColumn.appendTo(newRow);
        		var addButton = $('<div style="margin-left: 7px;">New Account</div>');
        		addButton.appendTo(newColumn);
        		
                toolbar.append(container);
                
                searchInput.jqxInput({placeHolder: " Search Chart of Account", theme: 'metro' });
                searchButton.jqxButton({ width: '14', height: '14', theme: 'metro' });
                addButton.jqxButton({ width: '80', height: '16', theme: 'metro' });
                
                searchButton.click(function(event){
                	coaListGrid.jqxTreeGrid('updateBoundData');
                });
                searchInput.on('keypress', function(event){
                	if(13 == event.charCode){
                		coaListGrid.jqxTreeGrid('updateBoundData');
                	}
                });
                
                addButton.click(function(event){
                	showEditPage();
                });
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
        
        coaListGrid.on('bindingComplete', function (event) { 
        	searchInput.focus();
        });
        
        coaListGrid.on('rowDoubleClick', function (event){ 
        	
        	var args = event.args;
            // row data.
            var row = args.row;
            // row key.
            var key = args.key;
            // data field
            var dataField = args.dataField;
            
            showEditPage(row);
        	   
        });
        
        var gridContextMenu = $('<div><ul><li data-menukey="add">Add New</li><li data-menukey="edit">Edit</li><li data-menukey="delete">Delete</li></ul></div>');
        gridContextMenu.jqxMenu({width: '120px', autoOpenPopup: false, mode: 'popup', theme: 'metro'});
        gridContextMenu.on('itemclick', function (event){
        	
        	var menuKey = $(event.target).data("menukey");
        	
        	var rowData = "";
        	
        	if("edit" == menuKey || "delete" == menuKey){
        		var selection = coaListGrid.jqxTreeGrid('getSelection');
        		for (var i = 0; i < selection.length; i++) {
            		rowData = selection[i];
            	}
        	}
        	
	 		if("add" == menuKey){
	 			showEditPage();
	 		}else if("edit" == menuKey){
	 			showEditPage(rowData);
	 		}else if("delete" == menuKey){
	 			console.log('delete');
	 		}
        });
        
        coaListGrid.on('rowClick', function (event) {
        	
        	var clickEvent = event.args.originalEvent;
//            var rightClick = isRightClick(event) || $.jqx.mobile.isTouchDevice();
        	var rightClick = isRightClick(clickEvent);
            if (rightClick) {
                var scrollTop = $(window).scrollTop();
                var scrollLeft = $(window).scrollLeft();
                gridContextMenu.jqxMenu('open', parseInt(clickEvent.clientX) + 5 + scrollLeft, parseInt(clickEvent.clientY) + 5 + scrollTop);
                return false;
            }else{
            	gridContextMenu.jqxMenu('close');
            }
        });
        
        coaListGrid.on('contextmenu', function (e) {
            return false;
        });
        var isRightClick = function(event) {
            var rightclick;
            if (!event) var event = window.event;
            if (event.which) rightclick = (event.which == 3);
            else if (event.button) rightclick = (event.button == 2);
            return rightclick;
        }
        
        var showEditPage = function(row){
        	require(['./view/accounting/CoaEdit'], function (CoaEdit) {
        		var onAfterSave = function(savedData){
        			coaListGrid.jqxTreeGrid('updateBoundData');
        			console.log('savedData : ' + savedData);
        		}
            	var coaEdit = new CoaEdit(container, {editedCoa: row, onAfterSave: onAfterSave});
            });
        }
        
        container.css({marginLeft: "-2px", borderTop: "0px", borderBottom: "0px", marginTop: "-1px"});
        
	}

    return CoaList;
    
});

